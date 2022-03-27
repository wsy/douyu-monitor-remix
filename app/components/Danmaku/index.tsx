import { FC, useEffect, useState } from "react";
import useVirtual from "react-cool-virtual";

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
          scrollToItem({ index: danmakuList.length, smooth: true }, () => {
            isScrolling = false;
          });
        }
      }, [danmakuList, shouldSticky, scrollToItem]);
    return (
        <div ref={outerRef} className="danmaku" style={{
			flex: options.switch[options.switch.length - 1] === "danmaku" ? "1" : "0 0 50%",
			order: options.switch.indexOf("danmaku") * 2 + 1
		}}>
            <div ref={innerRef}>
                {items.map(({index, measureRef}) => {
                    return <div ref={measureRef} key={danmakuList[index].key}>{danmakuList[index].txt}</div>
                })}
            </div>
            {!shouldSticky && <div className="gobottom" onClick={(e) => {e.stopPropagation();setShouldSticky(true);}}>回到底部</div>}
        </div>
    )
}

export default Danmaku;