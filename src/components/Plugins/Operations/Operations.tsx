import {IPlugin, overWriteOriginPlugin} from "../../../utils/plugin.util";
import React from "react";
import {Affix, Menu} from "antd";
import _ from 'lodash'
import './Operations.css'

const {Item} = Menu;
const Operations: React.FC<IPlugin> = (props) => {
    const {originComponent} = props
    const tags = props?.spec()?.toJSON()?.json?.tags
    return <div>
        <Affix offsetTop={15}
               className="custom-swagger-menu"
               style={{
                   position: 'absolute',
                   left: 50,
               }}>
            <Menu
                style={{
                    width: 150,
                    boxShadow: "0 1px 2px rgba(0 0 0 / 19%)"
                }}
                onSelect={e => {
                    document.querySelector(`#operations-tag-${e.key}`)?.scrollIntoView()
                }}
                mode="inline">
                {_.map(tags, (tag) => <Item key={tag.name}>{_.upperFirst(tag.name)}</Item>)}
            </Menu>
        </Affix>
        {originComponent}
    </div>
}

export default overWriteOriginPlugin(Operations, 'operations')
