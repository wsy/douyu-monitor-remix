import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { getBagGiftData, getRoomGiftData } from "~/utils";
import styleVantBase from "react-vant/es/styles/base.css";
import style from "~/styles/index.css";
import { STT } from "~/utils/stt.js";
import { Ex_WebSocket_UnLogin } from "~/utils/websocket.js";
import { useEffect } from "react";

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
let stt = new STT();

const Index = () => {
	// const allGift = useLoaderData<IGiftData>();
	// console.log(allGift)
	const { rid, allGift } = useLoaderData();
	// console.log(Ex_WebSocket_UnLogin);
	useEffect(() => {
		let ws = new Ex_WebSocket_UnLogin(rid, (msg: string) => {
			let data = stt.deserialize(msg);
			console.log(data);
		}, () => {
			console.log("嘻嘻")
		})
	}, [rid]);
    return (
		<>
			<div className="haha"><span className="haha1">dsa</span></div>
			<div className="haha1">我是2</div>
		</>
    )
}

export default Index;