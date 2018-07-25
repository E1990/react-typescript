import * as React from "react";
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
import './hello.less';

export interface HelloProps extends RouteComponentProps<any> {
    compiler: string;
    framework?: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <Button onClick={() => this.props.history.push('/')}>
                    返回首页
                </Button>
            </div>
        );
    }
}
