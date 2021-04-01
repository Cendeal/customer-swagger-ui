import {Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import {IPlugin, overWriteOriginPlugin} from "../../utils/plugin.util";
import {TableOutlined} from "@ant-design/icons";
import JsonSvgIcon from "../JsonSvgIcon";
import {RESPONSE_VIEW} from "../../constants/setting";
import {jsonToTableData} from "../../utils/jsonData.util";

const TabPane = Tabs.TabPane
const LiveResponse: React.FC<IPlugin> = (props) => {
    const {originComponent, response, path} = props
    const [responseView, setResponseView] = useState('JSON')
    const body = response.get('body')
    const [columns, setColumns] = useState<any[]>([])
    const [dataSource, setDataSource] = useState<any[]>([])

    useEffect(() => {
            if (responseView === 'TABLE') {
                const headers = response.get("headers").toJS()
                const contentType = headers["content-type"] || headers["Content-Type"]
                if (contentType.includes('json')) {
                    const tempBody = response.get('body').toJSON()
                    const targetData = jsonToTableData(tempBody, path)
                    setColumns(targetData.columns)
                    setDataSource(targetData.data)
                }
            }

        }, [body, path, response, responseView]
    )

    useEffect(() => {
        const view: any = localStorage.getItem(RESPONSE_VIEW)
        if (view && ['JSON', 'TABLE'].includes(view)) {
            setResponseView(view)
        } else {
            setResponseView('JSON')
            localStorage.setItem(RESPONSE_VIEW, 'JSON')
        }
    }, [])
    return <Tabs activeKey={responseView} onChange={(value) => setResponseView(value)}>
        <TabPane
            tab={<span><JsonSvgIcon/>JSON VIEW</span>}
            key="JSON">
            {originComponent}</TabPane>
        <TabPane
            tab={<span><TableOutlined/>TABLE VIEW</span>}
            key="TABLE">
            <Table scroll={{y: 500, x: 286 * columns.length || 800}}
                   style={{borderCollapse: 'collapse'}}
                   bordered dataSource={dataSource} columns={columns}/>
        </TabPane>
    </Tabs>

}

export default overWriteOriginPlugin(LiveResponse, 'liveResponse')
