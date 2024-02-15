import Cell from "./Cell";
import React, {useState} from "react";

const SEA_BATTLE_FIELD_LENGTH = 10;
const TOP_AND_LEFT_COORD_BORDER = 0;

type ShipType = "OneDeck" | "TwoDeck" | "ThreeDeck" | "FourDeck";
type ShipNumberType = Record<ShipType, number>;
const ShipNumber = {
    1: 'OneDeck',
    2 : 'ThreeDeck',
    3 : 'TwoDeck',
    4 : 'FourDeck',
} satisfies Record<number, ShipType>;



export type Coordinates = {x: number, y: number};

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

const isOppositeCellsReserved = (
    coordinates: Coordinates,
    reservedCells: Cords,
): boolean => {
    const rightX = coordinates.x + 1;
    const downY = coordinates.y + 1;
    const leftX = coordinates.x - 1;
    const topY = coordinates.y - 1;
    if (rightX <= SEA_BATTLE_FIELD_LENGTH && downY <= SEA_BATTLE_FIELD_LENGTH) {
        if (`${rightX}${downY}` in reservedCells) return true;
    }
    if (rightX <= SEA_BATTLE_FIELD_LENGTH && topY > TOP_AND_LEFT_COORD_BORDER) {
        if (`${rightX}${topY}` in reservedCells) return true;
    }
    if (leftX > TOP_AND_LEFT_COORD_BORDER && downY <= SEA_BATTLE_FIELD_LENGTH) {
        if (`${leftX}${downY}` in reservedCells) return true;
    }
    if (leftX > TOP_AND_LEFT_COORD_BORDER && topY > TOP_AND_LEFT_COORD_BORDER) {
        if (`${leftX}${topY}` in reservedCells) return true;
    }
    return false;
};

const check = (
    arr: Array<{checked: boolean, coordinates: Coordinates}>,
    reservedCells: Cords,
) => {
    const toCheck = arr.find(c => !c.checked);
    if (!toCheck) return;
    const {x, y} = toCheck.coordinates;
    [
        [x+1,y],
        [x-1,y],
        [x,y+1],
        [x,y-1],
    ].forEach(([x, y]) => {
        if (`${x}${y}` in reservedCells && !arr.some(({coordinates: {x: X, y: Y}}) => x === X && y === Y)) {
            arr.push({ checked: false, coordinates: {x, y} });
        }
    });
    toCheck.checked = true;
    if (arr.some(c => !c.checked)) {
        check(arr, reservedCells);
    }
};
const getAdjacentReservedCellsLength = (
    coordinates: Coordinates,
    reservedCells: Cords,
    ): number => {
    const reservedCoordinates: Array<{checked: boolean; coordinates: Coordinates}> = [
        { checked: false, coordinates },
    ];
    check(reservedCoordinates, reservedCells);
    console.log('cells checked', reservedCoordinates);
    return reservedCoordinates.length;
};
function Field(): React.ReactElement {

    const [reservedCells, setReservedCells] = useState<Cords>({});
    const [ships, setShips] = useState<ShipNumberType>({
        OneDeck: 0,
        ThreeDeck: 0,
        TwoDeck: 0,
        FourDeck: 0,
    });


    const handleSquareSelect = (coordinates: Coordinates) => {

        if (isOppositeCellsReserved(coordinates, reservedCells)) return;

        const xYCoordinatesString = getXYCoordinatesString(coordinates);
        if (xYCoordinatesString in reservedCells) {
            const newCoordinates = {...reservedCells};
            delete newCoordinates[xYCoordinatesString];
            setReservedCells(newCoordinates);
        } else {
            const cellsLength = getAdjacentReservedCellsLength(coordinates, reservedCells);
            console.log({cellsLength, ships});
            setReservedCells({...reservedCells, [xYCoordinatesString]: true});
        }
    };

    return <div className="field">
        {fillFieldWithCells(handleSquareSelect, reservedCells)}
    </div>;
}