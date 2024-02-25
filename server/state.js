
let state = {};

export const updateState = (newState) => {
    state = newState;
}

export const getState = () => state;