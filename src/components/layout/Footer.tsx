import { Divider } from '@mui/material';

import { AppBar, Container, FooterLink, Stack } from '../styled/Footer.styled';

const Footer: React.FC = () => (
    <AppBar position='static' elevation={2}>
        <Container>
            <Stack>
                <FooterLink
                    text='John Chiappetta'
                    tooltip='Visit My GitHub'
                    onClick={() => window.open("https://github.com/jonoman55/", "_blank")}
                    sx={{ mb: 0.5 }}
                />
                <Divider orientation='vertical' flexItem sx={{ py: 1, pl: 1 }} />
                <FooterLink
                    text='Rockstar Games'
                    tooltip='Rockstar Games'
                    onClick={() => window.open("https://www.rockstargames.com/", "_blank")}
                    sx={{ ml: 1, mb: 0.5 }}
                />
            </Stack>
        </Container>
    </AppBar>
);

export default Footer;
