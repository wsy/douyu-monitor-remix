import { FC, useEffect, useState } from "react";
import useVirtual from "react-cool-virtual";
import Default from "./templates/Default/Default";

interface IProps {
    options: IOptions,
    danmakuList: IDanmaku[],
}

let isScrolling = false;

const Danmaku: FC<IProps> = ({options, danmakuList}) => {
    const [shouldSticky, setShouldSticky] = useState(true);
    const { outerRef, innerRef, items, scrollToItem } = useVirtual<HTMLDivElement>({
        itemCount: danmakuList.length,
        onScroll: ({ userScroll }) => {
          if (userScroll && !isScrolling) setShouldSticky(false);
        }
    });
    useEffect(() => {
        if (shouldSticky) {
          isScrolling = true;
          scrollToItem({ index: danmakuList.length - 1}, () => {
            isScrolling = false;
          });
        }
      }, [danmakuList, shouldSticky, scrollToItem]);
    return (
        <div ref={outerRef} className="danmaku" style={{
			flex: options.switch[options.switch.length - 1] === "danmaku" ? "1" : `0 0 ${options.size.danmaku}%`,
			order: options.switch.indexOf("danmaku") * 2 + 1
		}}>
            <div ref={innerRef}>
                {items.map(({index, measureRef}) => {
					let item = danmakuList[index];
                    return (
						<div key={item.key} ref={measureRef}>
							{item.txt}
						</div>
					)
                })}
            </div>
            {!shouldSticky && <div className="gobottom" onClick={(e) => {e.stopPropagation();setShouldSticky(true);}}>回到底部</div>}
        </div>
    )
}

export default Danmaku;