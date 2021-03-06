import 'reflect-metadata';
import { Bot } from './bot';
import { Container } from 'inversify';
import { TYPES } from './types';
import { Client } from 'discord.js';

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);

export default container;
