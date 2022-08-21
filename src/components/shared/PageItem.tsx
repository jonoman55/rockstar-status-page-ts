import { Fragment } from 'react';

import { LinkBar } from '../design';

import { ChildProps } from '../../interfaces';

/**
 * Page Wrapper with Tabs
 * @param {ChildProps} props React Node
 * @returns {JSX.Element} JSX Element
 */
export const PageItem = (props: ChildProps): JSX.Element => (
    <Fragment>
        <LinkBar />
        {props.children}
    </Fragment>
);