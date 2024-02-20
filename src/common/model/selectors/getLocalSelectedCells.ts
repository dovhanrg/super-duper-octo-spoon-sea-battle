import Model from "../index";
import {Cords} from "../../../components/Player/LocalPlayer";


const getLocalSelectedCells = (): Cords => {
    return Model.localPlayer.selectedCells;
};

export default getLocalSelectedCells;
