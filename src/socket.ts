'use client';

import { io } from 'socket.io-client';

export const defaultSocket = (userId: string) =>
    io(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}?userId=${userId}`, {
        transports: ['websocket'],
    });
