import React from "react";

export interface IPlugin {
    originComponent: React.FC,
    system: any,

    [propName: string]: any
}

export const overWriteOriginPlugin = (Component: React.FC<IPlugin>, originComponentName = '', isExistContainer = true) => {
    originComponentName = originComponentName || Component.name
    return (system: any) => {
        const {getComponents} = system
        const OriginComponent = getComponents(originComponentName, isExistContainer) || ''
        return {
            components: {
                [originComponentName]: (props: any) => <Component {...props}
                                                                  originComponent={<OriginComponent {...props}/>}
                                                                  system={system}/>
            }
        }
    }
}
