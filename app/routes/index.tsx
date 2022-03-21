import { Button } from "react-vant";
import { LinksFunction } from "remix";
import styleButton from "react-vant/es/button/style/index.css"

export const links: LinksFunction = () => {
  return [
    {rel: "stylesheet", href: styleButton}
  ]
}

export default function Index() {
  return (
    <>
      <Button>我是一个按钮</Button>
    </>
  );
}
