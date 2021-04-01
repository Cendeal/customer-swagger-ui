import _ from 'lodash'
import {v4 as uuid} from 'uuid'
import ReactJson from "react-json-view";
import {filterData, flattenObject, skipRootElement} from "./common.util";

const common = _.get(window, 'SWAGGER_CONFIG.filter.common', [])
const rootElementsCommon = _.get(window, 'SWAGGER_CONFIG.filter.rootElements.common', ['data.result', 'data'])
export const jsonToTableData = (data: any, path: string) => {
    let columns: any[] = []
    let dataSource: any = []

    const rootElementsScope = _.get(window, 'SWAGGER_CONFIG.filter.rootElements.' + path, [])

    if (!_.isEmpty(rootElementsScope)) {
        data = skipRootElement(data, rootElementsScope)
    } else if (!_.isEmpty(rootElementsCommon)) {
        data = skipRootElement(data, rootElementsCommon)
    }

    if (_.isObject(data) && _.keys(data).length === 1 && _.every(_.values(data), value => !_.isObject(value))) {
        columns = generateColumn(_.keys(data))
        dataSource = generateDataSource([data])
    } else {
        data = flattenObject(data, '', _.get(window, 'SWAGGER_CONFIG.layer', 3))
        if (data instanceof Array) {
            const keys = _.uniq(_.concat([], ..._.map(data, (item) => _.keys(item))))
            columns = generateColumn(keys)
        } else if (data instanceof Object) {
            columns = generateColumn(_.keys(data))
        }
        if (columns.length > 0 && !_.isEmpty(data)) {
            dataSource = generateDataSource(_.isArray(data) ? data : [data])
        }
    }

    //filter data
    if (columns.length > 0) {
        if (!_.isEmpty(common)) {
            columns = filterData(columns, common)
        }

        const scopeFilter = _.get(window, 'SWAGGER_CONFIG.filter.routes.' + path)
        if (!_.isEmpty(scopeFilter)) {
            columns = filterData(columns, _.mergeWith(scopeFilter, common))
        }

    }

    return {
        columns,
        data: dataSource
    }
}

export const generateDataSource = (object: any[]) => {
    return object.map((value: any) => {
        return {
            ...value,
            key: uuid()
        }
    })
}

export const generateColumn = (keys: any[]) => {
    return _.map(keys, (key: any) => ({
        title: key,
        dataIndex: key,
        key: uuid(),
        render: (text: any) => {
            if (typeof text === 'object') {
                return <ReactJson name={false} displayDataTypes={false} src={text}/>
            }
            return text
        }
    }))
}
