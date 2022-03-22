import { LinksFunction, LoaderFunction, useLoaderData } from "remix";
import { getBagGiftData, getRoomGiftData } from "~/utils";
import styleBase from "react-vant/es/styles/base.css";

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
		let roomGift: IGiftList = await getRoomGiftData(rid);
		let bagGift: IGiftList = await getBagGiftData();
		allGift.data = {...roomGift, ...bagGift};
	}
	return allGift
}

const Index = () => {
	const allGift = useLoaderData<IGiftData>();
	console.log(allGift)
    return (
		<>
		</>
    )
}

export default Index;