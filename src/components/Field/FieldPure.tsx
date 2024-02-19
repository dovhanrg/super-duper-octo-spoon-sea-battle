import React from "react";

type Props = {
    children: React.ReactNode;
};

const  FieldPure = ({children}: Props): React.ReactNode => {
    return (<div className="field">{children}</div>);
};

export default FieldPure;
