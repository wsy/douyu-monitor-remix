const LOCAL_NAME = "monitor_options";

export function redirectUrl(url: string): void {
  const HOSTS = [
    "https://www.douyuex.com",
    "http://www.douyuex.com",
    "https://www.douyuex.com/",
    "http://www.douyuex.com/",
    "https://douyuex.com/",
    "http://douyuex.com/",
    "http://new.douyuex.com/",
    "http://new.douyuex.com",
    "https://www.douyuex.com/introduction/",
    "https://www.douyuex.com/introduction",
    "https://www.douyuex.com/install/web.html",
    "https://www.douyuex.com/update/",
    "https://www.douyuex.com/update",
    // "http://localhost:3000",
    // "http://localhost:3000/",
  ];
  if (HOSTS.includes(url)) {
    location.href = "https://xiaochunchun.gitee.io/douyuex/";
  }
}

export function getRoomGiftData(rid: string): Promise<IGiftData> {
  return new Promise((resolve, reject) => {
    fetch("https://gift.douyucdn.cn/api/gift/v2/web/list?rid=" + rid, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        let roomGiftData: IGiftData = {};
        if ("giftList" in ret.data) {
          for (let i = 0; i < ret.data.giftList.length; i++) {
            let item = ret.data.giftList[i];
            roomGiftData[item.id] = {
              n: item.name,
              pic: "https://gfs-op.douyucdn.cn/dygift" + item.basicInfo.focusPic,
              pc: item.priceInfo.price,
            };
          }
        }
        resolve(roomGiftData);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getBagGiftData(): Promise<IGiftData> {
  return new Promise((resolve, reject) => {
    fetch(
      "http://webconf.douyucdn.cn/resource/common/prop_gift_list/prop_gift_config.json",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        return res.text();
      })
      .then((ret) => {
        let json: any = ret.substring(
          String("DYConfigCallback(").length,
          ret.length
        );
        json = json.substring(0, json.lastIndexOf(")"));
        json = JSON.parse(json);
        let obj: IGiftData = {};
        for (const key in json.data) {
          let item = json.data[key];
          obj[key] = {
            n: item.name,
            pic: item.himg,
            pc: item.pc,
          };
        }
        resolve(obj);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getRealRid(rid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(
      "https://wxapp.douyucdn.cn/Live/Room/info/" + rid,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        resolve(ret.data.room_id);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getRandom(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min);
}

export function getStrMiddle(str: string, before: string, after: string): string {
	let m = str.match(new RegExp(before + '(.*?)' + after));
	return m ? m[1] : "";
}

export function getFlexStyle (options: IOptions, flag: "danmaku" | "gift" | "enter") {
	return {
		flex: options.switch[options.switch.length - 1] === flag ? "1" : `0 0 ${options.size[flag]}%`,
		order: options.switch.indexOf(flag) * 2 + 1
	}
}

export function isArrayInText(arr: string[], text: string) {
  if (text !== "") {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "" && text.indexOf(arr[i]) !== -1) {
          return true;
      }
    }
  }
  return false;
}

export function saveLocalOptions(options: IOptions) {
	localStorage.setItem(LOCAL_NAME, JSON.stringify(options));
}

export function getLocalOptions(): any {
	return JSON.parse(localStorage.getItem(LOCAL_NAME) || "{}");
}

export function formatObj(obj: any, objTemplate: any) {
	let ret: any = {};
	// 将obj格式化成objTemplate的属性格式，而obj的值不变，缺少的属性会增加上去
	for (const key in objTemplate) {
		if (key in obj) {
			if (Object.prototype.toString.call(objTemplate[key]) === "[object Object]") {
				let childRet = formatObj(obj[key], objTemplate[key]);
				ret[key] = childRet;
			} else {
				ret[key] = obj[key];
			}
		} else {
			ret[key] = objTemplate[key];
		}
	}
	return ret;
}
