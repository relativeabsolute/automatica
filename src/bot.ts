import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';

@injectable()
export class Bot {
    constructor(@inject(TYPES.Client) private client: Client, @inject(TYPES.Token) private token: string) {}

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {
            console.log('Message received!  Contents: ', message.content);
        });

        console.log(`Attempting to login with token ${this.token}`);
        return this.client.login(this.token);
    }
}
