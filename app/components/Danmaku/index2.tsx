import { FC, useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { getFlexStyle } from "~/utils";
import Default from "./templates/Default/Default";

interface IProps {
    options: IOptions,
    danmakuList: IDanmaku[],
}

const FLAG = "danmaku";

const renderDanmakuItem = (index: number, data: IDanmaku) => {
	return <Default 
			data={data}
			/>
}

const Danmaku: FC<IProps> = ({options, danmakuList}) => {
	const virtuosoRef = useRef<any>(null);
	const [showButton, setShowButton] = useState(false);
	useEffect(() => {
		virtuosoRef.current.scrollToIndex({ index: danmakuList.length-1,behavior: "smooth" })
	}, [danmakuList.length]);
	return (
		<div className={FLAG} style={getFlexStyle(options, FLAG)}>
			<Virtuoso
				startReached={(index) => {console.log(index)}}
				ref={virtuosoRef}
				data={danmakuList}
				itemContent={renderDanmakuItem}
				followOutput={"auto"}
			></Virtuoso>
			{showButton && <div className="gobottom" onClick={(e) => {e.stopPropagation();;virtuosoRef.current.scrollToIndex({ index: danmakuList.length - 1 })}}>回到底部</div>}
		</div>
	)
}

export default Danmaku;