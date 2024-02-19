import Field from "../Field";


const RemotePlayer = () => {
    return (
        <div><Field onCellClick={() => {console.log('click');}} selectedCells={{}} /></div>
    );
};

export default RemotePlayer;
