import Cell from "./Cell";
import React, {useState} from "react";

const SEA_BATTLE_FIELD_LENGTH = 10;

type XCord = number;
type YCord = number;

export type Coordinates = {x: XCord, y: YCord};

export type Cords = Record<string, boolean>;
export default Field;


const getXYCoordinatesString = (coordinates: Coordinates) => `${coordinates.x}${coordinates.y}`;
function fillFieldWithCells(handleSquareSelect: (coordinates: Coordinates) => void, occupiedCoordinates: Cords): React.ReactElement[] {
    console.log('fillFieldWithCells');
    const cells: React.ReactElement[] = [];
    for (let x = 1; x <= SEA_BATTLE_FIELD_LENGTH; x++) {
        for (let y = 1; y <= SEA_BATTLE_FIELD_LENGTH; y++) {
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

function Field() {

    const [occupiedCoordinates, setOccupiedCoordinates] = useState<Cords>({});

    const handleSquareSelect = (coordinates: Coordinates) => {

        setOccupiedCoordinates({...occupiedCoordinates, [getXYCoordinatesString(coordinates)]: true});
    }

    return <div className="field">
        {fillFieldWithCells(handleSquareSelect, occupiedCoordinates)}
    </div>
}