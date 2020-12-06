import 'reflect-metadata';
import { Bot } from './bot';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Client } from 'discord.js';
import { IConfig } from './interfaces/config';
import { PronounReactions } from './roles/pronouns';
import { ROLES } from './roles/types';

let container = new Container();

function buildConfig(): IConfig {
    return {
        token: process.env.TOKEN,
        pronounsChannel: process.env.PRONOUNS_CHANNEL,
    };
}

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<PronounReactions>(ROLES.Pronouns).to(PronounReactions).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<IConfig>(TYPES.Config).toConstantValue(buildConfig());

export default container;
