import { Fragment } from 'react';

import { LinkBar, OutageBar } from '../design';

import { ChildProps } from '../../interfaces';

/**
 * Page Wrapper With LinkBar
 */
export const PageItem: React.FC<ChildProps> = (props): JSX.Element => (
    <Fragment>
        <LinkBar />
        <OutageBar />
        {props.children}
    </Fragment>
);
