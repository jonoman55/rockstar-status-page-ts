import React, { Fragment } from 'react';

import { TabNav } from '../design';

import { ChildProps } from '../../types';

interface Props {
    children: ChildProps;
};

export const PageItem: React.FC<Props> = (props) => (
    <Fragment>
        <TabNav />
        {props.children}
    </Fragment>
);