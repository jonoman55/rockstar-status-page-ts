import { Button, Card, CardActions, CardContent, Paper, Typography } from "../styled/NotFoundCard.styled";
import { NotFoundImage } from "./NotFoundImage";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const NotFoundCard = ({ onClick }: Props) => (
    <Paper>
        <Card>
            <CardContent>
                <Typography variant='h6'>404</Typography>
                <Typography variant='h6' gutterBottom paragraph>
                    Page Not Found
                </Typography>
            </CardContent>
            <NotFoundImage />
            <CardActions>
                <Button variant='contained' onClick={onClick}>
                    Go Home
                </Button>
            </CardActions>
        </Card>
    </Paper>
);
