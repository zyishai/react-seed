import React from 'react';
import 'reflect-metadata';

import './demo.component.scss';
import { DemoStore } from '../../services/demo/demo.store';

class Demo extends React.Component {
    constructor(props: { board: DemoStore }) {
        super(props);
    }

    render() {
        return (
            <span>Demo works!</span>
        );
    }
}

export default Demo;
