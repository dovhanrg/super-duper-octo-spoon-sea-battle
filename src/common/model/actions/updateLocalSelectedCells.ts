import Model from "../index";
import {Coordinates} from "../../../components/Player/LocalPlayer";
import {getXYCoordinatesString} from "../../../components/Field/helpers/getXYCoordinatesString";
import {action} from "mobx";


const updateLocalSelectedCells = action((coordinates: Coordinates) => {
    const xYCoordinatesString = getXYCoordinatesString(coordinates);
    if (xYCoordinatesString in Model.localPlayer.selectedCells) {
        const newCoordinates = {...Model.localPlayer.selectedCells};
        delete newCoordinates[xYCoordinatesString];
        Model.localPlayer.selectedCells = newCoordinates;
    } else {
        Model.localPlayer.selectedCells = {...Model.localPlayer.selectedCells, [xYCoordinatesString]: coordinates};
    }
});

export default updateLocalSelectedCells;
