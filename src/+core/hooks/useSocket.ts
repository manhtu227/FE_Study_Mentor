import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket as defaultSocket } from '../../socket';

function useSocket() {
    const { data } = useSession();
    const currentSocketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    useEffect(() => {
        // Khởi tạo currentSocket khi có dữ liệu từ session
        if (data?.user?.user?.id) {
            currentSocketRef.current = defaultSocket(data?.user?.user?.id);
        }

        const currentSocket = currentSocketRef.current;

        if (currentSocket) {
            const onConnect = () => {
                setIsConnected(true);
            };

            const onDisconnect = () => {
                setIsConnected(false);
            };

            currentSocket.on('connect', onConnect);
            currentSocket.on('disconnect', onDisconnect);
            currentSocket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            return () => {
                currentSocket.off('connect', onConnect);
                currentSocket.off('disconnect', onDisconnect);
                currentSocket.off('error');
            };
        }
    }, [data?.user?.user?.id]); // Thay đổi khi có thay đổi về user ID

    return { currentSocket: currentSocketRef.current, isConnected };
}

export default useSocket;
