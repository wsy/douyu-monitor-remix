import { getStrMiddle } from "~/utils";
import { Ex_WebSocket_UnLogin } from "~/utils/libs/websocket";
import { STT } from "~/utils/libs/stt";
import { useState } from "react";
import { nobleData } from "~/resources/nobleData";

const MSG_TYPE: any = {
    danmaku: ["chatmsg"],
    gift: ["dgb", "odfbc", "rndfbc", "anbc", "rnewbc", "blab", "fansupgradebroadcast"],
    enter: ["uenter"],
};
enum GIFT_TYPE {
    GIFT = "gift", // 普通礼物
    DIAMOND = "diamond", // 钻粉
    NOBLE = "noble", // 贵族
    FANS = "fans", // 粉丝牌
}

type IMsgType = "danmaku" | "gift" | "enter" | "";

const selectMsgType = (msgType: string): IMsgType => {
    if (msgType === "") return "";
    for (const key in MSG_TYPE) {
        if (MSG_TYPE[key].includes(msgType)) {
            return key as IMsgType;
        }
    }
    return "";
}

const useWebsocket = (options: any, allGiftData: IGiftData) => {
    let ws: Ex_WebSocket_UnLogin | null = null;
    let stt = new STT();

    const [danmakuList, setDanmakuList] = useState<IDanmaku[]>([]);
    const [giftList, setGiftList] = useState<IGift[]>([]);
    const [enterList, setEnterList] = useState<IEnter[]>([]);

    const connectWs = (rid: string): void => {
        if (rid === "") return;
        ws = new Ex_WebSocket_UnLogin(rid, (msg: string) => {
            msgHandler(msg);
        }, () => {
            closeWs();
            connectWs(rid);
        });
    }
    const closeWs = (): void => {
        ws?.close();
        ws = null;
    }

    const msgHandler = (msg: string) => {
        let msgType = selectMsgType(getStrMiddle(msg, "type@=", "/"));
        if (msgType === "") return;
        //  获得socekt序列化数据
        let data = stt.deserialize(msg);
        switch (msgType) {
            case "danmaku":
                handleDanmaku(data);
                break;
            case "gift":
                handleGift(data);
                break;
            case "enter":
                handleEnter(data);
                break;
            default:
                break;
        }
    }

    const handleDanmaku = (data: any) => {
        let obj: IDanmaku = {
            nn: data.nn,
            avatar: data.ic,
            lv: data.level,
            txt: data.txt,
            color: data.col,
            fansName: data.bnn,
            fansLv: data.bl,
            isDiamond: !!data.diaf,
            nobleLv: data.nl,
            isNoble: !!data.nc,
            isRoomAdmin: data.rg == "4",
            isSuper: data.pg == "5",
            isVip: data.ail == "453/" || data.ail == "454/",
            key: data.cid,
        };
        setDanmakuList(list => {
            if (list.length > 500) {
                return [...list.splice(1), obj];
            } else {
                return [...list, obj];
            }
        });
        
    }

    const handleEnter = (data: any) => {
        let obj: IEnter = {
            nn: data.nn,
            avatar: data.ic,
            lv: data.level,
            nobleLv: data.nl,
            key: new Date().getTime() + Math.random(),
        }
        setEnterList(list => [...list, obj]);
    }

    const handleGift = (data: any) => {
        let obj: IGift = {
            type: GIFT_TYPE.GIFT,
            name: "",
            nn: data.nn,
            lv: data.level,
            nl: data.nl,
            bl: data.bl,
            gfid: data.gfid,
            gfcnt: data.gfcnt,
            hits: data.hits,
            key: new Date().getTime() + Math.random(),
        };
        let tmp: any = {};
        switch (data.type) {
            case "dgb":
                tmp = {
                    type: GIFT_TYPE.GIFT,
                    name: allGiftData.data[data.gfid].n,
                };
                break;
            case "odfbc":
                // 开通钻粉
                tmp = {
                    type: GIFT_TYPE.DIAMOND,
                    name: "开通钻粉",
                    nn: data.nick,
                    gfid: "0",
                    gfcnt: "1",
                    hits: "1",
                }
                break;
            case "rndfbc": 
                // 续费钻粉
                tmp = {
                    type: GIFT_TYPE.DIAMOND,
                    name: "续费钻粉",
                    nn: data.nick,
                    gfid: "0",
                    gfcnt: "1",
                    hits: "1",
                }
                break;
            case "anbc":
                // 开通贵族
                if (data.drid !== window.rid) return; // 不在本房间开通则丢弃
                tmp = {
                    type: GIFT_TYPE.NOBLE,
                    name: "开通" + nobleData.data[data.nl].name,
                    nn: data.unk,
                    nl: data.nl, // 贵族等级
                    gfid: "0",
                    gfcnt: "1",
                    hits: "1",
                }
                break;
            case "rnewbc":
                // 续费贵族
                if (data.drid !== window.rid) return; // 不在本房间开通则丢弃
                tmp = {
                    type: GIFT_TYPE.NOBLE,
                    name: "续费" + nobleData.data[data.nl].name,
                    nn: data.unk,
                    nl: data.nl, // 贵族等级
                    gfid: "0",
                    gfcnt: "1",
                    hits: "1",
                }
                break;
            case "blab":
                // 30级以下粉丝牌升级
                if (data.drid !== window.rid) return; // 不在本房间开通则丢弃
                tmp = {
                    type: GIFT_TYPE.FANS,
                    name: `粉丝牌升到${data.bl}级`,
                    gfid: "0",
                    gfcnt: "1",
                    hits: "1",
                }
                break;
            case "fansupgradebroadcast":
                // 30以上粉丝牌升级
                if (data.drid !== window.rid) return; // 不在本房间开通则丢弃
                tmp = {
                    type: GIFT_TYPE.FANS,
                    name: `粉丝牌升到${data.otherContent}级`,
                    nn: data.userName,
                    bl: data.otherContent,
                    gfid: "0",
                    gfcnt: "1",
                    hits: "1",
                }
                break;
            default:
                break;
        }
        obj = {...obj, ...tmp};
        setGiftList(list => [...list, obj]);
    }

    return {
        connectWs, closeWs, danmakuList, giftList, enterList
    }
}

export default useWebsocket;