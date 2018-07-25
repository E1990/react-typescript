import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Routes } from './routes';
import commit from './common/Version';

declare global {
    interface Window { commit: string; }
}

window.commit = commit;

ReactDOM.render(React.createElement(Routes), document.getElementById('app') as HTMLElement);