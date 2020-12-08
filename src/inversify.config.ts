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
        serverId: process.env.SERVER_ID,
        roles: {
            askMyPronouns: process.env.ASK_MY_PRONOUNS_ROLE,
            heHim: process.env.HE_HIM_ROLE,
            sheHer: process.env.SHE_HER_ROLE,
            theyThem: process.env.THEY_THEM_ROLE,
        },
    };
}

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<PronounReactions>(ROLES.Pronouns).to(PronounReactions).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<IConfig>(TYPES.Config).toConstantValue(buildConfig());

export default container;
