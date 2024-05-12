import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../../socket'; // Assuming this is a pre-configured socket instance

function useSocket() {
    const { data: session } = useSession();
    const socketRef = useRef<Socket | null>(null);

    const [isConnected, setIsConnected] = useState(false); // Initial state is disconnected

    useEffect(() => {
        const userId = session?.user?.user?.id; // Extract user ID

        // Create socket instance only if user ID is available and different
        if (userId && (!socketRef.current || socketRef.current.id !== userId)) {
            socketRef.current = socket(userId);

            socketRef.current.connect();
            socketRef.current.on('connect', () => setIsConnected(true));
            socketRef.current.on('disconnect', () => setIsConnected(false));
            socketRef.current.on('error', (error) => console.error('Socket error:', error));
        }

        // Clean up on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.off('connect');
                socketRef.current.off('disconnect');
                socketRef.current.off('error');
            }
        };
    }, [session]); // Track session changes for socket updates

    return { currentSocket: socketRef.current, isConnected };
}

export default useSocket;
