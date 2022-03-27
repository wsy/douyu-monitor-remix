import { FC } from "react";

const Gift: FC<any> = ({options}) => {
    return (
        <div style={{
            backgroundColor: "gray",
            flex: options.switch[options.switch.length - 1] === "gift" ? "1" : "0 0 30%",
			order: options.switch.indexOf("gift") * 2 + 1
        }}></div>
    )
}

export default Gift;