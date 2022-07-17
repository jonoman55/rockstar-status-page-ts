/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Avatar, Box, Typography,
    Card as MuiCard, CardHeader, CardMedia, CardContent, CardActions,
    IconButton, Paper as MuiPaper, Link, Stack, Divider, useTheme
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import { StatusIcon, CardActionBox } from '../shared';
import { RockstarSpinner } from '../design';
import { Paper, Card } from '../styled/PaperCard.styled';
import { Container, Title } from '../styled/Api.styled';
import { useAppSelector } from '../../app/hooks';
import { useGetApiStatusQuery } from '../../services/rockstarApi';
import { StyleStatus, FetchImage } from '../../helpers';

import type { StatusType } from '../../types';

// TODO : Finish styling this page and convert to styled components
export const Api = () => {
    const theme = useTheme();

    const { data: apiStatus, isLoading, refetch } = useGetApiStatusQuery('getApiStatus');

    const { tabValue } = useAppSelector((state) => state.app);

    const color = StyleStatus(theme, 'UP'.toLowerCase() as StatusType);

    const image = FetchImage(0);

    return isLoading ? <RockstarSpinner /> : (
        <Container sx={{ display: 'flex', justifyContent: 'center', width: 'auto', height: '100%', p: 10.45 }}>
            <Card elevation={0} sx={{
                alignContent: 'flex-start', justifyContent: 'center', alignItems: 'center',
                bgcolor: 'primary.light', color: 'primary.contrastText', width: '100%',
                '& .MuiCardHeader-title': { color: 'primary.contrastText', pr: tabValue === 3 ? 1 : null },
                '& .MuiCardHeader-subheader': { color: 'primary.contrastText', pr: tabValue === 3 ? 1 : null }
            }}>
                <CardHeader
                    sx={{ textAlign: 'right', color: 'primary.contrastText' }}
                    avatar={
                        <Avatar aria-label='status-icon' sx={{ bgcolor: 'inherit' }}>
                            <StatusIcon status={`${'UP'.toLowerCase() as StatusType}`} />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label='refresh' onClick={refetch} sx={{ color: 'primary.contrastText' }}>
                            <RefreshIcon fontSize='large' />
                        </IconButton>
                    }
                    title='Rockstar Services Status API'
                    subheader={`${new Date().toLocaleString()}`}
                />
                <CardMedia
                    sx={{ objectFit: 'contain' }}
                    component='img'
                    height='198px'
                    image={image}
                    alt='logo'
                />
                <CardContent component={Link} href={`${process.env.REACT_APP_BACKEND_API_URL}`} target='_blank' sx={{ 
                    display: 'flex', flexDirection: 'column', flexWrap: 'wrap', pt: 4, px: 2, mt: 2, textDecoration: 'none'
                }}>
                    <Paper sx={{
                        p: 2, color: 'primary.contrastText', bgcolor: 'primary.main', textDecoration: 'none', minHeight: '125px',
                        '&:hover': { color: 'primary.contrastText', bgcolor: 'custom.disabled', opacity: 1 }
                    }}>
                        <Title variant='h6'>{apiStatus.message}</Title>
                        <Divider sx={{ pb: 1 }} />
                        <Stack direction='row' sx={{ pt: 2 }}>
                            <Typography sx={{ pr: 1 }}>Status:</Typography>
                            <Typography variant='body1' sx={{ color: color, fontWeight: 'bold' }}>
                                {apiStatus.status}
                            </Typography>
                        </Stack>
                        <Divider sx={{ pt: 2 }} />
                        <Box component='span' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', py: 2 }}>
                            {`Updated: ${apiStatus.updated}`}
                        </Box>
                    </Paper>
                </CardContent>
                <CardActions sx={{ p: 0, display: 'flex' }}>
                    <CardActionBox />
                </CardActions>
            </Card>
        </Container>
    );
};

