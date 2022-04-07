declare interface Window {
    rid: string
}

// 礼物数据
interface IGiftItem {
    n: string; // 礼物名称
    pic: string; // 礼物图片
    pc: number; // 礼物价格
}

interface IGiftData {
    [gid: string]: IGiftItem;
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
    isRoomAdmin: boolean; // 房管，data.rg为4则是房管
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

// 主题切换
type IMode = "day" | "night";

interface IOptions {
    mode: IMode; // 日间模式还是夜间模式。值：day/night
    switch: string[]; // 每个模块开关，同时指定了顺序。值：["enter"; "gift"; "danmaku"]
    direction: "column" | "row"; // 纵向还是横向排列。值：row/column
    fontSize: number; // 字号大小
    size: Size; // 每个模块的占比%
    align: "left" | "right"; // 设置左右对齐。值：left/right
    animation: boolean; // 是否开启动画
    threshold: number; // 数据上限，超过上限的数据会被删除
    transparent: boolean; // 是否背景透明
    danmaku: IOptionsDanmaku; // 弹幕设置
    gift: IOptionsGift;
    enter: IOptionsEnter; // 入场设置
}

interface Size {
    danmaku: number;
    enter: number;
    gift: number;
}

interface IOptionsDanmaku {
    show: string[]; // 弹幕显示元素。值：level:等级  avatar:头像  fans:粉丝牌  noble:贵族  roomAdmin:房管  diamond:钻粉  vip:VIP  color:弹幕颜色
    keyNicknames: string[]; // 高亮昵称
    ban: IOptionsDanmakuBan;
}
interface IOptionsDanmakuBan {
    level: number; // 等级小于等于
    keywords: string[]; // 关键词
    nicknames: string[]; // 关键昵称
    isFilterRepeat: boolean; // 是否过滤重复弹幕，如果下一条内容与上一条一样，则丢弃
}

interface IOptionsEnter {
    show: string[]; // 入场显示元素。值：level:等级  avatar:头像   noble:贵族
    keywords: string[]; // 高亮关键昵称
    ban: IOptionsEnterBan;
}

interface IOptionsEnterBan {
    level: number; // 等级小于等于
}

interface IOptionsGift {
    totalPrice: number; // 高亮总价大于等于
    fansLevel: number; // 高亮粉丝牌升级大于等于
    ban: IOptionsGiftBan;
}

interface IOptionsGiftBan {
    price: number; // 价格小于
    keywords: string[]; // 礼物昵称
    fansLevel: number; // 粉丝牌升级显示等级>=
}