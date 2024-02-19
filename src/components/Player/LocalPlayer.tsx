import {useEffect, useState} from "react";
import {getXYCoordinatesString} from "../Field/helpers";
import Field from "../Field";


export type Coordinates = { x: number, y: number };
export type SelectedCells = Record<string, Coordinates>;
export type Cords = Record<string, Coordinates>;
type ShipNumber = Record<string, number>;


const shipsExactNumber: ShipNumber = {1: 4, 2: 3, 3: 2, 4: 1};
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

const checkAdjacentReservedCells = (
    arr: Coordinates[],
    reservedCells: Cords,
    currentCoords: Coordinates,
): Coordinates[] => {
    const checkedArr: Coordinates[] = [];
    checkedArr.push(currentCoords);
    [
        [currentCoords.x + 1, currentCoords.y],
        [currentCoords.x - 1, currentCoords.y],
        [currentCoords.x, currentCoords.y + 1],
        [currentCoords.x, currentCoords.y - 1],
    ].forEach(([x, y]) => {
        if (`${x}${y}` in reservedCells) {
            const index = arr.findIndex(({x: X, y: Y}) => x === X && y === Y);
            if (index > -1) {
                const c = arr.splice(index, 1)[0];
                const res = checkAdjacentReservedCells(arr, reservedCells, c);
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
            const r = checkAdjacentReservedCells(coordToCheck, reservedCells, c);
            reservedCoordinates.push(r);
        }
    }
    return reservedCoordinates;
};
const LocalPlayer = () => {
    const [selectedCells, setSelectedCells] = useState<Cords>({});
    const [isReadyToStart, setIsReadyToStart] = useState(false);
    const [isBattleStarted, setIsBattleStarted] = useState(false);

    useEffect(() => {
        const shipsWithCoordinates = getAdjacentReservedCells(selectedCells);
        const ships = shipsWithCoordinates.reduce((acc, coordsArr) => {
            const dockCount = coordsArr.length;
            acc[dockCount] = (acc[dockCount] ?? 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const correctShips = Object.keys(ships);
        setIsReadyToStart(() => {
            return Boolean(correctShips.length) && Object.keys(shipsExactNumber).every((shipDocks) => {
                return shipDocks in ships && ships[shipDocks] === shipsExactNumber[shipDocks];
            });
        });
    }, [selectedCells]);
    const handleCellSelect = (coordinates: Coordinates) => {

        if (isOppositeCellsReserved(coordinates, selectedCells) || isBattleStarted) return;

        const xYCoordinatesString = getXYCoordinatesString(coordinates);
        if (xYCoordinatesString in selectedCells) {
            const newCoordinates = {...selectedCells};
            delete newCoordinates[xYCoordinatesString];
            setSelectedCells(newCoordinates);
        } else {
            setSelectedCells({...selectedCells, [xYCoordinatesString]: coordinates});
        }

    };

    const handleStartClick = () => {
        if (isReadyToStart && !isBattleStarted) setIsBattleStarted(true);
    };
    console.log({isReadyToStart});


    return <div>
        <p>Select number of sips to start. Docks in ships must satisfy next rules:</p>
        <p>One dock ships: 4</p>
        <p>Two dock ships: 3</p>
        <p>Three dock ships: 2</p>
        <p>Four dock ships: 1</p>
        <div><p>Is ready to start: {isReadyToStart ? <span>Ready</span> : <span>Not Ready</span>}</p></div>
        <div>
            <button disabled={isBattleStarted || !isReadyToStart} onClick={handleStartClick}>Start</button>
        </div>
        <Field onCellClick={handleCellSelect} selectedCells={selectedCells}/>
    </div>;
};

export default LocalPlayer;
