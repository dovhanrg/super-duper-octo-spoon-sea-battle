

export const pong = (ws) => {
    ws.send(JSON.stringify({type: 'pong'}));
}