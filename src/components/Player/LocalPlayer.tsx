import Field from "../Field";
import {observer} from "mobx-react-lite";
import updateLocalSelectedCells from "../../common/model/actions/updateLocalSelectedCells";
import getLocalSelectedCells from "../../common/model/selectors/getLocalSelectedCells";
import getIsShipsArranged from "../../common/model/selectors/getIsShipsArranged";
import getIsPlayerReady from "../../common/model/selectors/getIsPlayerReady";
import setIsBattleStarted from "../../common/model/actions/setIsBattleStarted";


export type Coordinates = { x: number, y: number };
export type SelectedCells = Record<string, Coordinates>;
export type Cords = Record<string, Coordinates>;

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


const LocalPlayer = observer(() => {

    const selectedCells = getLocalSelectedCells();
    const isShipsArranged = getIsShipsArranged();
    const isPlayerReady = getIsPlayerReady();

    const handleCellSelect = (coordinates: Coordinates) => {
        if (isOppositeCellsReserved(coordinates, selectedCells) || isPlayerReady) return;
        updateLocalSelectedCells(coordinates);
    };

    const handleStartClick = () => {
        if (isShipsArranged && !isPlayerReady) setIsBattleStarted();
    };

    return <div>
        <p>Select number of sips to start. Docks in ships must satisfy next rules:</p>
        <p>One dock ships: 4</p>
        <p>Two dock ships: 3</p>
        <p>Three dock ships: 2</p>
        <p>Four dock ships: 1</p>
        <div><p>Is ready to start: {isShipsArranged ? <span>Ready</span> : <span>Not Ready</span>}</p></div>
        <div>
            <button disabled={isPlayerReady || !isShipsArranged} onClick={handleStartClick}>Ready</button>
        </div>
        <Field onCellClick={handleCellSelect} selectedCells={selectedCells}/>
    </div>;
});

export default LocalPlayer;
