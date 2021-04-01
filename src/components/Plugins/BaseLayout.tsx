import {IPlugin, overWriteOriginPlugin} from "../../utils/plugin.util";
import React from "react";
import {BackTop, Button} from "antd";
import {VerticalAlignTopOutlined} from "@ant-design/icons";

const BaseLayout: React.FC<IPlugin> = (props) => {
    const {originComponent} = props
    return <div>
        {originComponent}
        <BackTop>
            <Button size="large" type='primary' shape="circle" icon={<VerticalAlignTopOutlined/>}/>
        </BackTop>
    </div>
}

export default overWriteOriginPlugin(BaseLayout,'BaseLayout')
