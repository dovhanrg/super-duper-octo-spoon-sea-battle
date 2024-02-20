import Field from "../Field";
import {observer} from "mobx-react-lite";
import updateLocalSelectedCells from "../../common/model/actions/updateLocalSelectedCells";
import getLocalSelectedCells from "../../common/model/selectors/getLocalSelectedCells";
import getIsReadyToStart from "../../common/model/selectors/getIsReadyToStart";
import getIsBattleStarted from "../../common/model/selectors/getIsBattleStarted";
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
    const isReadyToStart = getIsReadyToStart();
    const isBattleStarted = getIsBattleStarted();

    const handleCellSelect = (coordinates: Coordinates) => {
        if (isOppositeCellsReserved(coordinates, selectedCells) || isBattleStarted) return;
        updateLocalSelectedCells(coordinates);
    };

    const handleStartClick = () => {
        if (isReadyToStart && !isBattleStarted) setIsBattleStarted();
    };

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
});

export default LocalPlayer;
