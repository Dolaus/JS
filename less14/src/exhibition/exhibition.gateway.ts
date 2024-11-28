import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {INewPostPayload} from "../interface/INewPostPayload";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ExhibitionGateway {
    @WebSocketServer()
    server: Server;

    notifyNewPost(userId: number, post: any) {
        const payload: INewPostPayload = { userId, post };
        this.server.emit('new-post', payload);
        console.log('payload');
        console.log(payload);
    }
}
