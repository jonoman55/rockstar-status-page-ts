import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

import type { Children, DivRef } from "../../types";

interface WrappedLinkProps {
    icon: React.ReactNode;
    primary: string;
    to: string;
    children: Children;
};

export const WrappedLink: React.FC<WrappedLinkProps> = (props): JSX.Element => {
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
    children: Children;
};

export const WrapperComponent = forwardRef(function Component({ other, children }: ComponentProps, ref: DivRef) {
    return <div {...other} ref={ref}>{children}</div>;
});