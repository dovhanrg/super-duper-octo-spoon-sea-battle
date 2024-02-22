import {MessageType} from "../../socket";
import updateUserId from "./updateUserId";


const onReceive = (data: string) => {
    console.log(`[message] Data received from server: ${JSON.stringify(data)}`);
    const resp: MessageType = JSON.parse(data);
    switch (resp.type) {
        case "init_resp":
            updateUserId(resp);
            break;
    }
};

export default onReceive;