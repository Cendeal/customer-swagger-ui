import React from 'react';
import SwaggerUI from "swagger-ui-react"
import './App.css';
import LiveResponse from "./components/Plugins/LiveResponse";
import "swagger-ui-react/swagger-ui.css"
import 'antd/dist/antd.css';
import BaseLayout from "./components/Plugins/BaseLayout";
import AuthorizeBtn from "./components/Plugins/AuthorizeBtn/AuthorizeBtn";
import _ from 'lodash'
import Operations from "./components/Plugins/Operations/Operations";
const swaggerUrl = _.get(window, 'SWAGGER_CONFIG.route.docs', 'https://petstore.swagger.io/v2/swagger.json');

function App() {
    return (<SwaggerUI url={swaggerUrl}
                       plugins={[LiveResponse, BaseLayout, AuthorizeBtn, Operations]}/>);
}

export default App;
