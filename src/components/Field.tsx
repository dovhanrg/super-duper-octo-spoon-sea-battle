import Cell from "./Cell";
import React, {useEffect, useState} from "react";

const SEA_BATTLE_FIELD_LENGTH = 10;
const TOP_AND_LEFT_COORD_BORDER = 0;




export type Coordinates = {x: number, y: number};

export type Cords = Record<string, Coordinates>;
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
    arr: Coordinates[],
    reservedCells: Cords,
    currentCoords: Coordinates,
): Coordinates[] => {
    const checkedArr: Coordinates[] = [];
    checkedArr.push(currentCoords);
    [
        [currentCoords.x+1,currentCoords.y],
        [currentCoords.x-1,currentCoords.y],
        [currentCoords.x,currentCoords.y+1],
        [currentCoords.x,currentCoords.y-1],
    ].forEach(([x, y]) => {
        if (`${x}${y}` in reservedCells) {
            const index = arr.findIndex(({x: X, y:Y}) => x === X && y === Y);
            if (index > -1) {
                const c = arr.splice(index, 1)[0];
                const res = check(arr, reservedCells, c);
                checkedArr.push(...res);
            }
        }
    });
    return checkedArr;
};
const getAdjacentReservedCells = (
    reservedCells: Cords,
    ) => {
    const reservedCoordinates: Array<Coordinates[]> = [];
    const coordToCheck = Object.values(reservedCells);
    while (coordToCheck.length) {
        const c = coordToCheck.shift();
        if (c) {
            const r = check(coordToCheck, reservedCells, c);
            reservedCoordinates.push(r);
        }
    }
};
function Field(): React.ReactElement {

    const [reservedCells, setReservedCells] = useState<Cords>({});
    const [coordsFlat, setCoordsFlat] = useState<Coordinates[]>([]);

    useEffect(() => {
        getAdjacentReservedCells(reservedCells);
    }, [reservedCells]);
    const handleSquareSelect = (coordinates: Coordinates) => {

        if (isOppositeCellsReserved(coordinates, reservedCells)) return;

        const xYCoordinatesString = getXYCoordinatesString(coordinates);
        if (xYCoordinatesString in reservedCells) {
            const newCoordinates = {...reservedCells};
            delete newCoordinates[xYCoordinatesString];
            setReservedCells(newCoordinates);
            const coorIndex = coordsFlat.findIndex(({x, y}) => coordinates.x === x && coordinates.y === y);
            setCoordsFlat(coordsFlat.toSpliced(coorIndex, 1));
        } else {
            // const shipsInCells = getAdjacentReservedCells(coordinates, reservedCells);
            setReservedCells({...reservedCells, [xYCoordinatesString]: coordinates});
            setCoordsFlat(coordsFlat.concat(coordinates));
        }

    };

    return <div className="field">
        {fillFieldWithCells(handleSquareSelect, reservedCells)}
    </div>;
}