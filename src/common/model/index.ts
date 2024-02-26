import {makeObservable, observable, runInAction} from "mobx";
import {Cords} from "../../components/Player/LocalPlayer";
import {localState, seaBattleUserIDKey} from "../consts";
import {MessageType, sendMessage} from "../socket";

type LocalPlayer = {
    selectedCells: Cords;
    isPlayerReady: boolean;
    id?: string;
};

type RemotePlayer = {
    isPlayerReady: boolean,
    selectedCells: Cords,
    cellState: Record<string, string>,
};

class Model {
    localPlayer: LocalPlayer = {
        selectedCells: {},
        isPlayerReady: false,
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
            if (state) {
                this.localPlayer = {
                    ...JSON.parse(state),
                };
                sendMessage({type: 'init', id: this.localPlayer.id, state: JSON.parse(state)});
            } else {
                const message = {type: 'init'} satisfies MessageType;
                sendMessage(id ? {...message, id} : message);
            }
        });
    }
}

export default new Model();
