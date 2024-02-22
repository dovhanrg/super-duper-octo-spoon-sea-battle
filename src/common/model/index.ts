import {makeObservable, observable, runInAction} from "mobx";
import {Cords} from "../../components/Player/LocalPlayer";
import {localState, seaBattleUserIDKey} from "../consts";
import {MessageType, sendMessage} from "../socket";

type LocalPlayer = {
    selectedCells: Cords;
    isBattleStarted: boolean;
    userID?: string;
};

type RemotePlayer = {
    isPlayerReady: boolean,
    selectedCells: Cords,
    cellState: Record<string, string>,
};

class Model {
    localPlayer: LocalPlayer = {
        selectedCells: {},
        isBattleStarted: false,
    };
    remotePlayer: RemotePlayer = {
        isPlayerReady: false,
        selectedCells: {},
        cellState: {}, // cellState: { [p: string]: 'affected' | 'checked' | undefined}
    };
    constructor() {
        makeObservable(this, {
            localPlayer: observable,
            remotePlayer: observable,
        });
        runInAction(() => {
            const state = localStorage.getItem(localState);
            const id = localStorage.getItem(seaBattleUserIDKey);
            console.log('runInAction', state);
            if (state) {
                this.localPlayer = {
                    ...JSON.parse(state),
                };
                sendMessage({type: 'init', id: this.localPlayer.userID, state: JSON.parse(state)});
            } else {
                const message = {type: 'init'} satisfies MessageType;
                sendMessage(id ? {...message, id} : message);
            }
        });
    }
}

export default new Model();
