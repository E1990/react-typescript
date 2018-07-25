import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { App } from './views/app';
import { Hello } from './views/hello';
import { Error } from './views/error';

const DemoPage = (props: any) => {
    return <Hello compiler="TypeScript" framework="react" {...props} />
};

export class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/demo" component={DemoPage} />
                    <Route component={Error} />
                </Switch>
            </BrowserRouter>
        );
    }
}