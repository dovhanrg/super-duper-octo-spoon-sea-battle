import React, {useCallback} from "react";
import classNames from "classnames";
import {Coordinates} from "./Field";


type Props = {
    onClick: (coordinates: {x: number, y: number}) => void;
    isOccupied?: boolean;
    coordinates: Coordinates,
}
export default function Cell(
    {
        onClick,
        isOccupied,
        coordinates,
    }: Props
) {
    const handleClick = useCallback(() => {
        onClick(coordinates);
    }, [onClick, coordinates]);
    return (<div
        className={classNames('cell', {'occupied-cell': isOccupied})}
        onClick={handleClick}
    />);
}