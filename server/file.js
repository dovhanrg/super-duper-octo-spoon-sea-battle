import fs from "node:fs/promises";
import {getState, updateState} from "./state.js";

export const writeStateToFile = async (data) => {
    try {
        await fs.writeFile('state.json', JSON.stringify({...getState(), ...data}, null, 2));
    } catch (e) {
        console.log(e);
    }
};

export const readStateFromFile = async () => {
    try {
        const buff = await fs.readFile('state.json');
        if (buff.length) {
            updateState(JSON.parse(buff.toString()));
        }
    } catch (e) {
        console.log(e);
    }
};