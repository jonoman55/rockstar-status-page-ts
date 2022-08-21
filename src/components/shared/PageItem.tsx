import { Fragment } from 'react';

import { LinkBar } from '../design';

import { ChildProps } from '../../interfaces';

/**
 * Page Wrapper With LinkBar
 * @param {ChildProps} props React Node
 * @returns {JSX.Element} Wrapped Component
 */
export const PageItem = (props: ChildProps): JSX.Element => (
    <Fragment>
        <LinkBar />
        {props.children}
    </Fragment>
);
