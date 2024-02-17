import Cell from "./Cell";
import React, {useEffect, useState} from "react";

const SEA_BATTLE_FIELD_LENGTH = 10;
export type Coordinates = {x: number, y: number};

export type Cords = Record<string, Coordinates>;
type ShipNumber = Record<string, number>;
export default Field;


const shipsExactNumber: ShipNumber = {1: 4, 2: 3, 3: 2, 4: 1};

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
    const {x, y} = coordinates;
    const rightX = x + 1;
    const downY = y + 1;
    const leftX = x - 1;
    const topY = y - 1;
    return `${rightX}${downY}` in reservedCells
        || `${rightX}${topY}` in reservedCells
        || `${leftX}${downY}` in reservedCells
        || `${leftX}${topY}` in reservedCells;

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
    ): Array<Coordinates[]> => {
    const reservedCoordinates: Array<Coordinates[]> = [];
    const coordToCheck = Object.values(reservedCells);
    while (coordToCheck.length) {
        const c = coordToCheck.shift();
        if (c) {
            const r = check(coordToCheck, reservedCells, c);
            reservedCoordinates.push(r);
        }
    }
    return reservedCoordinates;
};
function Field(): React.ReactElement {

    const [reservedCells, setReservedCells] = useState<Cords>({});
    const [readyToStart, setReadyToStart] = useState(false);

    useEffect(() => {
        const shipsWithCoordinates = getAdjacentReservedCells(reservedCells);
        const ships = shipsWithCoordinates.reduce((acc, coordsArr) => {
            const dockCount = coordsArr.length;
            acc[dockCount] = (acc[dockCount] ?? 0)+1;
            return acc;
        }, {} as Record<string, number>);
        const correctShips = Object.keys(ships);
        if (correctShips.length) {
            const isNumberOfShipsCorrect = Object.keys(ships).every((shipDocks) => {
                return shipDocks in shipsExactNumber && ships[shipDocks] === shipsExactNumber[shipDocks];
            });
            if (isNumberOfShipsCorrect) {
                setReadyToStart(true);
            } else {
                setReadyToStart(false);
            }
        } else {
            setReadyToStart(false);
        }
    }, [reservedCells]);
    const handleSquareSelect = (coordinates: Coordinates) => {

        if (isOppositeCellsReserved(coordinates, reservedCells)) return;

        const xYCoordinatesString = getXYCoordinatesString(coordinates);
        if (xYCoordinatesString in reservedCells) {
            const newCoordinates = {...reservedCells};
            delete newCoordinates[xYCoordinatesString];
            setReservedCells(newCoordinates);
        } else {
            setReservedCells({...reservedCells, [xYCoordinatesString]: coordinates});
        }

    };

    return <div className="field">
        {fillFieldWithCells(handleSquareSelect, reservedCells)}
    </div>;
}