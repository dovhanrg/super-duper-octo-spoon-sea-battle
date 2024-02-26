import Model from "../index";
import {action} from "mobx";
import {localState, messageType} from "../../consts";
import {sendMessage} from "../../socket";


const setIsBattleStarted = action(() => {
    Model.localPlayer.isPlayerReady = true;
    localStorage.setItem(localState, JSON.stringify(Model.localPlayer));
    sendMessage({
        type: messageType.playerReady,
        id: Model.localPlayer.id,
        state: Model.localPlayer,
    });
});

export default setIsBattleStarted;
