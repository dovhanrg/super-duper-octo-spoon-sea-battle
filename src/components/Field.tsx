import Cell from "./Cell";
import React, {useCallback, useEffect, useState} from "react";

const seaBattleSquare = 10;

const CELLS_COUNT = Math.pow(seaBattleSquare, 2);

export default Field;

const cells = [0, 1, 4, 30, 45, 60];


type Boats = {
    singleDeck: number[],
    twoDeck: number[],
    threeDeck: number[],
    fourDeck: number[],
}
const boats: Boats = {
    singleDeck: [],
    twoDeck: [],
    threeDeck: [],
    fourDeck: [],
}

// to get interval
// Math.floor(cellIndex/seaBattleSquare)*seaBattleSquare+(seaBattleSquare-1)

const getCurrentRangeIndex = (cellIndex: number) => {
        return Math.floor(cellIndex / seaBattleSquare)
}
const getCellIndexHorizontal = (cellIndex: number,rangeIndex: number) => {
    return cellIndex-rangeIndex*10;
}
const getCellRangesToCheck = (cellIndex: number, rangeIndex: number): {
    minRange: number[];
    currentRange: number[];
    maxRange: number[];
} => {
    let minRange: number[], maxRange: number[];
    const currentRange: number[] = [
        rangeIndex*seaBattleSquare,
        rangeIndex*seaBattleSquare+seaBattleSquare-1,
    ];
    if (rangeIndex - 1 >= 0) {
        const minRangeStart = (rangeIndex-1)*seaBattleSquare;
        minRange = [minRangeStart,minRangeStart+seaBattleSquare-1]
    } else {
        minRange = currentRange;
    }
    if (rangeIndex+1 !== seaBattleSquare) {
        const maxRangeStart = (rangeIndex+1)*seaBattleSquare;
        maxRange = [maxRangeStart,maxRangeStart+seaBattleSquare-1]
    } else {
        maxRange = currentRange;
    }
    return {
        minRange,
        currentRange,
        maxRange,
    }
}
function Field() {

    const [occupiedCells, setOccupiedCells] = useState<number[]>([]);

    const updateOccupiedCells = () => {
        console.log({occupiedCells});
    }

    useEffect(() => {
        console.dir({occupiedCells});
    }, [occupiedCells]);

    const onClick = useCallback((cellIndex: number) => {
        const currentRangeIndex = getCurrentRangeIndex(cellIndex);
        const horizontalCellIndex = getCellIndexHorizontal(cellIndex, currentRangeIndex);
        const {minRange, maxRange, currentRange} = getCellRangesToCheck(cellIndex, currentRangeIndex);

        // console.dir({minRange, maxRange, currentRange});
        // updateOccupiedCells();
        console.log()
        setOccupiedCells((prevState) => {
            // console.log(prevState);
            return [...prevState, cellIndex];
        });
    }, []);

    // const cells = new Array(CELLS_COUNT).fill(null);
    const cells = [];
    for (let x = 0; x < CELLS_COUNT; x++) {
        for (let y = 0; y < CELLS_COUNT; y++) {
            cells.push(<Cell />);
        }
    }
    return <div className="field">
        {cells}
    </div>
}