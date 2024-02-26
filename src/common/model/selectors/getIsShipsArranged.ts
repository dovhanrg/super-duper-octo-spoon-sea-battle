import getLocalSelectedCells from "./getLocalSelectedCells";
import {getAdjacentReservedCells} from "../../../components/Field/helpers/getAdjacentReservedCells";

type ShipNumber = Record<string, number>;

const shipsExactNumber: ShipNumber = {1: 4, 2: 3, 3: 2, 4: 1};

const getIsShipsArranged = (): boolean => {
    const shipsWithCoordinates = getAdjacentReservedCells(getLocalSelectedCells());
    const ships = shipsWithCoordinates.reduce((acc, coordsArr) => {
        const dockCount = coordsArr.length;
        acc[dockCount] = (acc[dockCount] ?? 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const correctShips = Object.keys(ships);
    return Boolean(correctShips.length) && Object.keys(shipsExactNumber).every((shipDocks) => {
        return shipDocks in ships && ships[shipDocks] === shipsExactNumber[shipDocks];
    });
};

export default getIsShipsArranged;
