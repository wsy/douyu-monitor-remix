enum OPTIONS_ACTION {
    RESET = "重置设置",
    SWITCH = "switch",
    DIRECTION = "direction",
    FONTSIZE = "fontSize",
}

interface IOptionsAction {
    type: OPTIONS_ACTION,
    payload?: any
}

// 默认配置，遵循数据驱动视图
const defaultOptions: IOptions = {
    mode: "day",
    switch: ["enter", "gift", "danmaku"],
    direction: "column",
    fontSize: 14,
};


const optionsReducer = (state: IOptions, action: IOptionsAction): IOptions => {
    switch (action.type) {
        case OPTIONS_ACTION.RESET:
            state = defaultOptions;
            break;
        // case OPTIONS_ACTION.SWITCH:
        //     state.switch = action.payload;
        //     break;
        // case OPTIONS_ACTION.DIRECTION:
        //     state.direction = action.payload;
        //     break;
        // case OPTIONS_ACTION.FONTSIZE:
        //     state.fontSize = action.payload;
        //     break;
        default:
            state[action.type as never] = action.payload;
            break;
    }
    return state;
}

export {
    OPTIONS_ACTION,
    defaultOptions,
    optionsReducer
};