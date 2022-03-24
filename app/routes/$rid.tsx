import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { getBagGiftData, getRoomGiftData } from "~/utils";
import styleVantBase from "react-vant/es/styles/base.css";
import style from "~/styles/index.css";
import { useEffect } from "react";
import useWebsocket from "~/hooks/useWebsocket";

export const links: LinksFunction = () => {
	return [
		{rel: "stylesheet", href: styleVantBase},
		{rel: "stylesheet", href: style}
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
			<div className="haha"><span className="haha1">dsa</span></div>
			<div className="haha1">我是2</div>
			{danmakuList.map(item => {
				return (
					<div key={item.key}>{item.txt}</div>
				)
			})}
		</>
    )
}

export default Index;