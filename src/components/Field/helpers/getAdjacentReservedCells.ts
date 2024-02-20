import {Coordinates, Cords} from "../../Player/LocalPlayer";


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
export const getAdjacentReservedCells = (
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
