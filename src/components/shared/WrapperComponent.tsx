import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

import type { ChildProps, DivRef } from "../../types";

interface WrappedLinkProps {
    icon: ChildProps;
    primary: string;
    to: string;
    children: ChildProps;
};

export function WrappedLink(props: WrappedLinkProps): JSX.Element {
    const CustomLink = useMemo(
        () =>
            forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
                linkProps,
                ref,
            ) {
                return <RouterLink ref={ref} to={props.to} {...linkProps} />;
            }),
        [props.to],
    );
    return <CustomLink>{props.children}</CustomLink>;
};

interface ComponentProps {
    other: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    children: ChildProps;
};

export const WrapperComponent = forwardRef(function Component({ other, children }: ComponentProps, ref: DivRef) {
    return <div {...other} ref={ref}>{children}</div>;
});