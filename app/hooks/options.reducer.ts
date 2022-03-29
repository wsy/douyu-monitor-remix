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