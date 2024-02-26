import {getState} from "./state.js";
import {writeStateToFile} from "./file.js";

/**
 *
 * @param {WebSocket} ws
 * @param obj
 * @param {type} obj.type=playerReady incoming message type
 * @param {id} obj.id  user id
 * @param {state} [obj.state] user state
 * @param {selectedCells} obj.state.selectedCells={} location of user ships on field
 * @param {isPlayerReady} obj.state.isPlayerReady=boolean is user located ships and press Start(ready)
 * @return void
 */
export const ready = (ws, obj) => {
    const state = getState();
    const {id, state: userState} = obj;
    if (id && state) {
        state[id].isPlayerReady = userState.isPlayerReady;
        state[id].selectedCells = userState.selectedCells;
    }
    ws.send(JSON.stringify({type: `${obj.type}_resp`, status: 'success'}));
    console.log(state);
    writeStateToFile();
}