import { LinksFunction, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getBagGiftData, getRoomGiftData } from "~/utils";
import '@vant/touch-emulator';
// import styleVantBase from "react-vant/es/styles/base.css";
import stylesVant from 'react-vant/lib/index.css';
import stylesGlobal from "~/styles/index.css";
import stylesFansLevel from "~/resources/fansLevel.css";
import stylesRoomAdmin from "~/resources/roomAdmin.css";
import stylesUserLevel from "~/resources/userLevel.css";
import stylesMonitor from "~/styles/monitor.css";

import { useEffect, useState } from "react";
import useWebsocket from "~/hooks/useWebsocket";
import Danmaku from "~/components/Danmaku/index";

import { Checkbox, Field, Popup, Radio, Slider, Tabs } from 'react-vant';
import { useImmerReducer } from "use-immer";
import { defaultOptions, optionsReducer, OPTIONS_ACTION } from "~/hooks/options.reducer";
import Enter from "~/components/Enter";
import Gift from "~/components/Gift";


export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "DouyuEX弹幕助手",
	viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
	return [
		{rel: "stylesheet", href: stylesVant},
		{rel: "stylesheet", href: stylesGlobal},
		{rel: "stylesheet", href: stylesMonitor},
		{rel: "preload", href: stylesFansLevel},
		{rel: "preload", href: stylesRoomAdmin},
		{rel: "preload", href: stylesUserLevel},
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

	const [isShowOptions, setIsShowOptions] = useState(false);
	const [options, dispatchOptions] = useImmerReducer(optionsReducer, defaultOptions);

	useEffect(() => {
		window.rid = rid;
		connectWs(rid);
		return () => {
			closeWs();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (options.mode === "night") {
			window.document.documentElement.setAttribute("data-theme", 'night');
		} else {
			window.document.documentElement.setAttribute("data-theme", 'day');
		}
	}, [options.mode]);
	
    return (
		<>
			<div className="monitor" style={{flexDirection: options.direction, fontSize: options.fontSize}} onClick={() => setIsShowOptions(true)}>
				{options.switch.includes("enter") && <Enter options={options}></Enter>}
				{options.switch.length > 1 && <div className="splitline" style={{order: 2, width: options.direction === "row" ? "3px":"100%", height: options.direction === "row" ? "100%":"3px"}}></div>}
				{options.switch.includes("gift") && <Gift options={options}></Gift>}
				{options.switch.length > 2 && <div className="splitline" style={{order: 4, width: options.direction === "row" ? "3px":"100%", height: options.direction === "row" ? "100%":"3px"}}></div>}
				{options.switch.includes("danmaku") && <Danmaku options={options} danmakuList={danmakuList}></Danmaku>}
			</div>
			<Popup className="popup" visible={isShowOptions} position="bottom" style={{height: "50%"}} onClose={() => setIsShowOptions(false)}>
				<div className="popup-top">
					{/* <div class="douyuex">
						<a href="https://xiaochunchun.gitee.io/douyuex/" target="_blank">
							<svg t="1637284063150" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2978" width="24" height="24"><path d="M1006.1 412.7l-187.5-141c0-0.2 0.1-0.3 0.1-0.4V121.4c0-2.3-1.9-4.2-4.2-4.2h-92.4c-2.3 0-4.2 1.9-4.2 4.2V196L535.3 58.8c-7.3-5.5-16-8.4-25.1-8.4-9.2 0-17.9 2.9-25.2 8.5L16.7 412.5C7.8 419.2 2.1 429 0.5 440.1c-2.1 14.8 3.8 29.5 16.2 39.3 4.3 3.3 9.2 5.7 14.5 7 13 3.2 25.8 0.6 36-7.1L505 148.6c3.1-2.3 7.4-2.3 10.4 0l441.8 332c7.3 5.5 16 8.4 25.1 8.4 13.7 0 26.3-6.5 34.2-17.7 13.3-18.8 7.9-44.9-10.4-58.6z" p-id="2979" fill="#8a8a8a"></path><path d="M906.7 499.4l-193.2-140-196.7-142.5c-3.4-2.5-8.1-2.5-11.5 0L308.7 359.4l-193.2 140c-5.6 4.1-9 10.6-9 17.6v392.1c0 35.5 29 64.5 64.5 64.5h246.7V716.2c0-30 24.6-54.6 54.6-54.6h77.5c30 0 54.6 24.6 54.6 54.6v257.4h246.7c35.5 0 64.5-29 64.5-64.5V517c0.1-6.9-3.3-13.5-8.9-17.6z" p-id="2980" fill="#8a8a8a"></path></svg>
						</a>
					</div>
					<div class="github">
						<a href="https://github.com/qianjiachun/douyu-monitor" target="_blank"><svg t="1636974784707" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7184" width="24" height="24"><path d="M511.957333 21.333333C241.024 21.333333 21.333333 240.981333 21.333333 512c0 216.832 140.544 400.725333 335.573334 465.664 24.490667 4.394667 32.256-10.069333 32.256-23.082667 0-11.690667 0.256-44.245333 0-85.205333-136.448 29.610667-164.736-64.64-164.736-64.64-22.314667-56.704-54.4-71.765333-54.4-71.765333-44.586667-30.464 3.285333-29.824 3.285333-29.824 49.194667 3.413333 75.178667 50.517333 75.178667 50.517333 43.776 75.008 114.816 53.333333 142.762666 40.789333 4.522667-31.658667 17.152-53.376 31.189334-65.536-108.970667-12.458667-223.488-54.485333-223.488-242.602666 0-53.546667 19.114667-97.322667 50.517333-131.669334-5.034667-12.330667-21.930667-62.293333 4.778667-129.834666 0 0 41.258667-13.184 134.912 50.346666a469.802667 469.802667 0 0 1 122.88-16.554666c41.642667 0.213333 83.626667 5.632 122.88 16.554666 93.653333-63.488 134.784-50.346667 134.784-50.346666 26.752 67.541333 9.898667 117.504 4.864 129.834666 31.402667 34.346667 50.474667 78.122667 50.474666 131.669334 0 188.586667-114.730667 230.016-224.042666 242.090666 17.578667 15.232 33.578667 44.672 33.578666 90.453334v135.850666c0 13.141333 7.936 27.605333 32.853334 22.869334C862.250667 912.597333 1002.666667 728.746667 1002.666667 512 1002.666667 240.981333 783.018667 21.333333 511.957333 21.333333z" p-id="7185" fill="#8a8a8a"></path></svg></a>
					</div>
					<div @click="onClickChangeMode">
						<svg v-if="options.mode === 'night'" t="1636947364663" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17884" width="24" height="24"><path d="M487.204571 67.474286A444.525714 444.525714 0 1 1 92.16 715.373714a357.778286 357.778286 0 1 0 296.96-636.708571c32.182857-7.350857 65.097143-11.081143 98.084571-11.190857z" p-id="17885" fill="#8a8a8a"></path></svg>
						<svg v-else t="1636947463842" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20823" width="24" height="24"><path d="M438.857 73.143c0-40.396 32.466-73.143 73.143-73.143 40.396 0 73.143 32.466 73.143 73.143v73.143h-146.286v-73.143zM438.857 877.714h146.286v73.143c0 40.396-32.466 73.143-73.143 73.143-40.396 0-73.143-32.466-73.143-73.143v-73.143zM73.143 585.143c-40.396 0-73.143-32.466-73.143-73.143 0-40.396 32.466-73.143 73.143-73.143h73.143v146.286h-73.143zM877.714 585.143v-146.286h73.143c40.396 0 73.143 32.466 73.143 73.143 0 40.396-32.466 73.143-73.143 73.143h-73.143zM149.961 253.401c-28.564-28.564-28.763-74.676 0-103.44 28.564-28.564 74.676-28.763 103.44 0l51.719 51.719-103.44 103.44-51.722-51.719zM718.879 822.319l103.44-103.44 51.719 51.722c28.564 28.564 28.763 74.676 0 103.44-28.564 28.564-74.676 28.763-103.44 0l-51.719-51.719zM253.401 874.039c-28.564 28.564-74.676 28.763-103.44 0-28.564-28.564-28.763-74.676 0-103.44l51.719-51.719 103.44 103.44-51.719 51.722zM822.319 305.121l-103.44-103.44 51.722-51.719c28.564-28.564 74.676-28.763 103.44 0 28.564 28.564 28.763 74.676 0 103.44l-51.719 51.719zM512 804.571c161.583 0 292.571-130.989 292.571-292.571 0-161.583-130.989-292.571-292.571-292.571-161.583 0-292.571 130.989-292.571 292.571 0 161.583 130.989 292.571 292.571 292.571z" p-id="20824" fill="#8a8a8a"></path></svg>
					</div>
					<div @click="onClickShare">
						<svg t="1637380837755" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2733" width="24" height="24"><path d="M380.36396 566.298587l300.553318 205.558677a149.295574 149.295574 0 1 1-38.731537 76.865893L338.262608 640.818406a149.295574 149.295574 0 1 1-13.180667-226.374746l318.938002-230.299087a149.295574 149.295574 0 1 1 43.082437 74.093261L375.501189 483.418215a149.039639 149.039639 0 0 1 4.905426 82.923028zM789.263209 213.406506a63.983817 63.983817 0 1 0 0-127.967635 63.983817 63.983817 0 0 0 0 127.967635z m0 725.149931a63.983817 63.983817 0 1 0 0-127.967635 63.983817 63.983817 0 0 0 0 127.967635z m-554.526418-341.247027a63.983817 63.983817 0 1 0 0-127.967634 63.983817 63.983817 0 0 0 0 127.967634z" fill="#8A8A8A" p-id="2734"></path></svg>
					</div>
					<div @click="onClickRestOptions">
						<svg t="1636947206527" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14990" width="24" height="24"><path d="M890.092308 988.002462a37.257846 37.257846 0 0 1-25.67877-27.72677c-53.326769-236.937846-209.526154-305.467077-408.576-368.64l-55.847384 182.744616a37.415385 37.415385 0 0 1-67.741539 8.428307L65.851077 353.516308a37.257846 37.257846 0 0 1 15.281231-53.090462L549.021538 70.656a37.257846 37.257846 0 0 1 40.96 5.198769 37.651692 37.651692 0 0 1 11.500308 39.384616l-47.261538 154.702769c92.317538 34.264615 169.905231 87.985231 230.636307 159.901538 54.429538 64.275692 95.310769 142.966154 121.619693 233.787077 42.771692 147.692308 33.004308 277.897846 31.744 292.312616v0.157538a37.336615 37.336615 0 0 1-34.816 33.634462 40.329846 40.329846 0 0 1-13.39077-1.732923zM352.492308 673.476923l42.692923-139.657846a37.494154 37.494154 0 0 1 46.710154-24.733539c129.969231 39.778462 233.314462 78.769231 314.998153 140.288 35.052308 26.151385 65.851077 56.871385 91.766154 91.608616a733.026462 733.026462 0 0 0-14.493538-58.683077c-53.563077-182.114462-166.990769-300.819692-337.289846-352.886154a38.281846 38.281846 0 0 1-22.291693-18.432 36.312615 36.312615 0 0 1-2.599384-28.356923l32.610461-106.653538-353.28 173.292307L352.492308 673.476923z" fill="#8a8a8a" p-id="14991"></path></svg>
					</div>
					<div @click="onClickSaveData">
						<svg t="1641663017225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3820" width="24" height="24"><path d="M941.248 352L672 82.752A64 64 0 0 0 626.752 64H128a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V397.248A64 64 0 0 0 941.248 352zM256 128h48v160H256V128z m112 0H512v160h-144V128zM256 896v-192h512v192H256z m640 0h-64v-224a32 32 0 0 0-32-32H224a32 32 0 0 0-32 32v224H128V128h64v192a32 32 0 0 0 32 32h320a32 32 0 0 0 32-32V128h50.752L896 397.248V896z" p-id="3821" fill="#8a8a8a"></path></svg>
					</div> */}
				</div>
				<Tabs>
					<Tabs.TabPane title="通用">
						<Field label="布局">
							<Checkbox.Group value={options.switch} direction="horizontal" onChange={(v) => dispatchOptions({type: OPTIONS_ACTION.SWITCH, payload: v})}>
								<Checkbox shape="square" name="enter">进场</Checkbox>
								<Checkbox shape="square" name="gift">礼物</Checkbox>
								<Checkbox shape="square" name="danmaku">弹幕</Checkbox>
							</Checkbox.Group>
						</Field>
						<Field label="方向">
							<Radio.Group value={options.direction} defaultValue="column" direction="horizontal" onChange={(v) => dispatchOptions({type: OPTIONS_ACTION.DIRECTION, payload: v})}>
								<Radio name="column">纵向</Radio>
								<Radio name="row">横向</Radio>
							</Radio.Group>
						</Field>
						<Field label="滑块">
							<Slider value={options.fontSize} min={12} max={30} onChange={(v: number) => {dispatchOptions({type: OPTIONS_ACTION.FONTSIZE, payload: v})}}/>
						</Field>
					</Tabs.TabPane>
					<Tabs.TabPane title="弹幕">
						<Field label="占比">
							<Slider disabled={options.switch[options.switch.length-1] === "danmaku"} value={options.size.danmaku} onChange={(v: number) => {dispatchOptions({type: OPTIONS_ACTION.SIZE, payload: {danmaku: v}})}}/>
						</Field>
					</Tabs.TabPane>
					<Tabs.TabPane title="礼物">
						<Field label="占比">
							<Slider disabled={options.switch[options.switch.length-1] === "gift"} value={options.size.gift} onChange={(v: number) => {dispatchOptions({type: OPTIONS_ACTION.SIZE, payload: {gift: v}})}}/>
						</Field>
					</Tabs.TabPane>
					<Tabs.TabPane title="进场">
						<Field label="占比">
							<Slider disabled={options.switch[options.switch.length-1] === "enter"} value={options.size.enter} onChange={(v: number) => {dispatchOptions({type: OPTIONS_ACTION.SIZE, payload: {enter: v}})}}/>
						</Field>
					</Tabs.TabPane>
				</Tabs>
			</Popup>
		</>
    )
}

export default Index;