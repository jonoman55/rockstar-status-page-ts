import { forwardRef, useMemo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Button } from '@mui/material';
import { CSSObject, Theme } from '@mui/material/styles';

/**
 * Create Button Styles
 * @param {boolean} selected Selected Button
 * @param {Theme} theme MUI Theme
 * @returns {CSSObject} Button Styles
 */
const buttonStyles = (selected: boolean, theme: Theme): CSSObject => {
    return {
        textTransform: 'none',
        color: theme.palette.mode === 'dark'
            ? selected
                ? theme.custom.palette.main
                : 'rgba(255, 255, 255, 0.7)'
            : selected
                ? theme.palette.common.white
                : theme.palette.common.black,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: theme.typography.pxToRem(16),
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
        '&:hover': {
            color: !selected
                ? theme.custom.palette.main
                : theme.palette.action.disabledBackground,
        },
    };
};

/**
 * Button Link Props
 */
interface ButtonLinkProps {
    icon?: React.ReactElement;
    text: string;
    to: string;
    selected: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

/**
 * Button Link Component
 * @param {ButtonLinkProps} props ButtonLinkProps
 * @returns {JSX.Element} Rendered Button Link
 */
export const ButtonLink = (props: ButtonLinkProps): JSX.Element => {
    const { text, to, selected, onClick } = props;

    const renderLink = useMemo(
        () =>
            forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
                itemProps,
                ref,
            ) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} onClick={onClick} />;
            }),
        [to, onClick]
    );

    return (
        <Button component={renderLink} sx={(theme: Theme) => buttonStyles(selected, theme)}>
            {text}
        </Button>
    );
};
