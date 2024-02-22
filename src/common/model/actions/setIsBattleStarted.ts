import Model from "../index";
import {action} from "mobx";
import {localState, messageType} from "../../consts";
import {sendMessage} from "../../socket";


const setIsBattleStarted = action(() => {
    Model.localPlayer.isBattleStarted = true;
    localStorage.setItem(localState, JSON.stringify(Model.localPlayer));
    sendMessage({type: messageType.playerStarted});
});

export default setIsBattleStarted;
