import { FC, useEffect, useRef } from "react";
import { useScroll } from "~/hooks/useScroll";
import { getFlexStyle } from "~/utils";
import Default from "./templates/Default/Default";

interface IProps {
    options: IOptions,
    danmakuList: IDanmaku[],
}

const FLAG = "danmaku";

const Danmaku: FC<IProps> = ({options, danmakuList}) => {
	const { isLock, onScroll, onScrollUpdate, goToScrollBottom } = useScroll();
	const wrapRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		onScrollUpdate(wrapRef.current)
	}, [danmakuList, onScrollUpdate]);

	useEffect(() => {
		if (!wrapRef.current) return
		wrapRef.current.addEventListener("mousewheel", () => {
			onScroll(wrapRef.current);
		})
		wrapRef.current.addEventListener("touchmove", () => {
			onScroll(wrapRef.current);
		})
	}, [onScroll]);
	return (
		<div ref={wrapRef} className={FLAG} style={getFlexStyle(options, FLAG)}>
			{danmakuList.map(item => {
				return <Default key={item.key}
				data={item}
				mode={options.mode}
				showAnimation={options.animation}
				></Default>
			})}
			{isLock && <div className="gobottom" onClick={(e) => {e.stopPropagation();goToScrollBottom(wrapRef.current)}}>回到底部</div>}
		</div>
	)
}

export default Danmaku;