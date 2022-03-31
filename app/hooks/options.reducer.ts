import { formatObj } from "~/utils";

enum OPTIONS_ACTION {
    RESET = "reset", // 恢复默认设置
    SET = "set", // 设置options的值，用于初始化options
    MODE = "mode",
    SWITCH = "switch",
    DIRECTION = "direction",
    FONTSIZE = "fontSize",
    SIZE = "size",
    ALIGN = "align",
    THRESHOLD = "threshold",
    TRANSPARENT = "transparent",
    ANIMATION = "animation",
    DANMAKU_SHOW = "danmaku_show",
    DANMAKU_BAN_LEVEL = "danmaku_ban_level",
    DANMAKU_BAN_KEYWORDS = "danmaku_ban_keywords",
    DANMAKU_BAN_NICKNAMES = "danmaku_ban_nicknames",
    DANMAKU_BAN_ISFILTERREPEAT = "danmaku_ban_isFilterRepeat",
    ENTER_SHOW = "enter_show",
    ENTER_KEYWORDS = "enter_keywords",
    ENTER_BAN_LEVEL = "enter_ban_level",
    GIFT_TOTALPRICE = "gift_totalPrice",
    GIFT_BAN_PRICE = "gift_ban_price",
    GIFT_BAN_KEYWORDS = "gift_ban_keywords",
    GIFT_BAN_FANSLEVEL = "gift_ban_fansLevel",
    GIFT_FANSLEVEL = "gift_fansLevel",
}

interface IOptionsAction {
    type: OPTIONS_ACTION;
    payload?: any;
}

// 默认配置，遵循数据驱动视图
const defaultOptions: IOptions = {
    mode: "day",
    switch: ["enter", "gift", "danmaku"],
    direction: "column",
    fontSize: 14,
    size: {
        enter: 15,
        gift: 25,
        danmaku: 30,
    },
    align: "left",
    threshold: 200,
    transparent: false,
    animation: true,
    danmaku: {
        show: ["level", "avatar", "fans", "noble", "roomAdmin", "diamond", "vip", "color"],
        ban: {
            level: 0,
            keywords: [],
            nicknames: [],
            isFilterRepeat: false,
        }
    },
    enter: {
        show: ["level", "avatar", "noble"],
        keywords: [],
        ban: {
            level: 0,
        }
    },
    gift: {
        totalPrice: 100,
        fansLevel: 11,
        ban: {
            price: 0,
            keywords: [],
            fansLevel: 6,
        }
    }
};


const optionsReducer = (state: IOptions, action: IOptionsAction) => {
    let { type, payload } = action;
    switch (type) {
        case OPTIONS_ACTION.RESET:
            return defaultOptions;
        case OPTIONS_ACTION.SET:
            return formatObj(payload, defaultOptions);
        case OPTIONS_ACTION.MODE:
            state.mode = payload;
            break;
        case OPTIONS_ACTION.SWITCH:
            state.switch = payload;
            break;
        case OPTIONS_ACTION.DIRECTION:
            state.direction = payload;
            break;
        case OPTIONS_ACTION.FONTSIZE:
            state.fontSize = Number(payload);
            break;
        case OPTIONS_ACTION.SIZE:
            state.size = {...state.size, ...payload};
            break;
        case OPTIONS_ACTION.ALIGN:
            state.align = payload;
            break;
        case OPTIONS_ACTION.ANIMATION:
            state.animation = payload;
            break;
        case OPTIONS_ACTION.TRANSPARENT:
            state.transparent = payload;
            break;
        case OPTIONS_ACTION.THRESHOLD:
            state.threshold = Number(payload);
            break;
        case OPTIONS_ACTION.DANMAKU_SHOW:
            state.danmaku.show = [...payload];
            break;
        case OPTIONS_ACTION.DANMAKU_BAN_LEVEL:
            state.danmaku.ban.level = Number(payload);
            break;
        case OPTIONS_ACTION.DANMAKU_BAN_KEYWORDS:
            state.danmaku.ban.keywords = String(payload).trim().split(",") || [];
            break;
        case OPTIONS_ACTION.DANMAKU_BAN_NICKNAMES:
            state.danmaku.ban.nicknames = String(payload).trim().split(",") || [];
            break;
        case OPTIONS_ACTION.DANMAKU_BAN_ISFILTERREPEAT:
            state.danmaku.ban.isFilterRepeat = payload;
            break;
        case OPTIONS_ACTION.ENTER_SHOW:
            state.enter.show = [...payload];
            break;
        case OPTIONS_ACTION.ENTER_KEYWORDS:
            state.enter.keywords = String(payload).trim().split(",") || [];
            break;
        case OPTIONS_ACTION.ENTER_BAN_LEVEL:
            state.enter.ban.level = Number(payload);
            break;
        case OPTIONS_ACTION.GIFT_TOTALPRICE:
            state.gift.totalPrice = Number(payload);
            break;
        case OPTIONS_ACTION.GIFT_BAN_PRICE:
            state.gift.ban.price = Number(payload);
            break;
        case OPTIONS_ACTION.GIFT_BAN_KEYWORDS:
            state.gift.ban.keywords = String(payload).trim().split(",") || [];
            break;
        case OPTIONS_ACTION.GIFT_BAN_FANSLEVEL:
            state.gift.ban.fansLevel = Number(payload);
            break;
        case OPTIONS_ACTION.GIFT_FANSLEVEL:
            state.gift.fansLevel = Number(payload);
            break;
        default:
            break;
    }
}

export {
    OPTIONS_ACTION,
    defaultOptions,
    optionsReducer
};