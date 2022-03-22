// 礼物数据
interface IGift {
    n: string,
    pic: string,
    pc: number,    
}

interface IGiftList {
    [gid: string]: IGift
}

interface IGiftData {
    prefix: string
    data: IGiftList
}

declare class STT {
    public escape(v: string): string
    public unescape(v: string): string
    public deserialize(v: string): string
}

declare class Ex_WebSocket_UnLogin {
    constructor(
        rid: string,
        msgHandler: (msg: string) => void,
        closeHandler?: () => void,
    )
    public close(): void
}