/// <reference path="../include/tsd.d.ts" />

import * as React from 'react';
import Index from './View/Index';

export default class Application extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <Index />
        );
    }
}
