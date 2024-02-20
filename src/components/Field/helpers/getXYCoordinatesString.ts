import {Coordinates} from "../../Player/LocalPlayer";


export const getXYCoordinatesString = (coordinates: Coordinates): `${number}${number}`=> `${coordinates.x}${coordinates.y}`;

