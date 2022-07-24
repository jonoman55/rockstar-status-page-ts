import { Fragment, memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme, Box, Stack, Typography, Divider, Grid } from '@mui/material';
import { sortBy } from 'lodash';

import { PlatformIcon, StatusIcon } from '../shared';
import { FlexText } from '../controls';
import { CardMedia } from '../styled/PaperCard.styled';
import {
    CardImageBox,
    CardName,
    IndicatorPaper,
    IndicatorsContainer,
    IndicatorsGrid,
    IndicatorsGridPaper,
    IndicatorStatus,
    IndicatorTitle,
    PlatformItem,
    PlatformWrapper,
    RockstarLink,
    RockstarLinkIcon,
    RockstarLinkStack,
    StatusCard
} from '../styled/HomeCard.styled';
import { RockstarStatus } from '../../constants';
import { styleStatus } from '../../helpers';

import type { Status, Platform, StatusType } from '../../types';

const IndicatorItem = ({ status }: { status: StatusType }) => (
    <IndicatorPaper>
        <StatusIcon status={status} />
        <IndicatorStatus>{status.toUpperCase()}</IndicatorStatus>
    </IndicatorPaper>
);

const StatusIndicatorsGrid = () => (
    <IndicatorsGridPaper>
        <IndicatorTitle variant='h6'>Status Indicators</IndicatorTitle>
        <Divider sx={{ pb: 1 }} />
        <IndicatorsGrid container spacing={1}>
            {Object.values(RockstarStatus).map((indicator, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <IndicatorItem status={indicator} />
                </Grid>
            ))}
        </IndicatorsGrid>
    </IndicatorsGridPaper>
);

export const StatusIndicators = () => (
    <IndicatorsContainer>
        <StatusIndicatorsGrid />
    </IndicatorsContainer>
);

export const Title = () => (
    <RockstarLinkStack direction='row' spacing={2}>
        <RockstarLinkIcon />
        <RockstarLink href={process.env.REACT_APP_ROCKSTAR_SERVICE_URL} target='_blank' variant='h5'>
            Service Status
        </RockstarLink>
    </RockstarLinkStack>
);

export const Updated = ({ updated }: { updated: string }) => (
    <FlexText gutterBottom sx={{ textTransform: 'uppercase', textAlign: 'center', pb: 2 }}>
        Updated&nbsp;{`${updated}`}
    </FlexText>
);

export const Image = ({ id }: { id: number; }) => (
    <CardImageBox>
        <CardMedia id={id} />
    </CardImageBox>
);

export const PlatformsList = memo(({ platforms }: { platforms: Platform[]; }) => {
    const theme = useTheme();
    const sortedPlatforms = useMemo(() => sortBy(platforms, 'name'), [platforms]);
    return (
        <Fragment>
            {sortedPlatforms?.map((platform: Platform, idx: number) => (
                <PlatformItem key={idx}>
                    <PlatformWrapper>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
                            <PlatformIcon platform={platform?.name} />
                            <Typography sx={{ pl: 2 }}>{platform?.name}</Typography>
                        </Box>
                        <Typography sx={{ color: `${styleStatus(theme, platform?.status)}`, fontWeight: 'bold' }}>
                            {platform?.status}
                        </Typography>
                    </PlatformWrapper>
                </PlatformItem>
            ))}
        </Fragment>
    );
});

export const StatusGridItems = memo(({ statuses }: { statuses: Status[]; }) => (
    <Fragment>
        {statuses?.map((status: Status, index: number) => (
            <Grid item key={index} component={NavLink} to={`/service/${status?.id}`} xs={12} sm={12} md={6} lg={4} xl={3} sx={{
                textDecoration: 'none'
            }}>
                <StatusCard>
                    <Image id={status?.id} />
                    <CardName variant='h6' gutterBottom paragraph>
                        {status?.name}
                    </CardName>
                    <Divider variant='middle' />
                    <Stack direction='column' spacing={1} sx={{ pt: 2 }}>
                        {status?.services_platforms && (
                            <PlatformsList
                                platforms={status?.services_platforms}
                            />
                        )}
                    </Stack>
                </StatusCard>
            </Grid>
        ))}
    </Fragment>
));
