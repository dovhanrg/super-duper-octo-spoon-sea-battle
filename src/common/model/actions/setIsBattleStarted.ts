import Model from "../index";
import {action} from "mobx";


const setIsBattleStarted = action(() => {
    Model.localPlayer.isBattleStarted = true;
});

export default setIsBattleStarted;
