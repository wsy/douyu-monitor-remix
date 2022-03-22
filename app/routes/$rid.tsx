import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { getBagGiftData, getRoomGiftData } from "~/utils";
import styleBase from "react-vant/es/styles/base.css";
import { STT } from "~/utils/stt.js";
import { Ex_WebSocket_UnLogin } from "~/utils/websocket.js";
import { useEffect } from "react";

export const links: LinksFunction = () => {
	return [
		{rel: "stylesheet", href: styleBase}
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
		// console.log("哈哈", roomId)
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
			<div>dsa</div>
		</>
    )
}

export default Index;