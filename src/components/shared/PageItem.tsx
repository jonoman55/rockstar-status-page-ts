import { Fragment } from 'react';

import { TabNav } from '../design';

import { ChildProps } from '../../interfaces';

/**
 * Page Wrapper with Tabs
 * @param {ChildProps} props React Node
 * @returns {JSX.Element} JSX Element
 */
export const PageItem = (props: ChildProps): JSX.Element => (
    <Fragment>
        <TabNav />
        {props.children}
    </Fragment>
);