enum OPTIONS_ACTION {
    RESET = "重置设置",
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
    DANMAKU_BAN_NICKNAMES = "danmaku_ban_nicknames"
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
        // 设置弹幕显示内容，如果在数组里就显示
        // level:等级  avatar:头像  fans:粉丝牌  noble:贵族  roomAdmin:房管  diamond:钻粉
        show: ["level", "avatar", "fans", "noble", "roomAdmin", "diamond", "vip", "color"],
        // 屏蔽项
        ban: {
            level: 0, // 等级
            keywords: "", // 关键词
            nicknames: "", // 关键昵称
            isFilterRepeat: false, // 过滤重复弹幕，如果下一条内容与上一条一样，则丢弃
        }
    },
};


const optionsReducer = (state: IOptions, action: IOptionsAction): IOptions => {
    let { type, payload } = action;
    switch (type) {
        case OPTIONS_ACTION.RESET:
            state = defaultOptions;
            break;
        case OPTIONS_ACTION.SWITCH:
            state.switch = payload;
            break;
        case OPTIONS_ACTION.DIRECTION:
            state.direction = payload;
            break;
        case OPTIONS_ACTION.FONTSIZE:
            document.documentElement.style.setProperty('--avatarSize', String(Number(payload) * 2) + "px");
            state.fontSize = Number(payload);
            break;
        case OPTIONS_ACTION.SIZE:
            state.size = {...state.size, ...payload};
            break;
        case OPTIONS_ACTION.ALIGN:
            document.documentElement.style.setProperty('--justifyContent', payload === "right" ? "flex-end" : "flex-start");
            document.documentElement.style.setProperty('--textAlign', payload === "right" ? "right" : "left");
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
            state.danmaku.ban.keywords = payload;
            break;
        case OPTIONS_ACTION.DANMAKU_BAN_NICKNAMES:
            state.danmaku.ban.nicknames = payload;
            break;
        default:
            break;
    }
    return state;
}

export {
    OPTIONS_ACTION,
    defaultOptions,
    optionsReducer
};