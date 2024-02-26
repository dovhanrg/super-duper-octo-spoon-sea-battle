import express from 'express';
import ws from 'ws';
import {webSocketRouter} from "./webSocketRouter.js";

const app = express();

const wss = new ws.Server({noServer: true});

app.get('/ws', (req, res) => {
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() !== 'websocket') {
        res.end();
        return;
    }
    if (!(req.headers.connection ?? '').match(/\bupgrade\b/i)) {
        res.end();
        return;
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
});

function onConnect(ws, req) {
    ws.on('message', function (message) {
        try {
            const obj = JSON.parse(message);
            webSocketRouter(ws,obj);
        } catch (e) {
            console.log('[Error] Not an object', e);
            ws.send(JSON.stringify({status: 'failed'}));
        }
    });
}

app.listen(8080);