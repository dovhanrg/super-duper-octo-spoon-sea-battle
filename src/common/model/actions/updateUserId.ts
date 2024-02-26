import {action} from "mobx";
import Model from "../index";
import {MessageType} from "../../socket";
import {seaBattleUserIDKey} from "../../consts";


const updateUserId = action((data: MessageType) => {
    if (typeof data.id === 'string') {
        Model.localPlayer.id = data.id;
        localStorage.setItem(seaBattleUserIDKey, data.id.toString());
    }
});

export default updateUserId;
