import * as React from 'react';
import { Button } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';

export class Error extends React.Component<RouteComponentProps<any>, {}>  {
    render() {
        return (
            <div className="error-container" >
                <p />
                <div>
                    <h2>404</h2>
                    <p>抱歉,你访问的页面不存在</p>
                    <Button type="primary">
                        <Link to="/">返回首页</Link>
                    </Button>
                </div>
            </div>
        );
    }
}
