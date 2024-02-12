import React, {useCallback} from "react";
import classNames from "classnames";


type Props = {
    // onClick: (cellIndex:  number) => void;
    isOccupied?: boolean;
    // cellIndex: number;
}
export default function Cell(
    {
        // onClick,
        isOccupied,
        // cellIndex
    }: Props
) {
    // const handleClick = useCallback(() => {
    //     onClick(cellIndex);
    // }, [cellIndex]);
    return (<div
        className={classNames('cell', {'occupied-cell': isOccupied})}
        // onClick={handleClick}
    />);
}