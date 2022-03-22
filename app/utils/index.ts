export function redirectUrl(url: string): void {
  const HOSTS = [
    "https://www.douyuex.com",
    "http://www.douyuex.com",
    "https://www.douyuex.com/",
    "http://www.douyuex.com/",
    "https://douyuex.com/",
    "http://douyuex.com/",
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

export function getRoomGiftData(rid: string): Promise<IGiftList> {
  return new Promise((resolve, reject) => {
    fetch("https://gift.douyucdn.cn/api/gift/v2/web/list?rid=" + rid, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((ret) => {
        let roomGiftData: IGiftList = {};
        if ("giftList" in ret.data) {
          for (let i = 0; i < ret.data.giftList.length; i++) {
            let item = ret.data.giftList[i];
            roomGiftData[item.id] = {
              n: item.name,
              pic: item.basicInfo.focusPic,
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

export function getBagGiftData(): Promise<IGiftList> {
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
        let obj: IGiftList = {};
        for (const key in json.data) {
          let item = json.data[key];
          obj[key] = {
            n: item.name,
            pic: item.himg.replace("https://gfs-op.douyucdn.cn/dygift", ""),
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

export function getRandom(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min);
}