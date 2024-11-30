import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const useSocket = (currentPage: number, url: string, onNewPost: () => void) => {
    const SOCKET_SERVER_URL = process.env.REACT_APP_STATICURL + '/notifications';

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: Infinity,
        });

        socket.on('newPost', (data) => {
            toast(`New Post from ${data.user}`);
            if (currentPage === 1) {
                onNewPost();
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [currentPage, url, onNewPost]);
};

export default useSocket;
