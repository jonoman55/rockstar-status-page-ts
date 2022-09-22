import { Divider } from '@mui/material';

import { AppBar, Container, FooterLink, Stack } from '../styled/Footer.styled';
import { REACT_APP_GITHUB_URL, REACT_APP_ROCKSTAR_URL } from '../../constants';

const Footer: React.FC<{}> = (): JSX.Element => (
    <AppBar position='static' elevation={2}>
        <Container>
            <Stack>
                <FooterLink
                    text='John Chiappetta'
                    tooltip='Visit My GitHub'
                    onClick={() => window.open(`${REACT_APP_GITHUB_URL}`, "_blank")}
                    sx={{ mb: 0.5 }}
                />
                <Divider orientation='vertical' flexItem sx={{ py: 1, pl: 1 }} />
                <FooterLink
                    text='Rockstar Games'
                    tooltip='Rockstar Games'
                    onClick={() => window.open(`${REACT_APP_ROCKSTAR_URL}`, "_blank")}
                    sx={{ ml: 1, mb: 0.5 }}
                />
            </Stack>
        </Container>
    </AppBar>
);

export default Footer;
