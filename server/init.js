
import {randomUUID} from "node:crypto";
import {readStateFromFile, writeStateToFile} from "./file.js";
import {getState} from "./state.js";

export const init = async (ws, obj) => {
    await readStateFromFile();
    const state = getState();
    if ('id' in obj && obj.id in state) {
        state[obj.id] = {
            ...state[obj.id],
            timestamp: new Date(),
            ...obj,
        };
        ws.send(JSON.stringify({
            type: 'init_resp',
            status: 'success',
            id: state[obj.id].id,
            message: 'updated session timestamp ' + new Date(),}));
    } else {
        const id = randomUUID();
        state[id] = {
            timestamp: new Date(),
            id,
            ...obj,
        };
        ws.send(JSON.stringify({
            type: 'init_resp',
            status: 'success',
            id,
            message: 'initialised session id'
        }));
    }
    await writeStateToFile(state);
}