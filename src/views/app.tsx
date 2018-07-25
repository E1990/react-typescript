import * as React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

export class App extends React.Component<RouteComponentProps<any>, {}> {
    render() {
        return (
            <div>
                <h1>home!</h1>
                <Button type="primary" onClick={() => this.props.history.push('/demo')}>
                    demo
                </Button>
            </div>
        );
    }
}
