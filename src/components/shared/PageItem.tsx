import { TabNav } from '../design';

import { ChildProps } from '../../types';
import { Fragment } from 'react';

interface Props {
    children: ChildProps;
};

export const PageItem = (props: Props) => (
    <Fragment>
        <TabNav />
        {props.children}
    </Fragment>
);