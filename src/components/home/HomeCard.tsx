/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Box, Stack, Link, Typography, Divider } from '@mui/material';
import { Wifi as WifiIcon } from '@mui/icons-material';

import { FlexText } from '../controls';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardFooter } from '../styled/PaperCard.styled';

import { StatusType } from '../../types';

// TODO : Move to new HomeCard.styled.tsx file
const RockstarLinkStack = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const RockstarLink = styled(Link)(({ theme }) => ({
    mb: '0.35em',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    '&:hover': {
        color: theme.custom.palette.main,
    },
}));

const RockstarLinkIcon = styled(WifiIcon)(({ theme }) => ({
    color: theme.custom.palette.brightGreen,
}));

const Title = () => (
    <RockstarLinkStack direction='row' spacing={2}>
        <RockstarLinkIcon />
        <RockstarLink href={process.env.REACT_APP_ROCKSTAR_SERVICE_URL} target='_blank' variant='h5'>
            Service Status
        </RockstarLink>
    </RockstarLinkStack>
);

const Updated = ({ updated }: { updated: string }) => (
    <FlexText gutterBottom sx={{ textTransform: 'uppercase', textAlign: 'center', pb: 2 }}>
        Updated&nbsp;{`${updated}`}
    </FlexText>
);

// TODO : Finish implementing this component
export const HomeCard = () => {
    return (
        <Paper elevation={0}>
            <Card>
                <CardHeader
                    title='Service Status'
                    subheader={`${new Date().toLocaleString()}`}
                    status={'UP' as StatusType}
                    onClick={() => { }}
                />
                <CardMedia id={0} />
                <CardContent>
                    <Title />
                    <Updated updated={`${new Date().toLocaleString()}`}  />
                    <Divider variant='middle' sx={{ pt: 1 }} />
                </CardContent>
                <CardFooter />
            </Card>
        </Paper>
    );
};
