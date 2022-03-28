import { FC } from "react";
import { danmakuColor } from "~/resources/danmakuColor";
import { nobleData } from "~/resources/nobleData";

interface IProps {
    // 弹幕数据
    data: IDanmaku;
    // 日夜间模式
    mode?: "day" | "night";
    // 是否显示动画
    showAnimation?: boolean;
    // 是否显示用户等级
    showLevel?: boolean;
    // 是否显示贵族
    showNoble?: boolean;
    // 是否显示粉丝牌
    showFans?: boolean;
    // 是否显示钻粉
    showDiamond?: boolean; 
    // 是否显示房管图标
    showRoomAdmin?: boolean;
    // 是否显示用户头像
    showAvatar?: boolean;
    // 是否显示VIP图标
    showVip?: boolean;
    // 是否显示弹幕颜色
    showColor?: boolean;
}

const Default: FC<IProps> = (props) => {
    const {data, mode, showAnimation} = props;
    const getItemClass = (data: IDanmaku): string => {
        let ret = "";
        if (mode === "night") {
            if (data.isNoble || data.isVip) {
                ret = "noble-night";
            }
            if (data.isSuper) {
                ret = "super-night";
            }
        } else {
            if (data.isNoble || data.isVip) {
                ret = "noble-day";
            }
            if (data.isSuper) {
                ret = "super-day";
            }
        }
        return ret;
    }
    return (
        <div style={{textAlign: "left", justifyContent: "flex-start"}} className={`item ${showAnimation?"fadeInLeft":""} ${getItemClass(data)}`}>
            {/* 等级 */}
            <span className={`item__level UserLevel ${mode==="night" && Number(data.lv) < 70?"fansLevelNight":""} UserLevel--${data.lv}`}></span>
            {/* 贵族 */}
            <span className="item__noble Barrage-icon Barrage-noble">
                <img src={`${data.nobleLv in nobleData.data ? nobleData.prefix + nobleData.data[data.nobleLv].pic : ""}`} alt="" loading="lazy"/>
            </span>
            {/* 粉丝牌 */}
            <div className={`item__fans ${data.isDiamond ? "is-diamonds" : ""} FansMedal fansLevel-${data.fansLv}`}>
                <span className="FansMedal-name">{data.fansName}</span>
                <img className="FansMedalBox-diamondsIcon" src="https://sta-op.douyucdn.cn/douyu/2021/08/05/02304a1c04587e43ac626ce5ce07d935.png" alt="" loading="lazy"/>
            </div>
            {/* 房管 */}
            <span className="item__roomAdmin">
                <span className="Barrage-icon Barrage-icon--roomAdmin"></span>
            </span>
            {/* 头像 */}
            <span className="item__avatar"><img className="avatar" src={`https://apic.douyucdn.cn/upload/${data.avatar}_small.jpg`} alt="" loading="lazy" /></span>
            {/* 昵称 */}
            <span className={`item__name ${data.isSuper ? "super-name":""}`}>
                <span className="Barrage-roomVipIcon"></span>
                {data.nn}：
            </span>
            {/* 弹幕 */}
            <span style={{color: danmakuColor[data.color]}} className="item__txt">{data.txt}</span>
        </div>
    )
}

export default Default;