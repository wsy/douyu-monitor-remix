declare interface Window {
    rid: string
}

// 礼物数据
interface IGiftItem {
    n: string;
    pic: string;
    pc: number;
}

interface IGiftList {
    [gid: string]: IGiftItem;
}

interface IGiftData {
    prefix: string;
    data: IGiftList;
}

// 贵族数据
interface INobleItem {
    name: string;
    pic: string;
}
interface INobleList {
    [id: string]: INobleItem;
}
interface INobleData {
    prefix: string;
    data: INobleList;
}

// 弹幕颜色
interface IDanmakuColor {
    [id: string]: string
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

interface IDanmaku {
    nn: string; // 昵称
    avatar: string; // 头像地址 https://apic.douyucdn.cn/upload/ + avatar + _small.jpg
    lv: string; // 等级
    txt: string; // 弹幕内容
    color: string; // 弹幕颜色 undefine就是普通弹幕 2蓝色 3绿色 6粉色 4橙色 5紫色 1红色
    fansName: string; // 粉丝牌名字
    fansLv: string; // 粉丝牌等级
    isDiamond: boolean; // 是否是钻粉
    nobleLv: string; // 贵族等级
    isNoble: boolean; // 贵族弹幕是否开启，1开
    isAdmin: boolean; // 房管，data.rg为4则是房管
    isSuper: boolean; // 超管，data.pg为5则为超管
    isVip: boolean; // vip，如果是 453/则为vip  454/则为超级vip
    key: string | number; // 唯一标识
}

interface IEnter {
    nn: string; // 昵称
    avatar: string; // 头像地址 https://apic.douyucdn.cn/upload/ + avatar + _small.jpg
    lv: string; // 等级
    nobleLv: string; // 贵族等级
    key: string | number; // 唯一标识
}

interface IGift {
    type: "gift" | "diamond" | "noble" | "fans"; // 礼物类型
    name: string; // 礼物名称
    nn: string; // 昵称
    lv: string; // 等级
    nl: string; // 贵族等级
    bl: string; // 粉丝牌等级
    gfid: string; // 礼物ID
    gfcnt: string; // 礼物数量
    hits: string; // 连击
    key: string | number; // 唯一标识
}

interface IOptions {
    mode: "day" | "night"; // 日间模式还是夜间模式。值：day/night
    switch: string[]; // 每个模块开关，同时指定了顺序。值：["enter", "gift", "danmaku"]
    direction: "column" | "row"; // 纵向还是横向排列。值：row/column
    fontSize: number; // 字号大小
    size: Size; // 每个模块的占比%
    // order: Size;
    // align: string;
    
    // threshold: number;
    // transparent: boolean;
    // animation: boolean;
    // isSaveData: boolean;
    // danmaku: Danmaku;
    // enter: Enter;
    // gift: Gift;
    // [option: string]: any
}

interface Size {
    danmaku: number,
    enter: number,
    gift: number,
}