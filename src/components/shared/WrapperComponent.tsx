import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

import type { ChildProps } from "../../types";

interface WrappedLinkProps {
    icon: ChildProps;
    primary: string;
    to: string;
    children: ChildProps;
};

export function WrappedLink(props: WrappedLinkProps) {
    const CustomLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
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

type Ref = React.LegacyRef<HTMLDivElement> | undefined;

export const WrapperComponent = React.forwardRef(
    function Component({ other, children }: ComponentProps, ref: Ref) {
        return <div {...other} ref={ref}>{children}</div>;
    }
);