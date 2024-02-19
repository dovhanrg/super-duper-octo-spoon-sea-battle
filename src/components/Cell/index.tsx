import React from "react";
import CellPure from "./Pure";
import classNames from "classnames";


type Props = {
    onClick: () => void;
    isOccupied?: boolean;
};
const Cell = (
    {
        onClick,
        isOccupied,
    }: Props
): React.ReactElement => {
    const className = classNames('cell', {'occupied-cell': isOccupied});

    return (<CellPure onClick={onClick} className={className}/>);
};

export default Cell;
