import { FC } from "react";

const Enter: FC<any> = ({options}) => {
    return (
        <div style={{
            backgroundColor: "green",
            flex: options.switch[options.switch.length - 1] === "enter" ? "1" : "0 0 20%",
			order: options.switch.indexOf("enter") * 2 + 1
        }}></div>
    )
}

export default Enter;