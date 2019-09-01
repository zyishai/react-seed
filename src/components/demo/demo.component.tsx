import React from 'react';
import 'reflect-metadata';

import './demo.component.scss';
import { DemoStore } from '../../services/demo/demo.store';
import { inject } from '../../config/di';
import { Demo as DemoInst } from '../../services/demo/demo';

type PropsType = { 
    board: DemoStore,
    inst: DemoInst
};

const Demo = ({ board, inst }: PropsType) => {
    return (
        <span>Demo works! { board.message } { inst.name }</span>
    );
}

const InjectedDemo = inject({
    board: DemoStore,
    inst: DemoInst
})(Demo);

export default InjectedDemo;