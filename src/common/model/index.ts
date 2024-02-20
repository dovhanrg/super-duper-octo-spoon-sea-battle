import {makeAutoObservable} from "mobx";
import {Cords} from "../../components/Player/LocalPlayer";

type LocalPlayer = {
    selectedCells: Cords;
    isReadyToStart: boolean;
    isBattleStarted: boolean;
};

export type Model = {
    localPlayer: LocalPlayer;
    remotePlayer: Record<string, string>;
};

const model: Model = {
    localPlayer: {
        selectedCells: {},
        isReadyToStart: false,
        isBattleStarted: false,
    },
    remotePlayer: {},
};

export default makeAutoObservable(model);
