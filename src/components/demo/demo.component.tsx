import React from 'react';
import 'reflect-metadata';

import './demo.component.scss';
import { DemoStore } from '../../services/demo/demo.store';
import { inject } from '../../config/di';

type PropsType = { board: DemoStore };

const Demo = ({ board }: PropsType) => {
    return (
        <span>Demo works! { board && board.message }</span>
    );
}

const InjectedDemo = inject({
    board: DemoStore
})(Demo);

export default InjectedDemo;