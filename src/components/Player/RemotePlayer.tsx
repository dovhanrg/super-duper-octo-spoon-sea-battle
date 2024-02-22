import Field from "../Field";
import React from "react";
import {getXYCoordinatesString} from "../Field/helpers/getXYCoordinatesString";
import {Coordinates} from "./LocalPlayer";
import Model from "../../common/model";
import {observer} from "mobx-react-lite";


const RemotePlayer = observer(() => {

    const handleClick = (coordinates: Coordinates) => {
        // if (!(getXYCoordinatesString(coordinates) in Model.remotePlayer.cellState)) {
        console.log(coordinates);
        if ((getXYCoordinatesString(coordinates) in Model.localPlayer.selectedCells)) {
            Model.remotePlayer.cellState = {
                ...Model.remotePlayer.cellState,
                [getXYCoordinatesString(coordinates)]: 'affected',
            };
        }
        // else {
        //     Model.remotePlayer.cellState = {
        //         ...Model.remotePlayer.cellState,
        //         [getXYCoordinatesString(coordinates)]: 'checked',
        //     };
        // }
        // console.log(toJS(Model.remotePlayer.cellState));

    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return (// @ts-ignore
        <div><Field onCellClick={handleClick} selectedCells={Model.remotePlayer.cellState} /></div>
    );
});

export default RemotePlayer;
