import { PronounReactions } from './roles/pronouns';
import { ROLES } from './roles/types';
import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { IConfig } from './interfaces/config';
import { TYPES } from './types';

@injectable()
export class Bot {
    constructor(
        @inject(TYPES.Client) private client: Client,
        @inject(TYPES.Config) private config: IConfig,
        @inject(ROLES.Pronouns) private pronounReactions: PronounReactions,
    ) {}

    public async listen(): Promise<void> {
        console.log(`Attempting to login with token ${this.config.token}`);

        await this.client.login(this.config.token);
        console.log('Successfully logged in');

        await this.pronounReactions.checkMessageReacts();
    }
}
