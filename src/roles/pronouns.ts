import { Client, Message, MessageReaction, ReactionCollector, TextChannel, User } from 'discord.js';
import { inject, injectable } from 'inversify';
import { IConfig } from '../interfaces/config';
import { TYPES } from '../types';

function getReactionFilter(message: Message): (reaction: MessageReaction, user: User) => boolean {
    return (reaction: MessageReaction, user) => {
        return user.id !== message.author.id;
    };
}

@injectable()
export class PronounReactions {
    constructor(@inject(TYPES.Client) private client: Client, @inject(TYPES.Config) private config: IConfig) {}

    async checkMessageReacts(): Promise<void> {
        const pronounChannel = (await this.client.channels.fetch(this.config.pronounsChannel)) as TextChannel;
        const pinned = await pronounChannel.messages.fetchPinned();
        let message: Message;
        if (pinned.size === 0) {
            const messageLines = [
                '**Role reactions: pronouns**',
                'React to give yourself a role.  Participation is totally optional',
                ':one: Ask my pronouns',
                ':two: They/them',
                ':three: She/her',
                ':four: He/his',
            ];
            message = await pronounChannel.send(messageLines.join('\n'));
            await message.react('1⃣');
            await message.react('2⃣');
            await message.react('3⃣');
            await message.react('4⃣');
            await message.pin();
        } else {
            message = pinned.first();
        }
        console.log(JSON.stringify(message));
        const collector = message.createReactionCollector(getReactionFilter(message));
        this.attachEventHandlers(collector);
    }

    attachEventHandlers(collector: ReactionCollector): void {
        collector.on('collect', (reaction: MessageReaction, user: User) => {});
        collector.on('remove', (reaction: MessageReaction, user: User) => {});
    }
}
