import { useEffect } from "react";
let ws: Ex_WebSocket_UnLogin;
const useWebsocket = (rid: string, msgHandler: (msg: string) => void) => {
    useEffect(() => {
		connectWs(rid, msgHandler);
	}, [msgHandler, rid]);
}

const connectWs = (rid: string, msgHandler: (msg: string) => void) => {
    ws = new Ex_WebSocket_UnLogin(rid, (msg: string) => {
        msgHandler(msg);
    }, () => {
        ws.close();
        connectWs(rid, msgHandler);
    })
}

export default useWebsocket;