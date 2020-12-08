export interface IConfig {
    token: string;
    pronounsChannel: string;
    serverId: string;
    roles: {
        askMyPronouns: string;
        heHim: string;
        sheHer: string;
        theyThem: string;
    };
}
