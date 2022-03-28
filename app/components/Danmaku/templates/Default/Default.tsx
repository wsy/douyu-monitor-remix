import { FC, ForwardedRef, forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle } from "react";

interface IProps {
    // 弹幕数据
    data: IDanmaku;
    // 日夜间模式
    mode: "day" | "night";
    // 是否显示动画
    showAnimation: boolean;
    // 是否显示用户等级
    showLevel: boolean;
    // 是否显示贵族
    showNoble: boolean;
    // 是否显示粉丝牌
    showFans: boolean;
    // 是否显示钻粉
    showDiamond: boolean; 
    // 是否显示房管图标
    showRoomAdmin: boolean;
    // 是否显示用户头像
    showAvatar: boolean;
    // 是否显示VIP图标
    showVip: boolean;
    // 是否显示弹幕颜色
    showColor: boolean;
}

// eslint-disable-next-line react/display-name
const Default: FC<IProps> = ({data}) => {
    return (
        <div>{data.txt}</div>
    )
}

export default Default;