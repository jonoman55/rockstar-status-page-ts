import { Box, CardActions, Divider, Stack, Theme, Typography } from '@mui/material';

import { CardActionBox, StatusChip } from '../shared';
import { Image, ImageBox, StatusTextBox } from '../styled/ServiceDetailsCard.styled';
import { fetchImage } from '../../helpers';

import type { StatusType } from '../../types';

interface CardImageProps {
    id: number;
};

export const CardImage: React.FC<CardImageProps> = ({ id }): JSX.Element => (
    <ImageBox>
        <Image src={fetchImage(id)} alt='logo' />
    </ImageBox>
);

interface RawHtmlProps {
    htmlString: string;
};

export const RawHtml: React.FC<RawHtmlProps> = ({ htmlString }): JSX.Element => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);

interface HtmlMessageProps {
    message: string;
};

export const HtmlMessage: React.FC<HtmlMessageProps> = ({ message }): JSX.Element => (
    <Box sx={{ p: 2, mb: 2 }}>
        <RawHtml htmlString={message} />
    </Box>
);

export const Footer: React.FC = (): JSX.Element => (
    <CardActions sx={{ p: 0, display: 'flex' }}>
        <CardActionBox />
    </CardActions>
);

interface StatusTextProps {
    name: string;
    status: StatusType;
    theme: Theme;
};

export const StatusText: React.FC<StatusTextProps> = ({ name, status, theme }): JSX.Element => (
    <StatusTextBox>
        <Typography variant='h6'>{name}</Typography>
        <StatusChip status={`${status?.toUpperCase()}`} theme={theme} />
    </StatusTextBox>
);

interface StatusesListProps {
    status: StatusType;
    service: StatusType;
    theme: Theme;
};

export const StatusesList: React.FC<StatusesListProps> = ({ status, service, theme }): JSX.Element => (
    <Stack direction='column' spacing={1} display='flex' alignItems='baseline' justifyContent='flex-start'>
        <StatusText name='Service' status={service} theme={theme} />
        <Divider flexItem variant='middle' sx={{ py: 1 }} />
        <StatusText name='Status' status={status} theme={theme} />
    </Stack>
);
