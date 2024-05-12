'use client';

import { io } from 'socket.io-client';

export const socket = (userId: string) =>
    io(`http://188.166.176.114:3000?userId=${userId}`, {
        transports: ['websocket'],
    });
