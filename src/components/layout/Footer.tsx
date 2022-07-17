import { useTheme, AppBar, Container, Tooltip, Stack, Divider, Button } from '@mui/material';
import { Copyright } from '@mui/icons-material';

// TODO : Refactor the footer and style it better
// TODO : Create better link buttons
// NOTE : docs -> https://mui.com/material-ui/react-button/ && https://mui.com/material-ui/react-link/
const Footer = () => {
    const theme = useTheme();
    return (
        <AppBar position='static' elevation={2} component='footer' sx={{
            p: 1, bottom: 0, width: '100%', height: 'auto', flexDirection: 'row',
            bgcolor: (theme) => theme.custom.palette.main,
        }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'nowrap',
                    alignItems: 'baseline', justifyContent: 'space-evenly', py: 0.5,
                }}>
                    <Tooltip title='Visit My GitHub Page' placement='top'>
                        <Button href='https://github.com/jonoman55/' target='_blank'
                            startIcon={<Copyright sx={{ mb: 0.5 }} />}
                            sx={{
                                color: 'primary.contrastText',
                                backgroundColor: 'inherit',
                                '&:hover': {
                                    color: 'secondary.contrastText',
                                    backgroundColor: 'transparent',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: 12,
                                },
                                [theme.breakpoints.up('sm')]: {
                                    fontSize: 12,
                                },
                                [theme.breakpoints.up('lg')]: {
                                    fontSize: 16,
                                },
                            }}
                        >
                            John Chiappetta&nbsp;{new Date().getFullYear()}
                        </Button>
                    </Tooltip>
                    <Divider orientation='vertical' flexItem sx={{ py: 1, pl: 1 }} />
                    <Tooltip title='Rockstar Games' placement='top'>
                        <Button href='https://www.rockstargames.com/' target='_blank'
                            startIcon={<Copyright sx={{ ml: 1, mb: 0.5 }} />}
                            sx={{
                                color: 'primary.contrastText',
                                backgroundColor: 'inherit',
                                '&:hover': {
                                    color: 'secondary.contrastText',
                                    backgroundColor: 'transparent',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: 12,
                                },
                                [theme.breakpoints.up('sm')]: {
                                    fontSize: 12,
                                },
                                [theme.breakpoints.up('lg')]: {
                                    fontSize: 16,
                                },
                            }}
                        >
                            Rockstar Games&nbsp;{new Date().getFullYear()}
                        </Button>
                    </Tooltip>
                </Stack>
            </Container>
        </AppBar>
    );
};

export default Footer;
