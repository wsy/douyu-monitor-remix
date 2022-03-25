import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { getBagGiftData, getRoomGiftData } from "~/utils";
import styleVantBase from "react-vant/es/styles/base.css";
import styleGlobal from "~/styles/index.css";
import styleFansLevel from "~/resources/fansLevel.css";
import styleRoomAdmin from "~/resources/roomAdmin.css";
import styleUserLevel from "~/resources/userLevel.css";
import styleMonitor from "~/styles/monitor.css";

import { useEffect } from "react";
import useWebsocket from "~/hooks/useWebsocket";
import Danmaku from "~/components/Danmaku";

export const links: LinksFunction = () => {
	return [
		{rel: "stylesheet", href: styleVantBase},
		{rel: "stylesheet", href: styleGlobal},
		{rel: "stylesheet", href: styleMonitor},
		{rel: "preload", href: styleFansLevel},
		{rel: "preload", href: styleRoomAdmin},
		{rel: "preload", href: styleUserLevel},
	]
}

export const loader: LoaderFunction = async ({params}) => {
	
	const { rid } = params;
	let allGift: IGiftData = {
		"prefix": "https://gfs-op.douyucdn.cn/dygift",
		data: {}
	};
	if (rid) {
		// let roomId = await getRealRid(rid);
		let ret: any = await Promise.allSettled([getRoomGiftData(rid), getBagGiftData()]);
		allGift.data = {...ret[0].value, ...ret[1].value};
	}
	return {
		rid,
		allGift
	}
}

const Index = () => {
	const { rid, allGift } = useLoaderData();
	const { connectWs, closeWs, danmakuList } = useWebsocket({}, allGift);

	useEffect(() => {
		window.rid = rid;
		connectWs(rid);
		return () => {
			closeWs();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    return (
		<>
			<div className="monitor" style={{flexDirection: "column", fontSize: 14}}>
				<Danmaku></Danmaku>
			</div>
		</>
    )
}

export default Index;