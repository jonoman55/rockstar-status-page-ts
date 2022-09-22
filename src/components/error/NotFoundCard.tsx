import { Button, Card, CardActions, CardContent, Image, ImageBox, Paper, Typography } from "../styled/NotFoundCard.styled";

interface NotFoundProps {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const NotFoundCard: React.FC<NotFoundProps> = ({ onClick }): JSX.Element => (
    <Paper elevation={2}>
        <Card>
            <CardContent>
                <Typography variant='h6'>404</Typography>
                <Typography variant='h6' gutterBottom paragraph>
                    Not Found
                </Typography>
            </CardContent>
            <ImageBox>
                <Image />
            </ImageBox>
            <CardActions>
                <Button variant='contained' onClick={onClick}>
                    Go Home
                </Button>
            </CardActions>
        </Card>
    </Paper>
);
