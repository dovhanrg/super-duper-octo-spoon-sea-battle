import {makeObservable, observable} from "mobx";
import {Cords} from "../../components/Player/LocalPlayer";

type LocalPlayer = {
    selectedCells: Cords;
    isReadyToStart: boolean;
    isBattleStarted: boolean;
};

type RemotePlayer = {
    isPlayerReady: boolean,
    selectedCells: Cords,
    cellState: Record<string, string>,
};

class Model {
    localPlayer: LocalPlayer = {
        selectedCells: {},
        isReadyToStart: false,
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
    }
}

// export default makeAutoObservable(model);
export default new Model();
