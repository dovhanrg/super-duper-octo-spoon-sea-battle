import React from "react";

type Props = {
    onClick: () => void;
    className: string;
};
const CellPure = ({onClick, className}: Props): React.ReactElement => {
    return (<div className={className} onClick={onClick}/>);
};

export default CellPure;
