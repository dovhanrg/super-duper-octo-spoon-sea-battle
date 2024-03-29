import {randomUUID} from "node:crypto";
import {readStateFromFile, writeStateToFile} from "./file.js";
import {getState} from "./state.js";

/**
 *
 * @param {WebSocket} ws WebSocket
 * @param obj
 * @param {type} obj.type incoming message type
 * @param {id} [obj.id]  user id
 * @param {state} [obj.state] user state
 * @param {selectedCells} [obj.state.selectedCells] location of user ships on field
 * @param {isPlayerReady} [obj.state.isPlayerReady=boolean] is user located ships and press Start(ready)
 * @return void
 */
export const init = async (ws, obj) => {
    await readStateFromFile();
    const state = getState();
    const {id, state: userState} = obj;
    if (id && id in state) {
        state[id] = {
            ...state[id],
            isPlayerReady: userState?.isPlayerReady ?? false,
            selectedCells: userState?.selectedCells ?? {},
        };
        ws.send(JSON.stringify({
            type: 'init_resp',
            status: 'success',
            id,
        }));
    } else {
        const newID = randomUUID();
        state[newID] = {
            id: newID,
        };
        ws.send(JSON.stringify({
            type: 'init_resp',
            status: 'success',
            id: newID,
            message: 'initialised session id'
        }));
    }
    await writeStateToFile();
}