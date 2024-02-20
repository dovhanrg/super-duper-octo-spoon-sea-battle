import Model from "../index";
import {Coordinates} from "../../../components/Player/LocalPlayer";
import {getXYCoordinatesString} from "../../../components/Field/helpers/getXYCoordinatesString";
import {action} from "mobx";


const updateLocalSelectedCells = action((coordinates: Coordinates) => {
    const xYCoordinatesString = getXYCoordinatesString(coordinates);
    if (xYCoordinatesString in Model.localPlayer.selectedCells) {
        delete Model.localPlayer.selectedCells[xYCoordinatesString];
    } else {
        Model.localPlayer.selectedCells[xYCoordinatesString] = coordinates;
    }
});

export default updateLocalSelectedCells;
