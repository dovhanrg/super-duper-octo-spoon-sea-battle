

export enum messageType {
    init = 'init',
    init_resp = 'init_resp',
    playerReady = 'playerReady',
    playerReady_resp = 'playerReady_resp',
    ping = 'ping',
}


export const REMOTE_ADDR = process.env.REMOTE_ADDR ?? 'ws://localhost:8080/ws';
export const seaBattleUserIDKey = 'seaBattleUserID';
export const localState = 'localState';
export const remoteState = 'remoteState';