import React, {useCallback} from "react";
import FieldPure from "./FieldPure";
import {getXYCoordinatesString} from "./helpers/getXYCoordinatesString";
import Cell from "../Cell";
import {Coordinates, SelectedCells} from "../Player/LocalPlayer";

const SEA_BATTLE_FIELD_LENGTH = 10;

type Props = {
    onCellClick: (coordinates: Coordinates) => void;
    selectedCells: SelectedCells;
};
const Field = ({onCellClick, selectedCells}: Props): React.ReactElement => {

    const cells: React.ReactNode[] = [];
    for (let y = 1; y <= SEA_BATTLE_FIELD_LENGTH; y++) {
        for (let x = 1; x <= SEA_BATTLE_FIELD_LENGTH; x++) {
            const isCellOccupied = getXYCoordinatesString({x, y}) in selectedCells;
            const handleClick = useCallback(() => {
                onCellClick({x, y});
            }, [onCellClick]);
            cells.push(<Cell
                key={getXYCoordinatesString({x,y})}
                onClick={handleClick}
                isOccupied={isCellOccupied} />);
        }
    }

    const a = new Array(SEA_BATTLE_FIELD_LENGTH).fill(null).reduce((acc, _, index) => {
        return acc.concat(new Array(SEA_BATTLE_FIELD_LENGTH).fill(null).map((_, innerIndex) => {
            return {x: innerIndex+1, y: index+1};
        }));
    }, []);
    console.log(a);

    return (<FieldPure>{cells}</FieldPure>);
};

export default Field;
