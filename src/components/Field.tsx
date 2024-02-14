import Cell from "./Cell";
import React, {useState} from "react";

const SEA_BATTLE_FIELD_LENGTH = 10;
const TOP_AND_LEFT_COORD_BORDER = 0;

type XCord = number;
type YCord = number;

export type Coordinates = {x: XCord, y: YCord};

export type Cords = Record<string, boolean>;
export default Field;


const getXYCoordinatesString = (coordinates: Coordinates): `${number}${number}`=> `${coordinates.x}${coordinates.y}`;
function fillFieldWithCells(handleSquareSelect: (coordinates: Coordinates) => void, occupiedCoordinates: Cords): React.ReactNode[] {
    const cells: React.ReactNode[] = [];
    for (let y = 1; y <= SEA_BATTLE_FIELD_LENGTH; y++) {
        for (let x = 1; x <= SEA_BATTLE_FIELD_LENGTH; x++) {
            const isCellOccupied = getXYCoordinatesString({x, y}) in occupiedCoordinates;
            cells.push(<Cell
                key={getXYCoordinatesString({x,y})}
                coordinates={{x, y}}
                onClick={handleSquareSelect}
                isOccupied={isCellOccupied} />);
        }
    }
    return cells;
}

const checkOppositeCells = (
    coordinates: Coordinates,
    reservedCells: Cords,
): boolean => {
    const rightX = coordinates.x + 1;
    const downY = coordinates.y + 1;
    const leftX = coordinates.x - 1;
    const topY = coordinates.y - 1;
    console.log(coordinates);
    if (rightX <= SEA_BATTLE_FIELD_LENGTH && downY <= SEA_BATTLE_FIELD_LENGTH) {
        if (`${rightX}${downY}` in reservedCells) return false;
    }
    if (rightX <= SEA_BATTLE_FIELD_LENGTH && topY > TOP_AND_LEFT_COORD_BORDER) {
        if (`${rightX}${topY}` in reservedCells) return false;
    }
    if (leftX > TOP_AND_LEFT_COORD_BORDER && downY <= SEA_BATTLE_FIELD_LENGTH) {
        if (`${leftX}${downY}` in reservedCells) return false;
    }
    if (leftX > TOP_AND_LEFT_COORD_BORDER && topY > TOP_AND_LEFT_COORD_BORDER) {
        if (`${leftX}${topY}` in reservedCells) return false;
    }
    return true;
}

function Field(): React.ReactElement {

    const [reservedCells, setReservedCells] = useState<Cords>({});

    const handleSquareSelect = (coordinates: Coordinates) => {

        if (!checkOppositeCells(coordinates, reservedCells)) return;
        const xYCoordinatesString = getXYCoordinatesString(coordinates);
        if (xYCoordinatesString in reservedCells) {
            const newCoordinates = {...reservedCells};
            delete newCoordinates[xYCoordinatesString];
            setReservedCells(newCoordinates);
        } else {
            setReservedCells({...reservedCells, [xYCoordinatesString]: true});
        }
    }

    return <div className="field">
        {fillFieldWithCells(handleSquareSelect, reservedCells)}
    </div>
}