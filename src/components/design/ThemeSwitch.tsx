import { styled, Switch } from '@mui/material';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                borderRadius: '2rem',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path cx="512" cy="512" r="512" style="fill:${encodeURIComponent(
                    theme.palette.mode === 'light' ? '#000' : '#fff'
                )}" d="M40 20A20 20 0 0 1 20 40A20 20 0 0 1 0 20A20 20 0 0 1 40 20z"/><path d="m26.465 23.328 -0.677 -4.252 -2.488 4.218h-0.473c-0.283 -0.488 -0.393 -1.197 -0.393 -1.638 0 -0.725 0.047 -1.433 0.047 -2.362 0 -1.228 -0.362 -1.875 -1.323 -2.11v-0.032c2.032 -0.283 2.96 -1.638 2.96 -3.528 0 -2.693 -1.797 -3.275 -4.14 -3.275H13.662l-2.677 12.663h3.355l0.977 -4.613h2.237c1.197 0 1.685 0.583 1.685 1.7 0 0.85 -0.095 1.528 -0.095 2.173 0 0.235 0.047 0.803 0.22 1.023l2.425 2.567L19.693 30.352l4.473 -2.662 3.338 2.567 -0.615 -4.237 3.843 -2.693zM18.56 16.037H15.883l0.645 -3.055h2.488c0.882 0 1.812 0.235 1.812 1.307 0 1.37 -1.055 1.748 -2.268 1.748z" style="fill:${encodeURIComponent(
                    theme.palette.mode === 'light' ? '#fff' : '#000'
                )}"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#fcaf17',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: '2rem',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path cx="512" cy="512" r="512" style="fill:${encodeURIComponent(
                theme.palette.mode === 'light' ? '#000' : '#fff'
            )}" d="M40 20A20 20 0 0 1 20 40A20 20 0 0 1 0 20A20 20 0 0 1 40 20z"/><path d="m26.465 23.328 -0.677 -4.252 -2.488 4.218h-0.473c-0.283 -0.488 -0.393 -1.197 -0.393 -1.638 0 -0.725 0.047 -1.433 0.047 -2.362 0 -1.228 -0.362 -1.875 -1.323 -2.11v-0.032c2.032 -0.283 2.96 -1.638 2.96 -3.528 0 -2.693 -1.797 -3.275 -4.14 -3.275H13.662l-2.677 12.663h3.355l0.977 -4.613h2.237c1.197 0 1.685 0.583 1.685 1.7 0 0.85 -0.095 1.528 -0.095 2.173 0 0.235 0.047 0.803 0.22 1.023l2.425 2.567L19.693 30.352l4.473 -2.662 3.338 2.567 -0.615 -4.237 3.843 -2.693zM18.56 16.037H15.883l0.645 -3.055h2.488c0.882 0 1.812 0.235 1.812 1.307 0 1.37 -1.055 1.748 -2.268 1.748z" style="fill:${encodeURIComponent(
                theme.palette.mode === 'light' ? '#fff' : '#000'
            )}"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

interface Props {
    checked: boolean;
    onChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
};

export const ThemeSwitch: React.FC<Props> = ({ checked, onChange }): JSX.Element => (
    <MaterialUISwitch
        checked={checked}
        onChange={onChange}
        sx={{ m: 1 }}
    />
);
