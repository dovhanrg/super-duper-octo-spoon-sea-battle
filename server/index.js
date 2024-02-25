import express from 'express';
import ws from 'ws';
import {webSocketRouter} from "./webSocketRouter.js";

const app = express();

const wss = new ws.Server({noServer: true});

app.get('/ws', (req, res) => {
    // res.send('ho!')
    console.log('req.headers: ', req.headers);
    console.log('req.headers.upgrade: ', req.headers.upgrade);
    console.log('req.headers.connection: ', req.headers.connection);
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
            console.log('[Error] No an object', e);
            ws.send(JSON.stringify({status: 'failed'}));
        }
        // console.log(obj.type, JSON.stringify(message));
        // message = message.toString();
        // ws.send(message);
        // let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
        // ws.send(`Hello from server, ${name}!`);

        // setTimeout(() => ws.close(1000, "Bye!"), 5000);
    });
}

app.listen(8080);