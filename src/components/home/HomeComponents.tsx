import { Fragment, memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography, Divider, Grid } from '@mui/material';
import { sortBy } from 'lodash';

import { PlatformIcon, StatusChip, StatusIcon } from '../shared';
import { FlexText } from '../controls';
import { CardMediaBrandLogo } from '../styled/PaperCard.styled';
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
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch } from '../../app/hooks';
import { REACT_APP_ROCKSTAR_SERVICE_URL, RockstarStatus } from '../../constants';

import type { Status, Platform, StatusType } from '../../types';

const IndicatorItem: React.FC<{ status: StatusType; }> = ({ status }): JSX.Element => (
    <IndicatorPaper>
        <StatusIcon status={status} />
        <IndicatorStatus>{status?.toUpperCase()}</IndicatorStatus>
    </IndicatorPaper>
);

const StatusIndicatorsGrid: React.FC<{}> = (): JSX.Element => (
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

export const StatusIndicators: React.FC<{}> = (): JSX.Element => (
    <IndicatorsContainer>
        <StatusIndicatorsGrid />
    </IndicatorsContainer>
);

export const Title: React.FC<{}> = (): JSX.Element => (
    <RockstarLinkStack direction='row' spacing={2}>
        <RockstarLinkIcon />
        <RockstarLink href={`${REACT_APP_ROCKSTAR_SERVICE_URL}`} target='_blank' variant='h5'>
            Service Status
        </RockstarLink>
    </RockstarLinkStack>
);

export const Updated: React.FC<{ updated: string; }> = ({ updated }): JSX.Element => (
    <FlexText gutterBottom sx={{ textTransform: 'uppercase', textAlign: 'center', pb: 2 }}>
        Updated&nbsp;{`${updated}`}
    </FlexText>
);

export const Image: React.FC<{ id: number; }> = ({ id }): JSX.Element => (
    <CardImageBox>
        <CardMediaBrandLogo id={id} />
    </CardImageBox>
);

interface PlatformsListProps {
    platforms: Platform[];
};

export const PlatformsList = memo(({ platforms }: PlatformsListProps): JSX.Element => {
    const sortedPlatforms: Platform[] = useMemo<Platform[]>(
        () => sortBy(platforms, 'name'),
        [platforms]
    );
    return (
        <Fragment>
            {sortedPlatforms?.map((platform: Platform, idx: number) => (
                <PlatformItem key={idx}>
                    <PlatformWrapper>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
                            <PlatformIcon platform={platform?.name} />
                            <Typography sx={{ pl: 2 }}>{platform?.name}</Typography>
                        </Box>
                        <StatusChip status={`${platform?.status}`} />
                    </PlatformWrapper>
                </PlatformItem>
            ))}
        </Fragment>
    );
});

interface StatusGridItemsProps {
    statuses: Status[];
};

export const StatusGridItems = memo(({ statuses }: StatusGridItemsProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback(
        (status: Status) => () => {
            dispatch(appActions.setServicePageId(status.id));
            dispatch(appActions.setIsServiceRoute(true));
            dispatch(appActions.setTargetHref(`/service/${status.id}`));
        },
        [dispatch]
    );

    return (
        <Fragment>
            {statuses?.map((status: Status, index: number) => (
                <Grid
                    key={index}
                    item
                    component={Link}
                    to={`/service/${status?.id}`}
                    xs={12} sm={12} md={6} lg={4} xl={3}
                    onClick={handleClick(status)}
                    sx={{ textDecoration: 'none' }}
                >
                    <StatusCard>
                        <Image id={status?.id} />
                        <CardName variant='h6' gutterBottom paragraph>{status?.name}</CardName>
                        <Divider variant='middle' />
                        <Stack direction='column' spacing={1} sx={{ pt: 2 }}>
                            {status?.services_platforms && (
                                <PlatformsList platforms={status?.services_platforms} />
                            )}
                        </Stack>
                    </StatusCard>
                </Grid>
            ))}
        </Fragment>
    );
});
