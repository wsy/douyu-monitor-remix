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

declare let STT: any