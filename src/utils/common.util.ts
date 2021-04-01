import _ from "lodash";

export const flattenObject = (data: any, rootKey: string, level = 2) => {
    if (data instanceof Object && !_.isArray(data)) {
        if (_.keys(data).length > 1) {
            return _.keys(data).reduce((pre: any, cur) => {
                const temp_key = rootKey ? rootKey + '.' + cur : cur
                if (_.isArray(data[cur])) {
                    pre[temp_key] = data[cur]
                    return pre
                } else if (_.isObject(data[cur])) {
                    const _temp: any = flattenObject(data[cur], temp_key, level - 1)
                    return {...pre, ..._temp}
                }
                return {...pre, [temp_key]: data[cur]}
            }, {})
        }
        return _.values(data)[0]
    }
    return rootKey ? {[rootKey]: data} : data
}

export const filterData = (data: any, filter: string[]) => {
    _.every(filter,(filterKey)=>{
        const target = _.find(data,(item)=>item.dataIndex === filterKey)
        if(target){
            _.remove(data,target)
            return false
        }
        return true
    })
    return data
}

export const skipRootElement = (data:any,paths:string[])=>{
    _.every(paths,path=>{
        const tempData = _.get(data,path,undefined)
        if(tempData!==undefined){
            data = tempData
            return false
        }
        return true
    })
    return data
}
