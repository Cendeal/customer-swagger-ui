import {IPlugin, overWriteOriginPlugin} from "../../../utils/plugin.util";
import React, {useEffect, useState} from "react";
import {Switch} from "antd";
import {RESPONSE_VIEW} from "../../../constants/setting";
import {styles} from "./AuthorizeBtn.jss";


const AuthorizeBtn: React.FC<IPlugin> = ({originComponent}) => {
    const [responseView, setResponseView] = useState('JSON')

    useEffect(() => {
        const view: any = localStorage.getItem(RESPONSE_VIEW)
        if (view && ['JSON', 'TABLE'].includes(view)) {
            setResponseView(view)
        } else {
            setResponseView('JSON')
            localStorage.setItem(RESPONSE_VIEW, 'JSON')
        }
    }, [])
    return <div style={styles.authorization}>
        <div style={styles.responseView as React.CSSProperties}>
            <label><span className='schemes-title'>Default Response View</span></label>
            <Switch checkedChildren="JSON" style={{width: '100%'}}
                    unCheckedChildren="TABLE" checked={responseView === 'JSON'}
                    onChange={async checked => {
                        const temp_view = checked ? 'JSON' : 'TABLE'
                        await setResponseView(temp_view)
                        localStorage.setItem(RESPONSE_VIEW, temp_view)
                        setTimeout(()=>window.location.reload(),200)
                    }}/>
        </div>

        {originComponent}
    </div>
}
export default overWriteOriginPlugin(AuthorizeBtn, 'authorizeBtn')
