import { Client, Emoji, Message, MessageReaction, ReactionCollector, Role, TextChannel, User } from 'discord.js';
import { inject, injectable } from 'inversify';
import { IConfig } from '../interfaces/config';
import { Emojis } from '../interfaces/emojis';
import { getEnumKeys } from '../libraries/enums';
import { TYPES } from '../types';

function getReactionFilter(message: Message): (reaction: MessageReaction, user: User) => boolean {
    return (reaction: MessageReaction, user) => {
        return user.id !== message.author.id && getEnumKeys(Emojis).includes(reaction.emoji.name);
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
            await message.react(Emojis.One);
            await message.react(Emojis.Two);
            await message.react(Emojis.Three);
            await message.react(Emojis.Four);
            await message.pin();
        } else {
            message = pinned.first();
        }
        const collector = message.createReactionCollector(getReactionFilter(message));
        collector.on('collect', (reaction: MessageReaction, user: User) => {});
        collector.on('remove', (reaction: MessageReaction, user: User) => {});
    }

    async assignRole(reaction: Emojis, user: User): Promise<void> {
        const guild = await this.client.guilds.fetch(this.config.serverId);
        let role: Role;
        switch (reaction) {
            case Emojis.One: // ask my pronouns
                role = await guild.roles.fetch(this.config.roles.askMyPronouns);
                break;
            case Emojis.Two: // they/them
                role = await guild.roles.fetch(this.config.roles.theyThem);
                break;
            case Emojis.Three: // she/her
                role = await guild.roles.fetch(this.config.roles.sheHer);
                break;
            case Emojis.Four: // he/him
                role = await guild.roles.fetch(this.config.roles.heHim);
                break;
        }
        guild.members.fetch(); // TODO: what is the id?
    }
}
