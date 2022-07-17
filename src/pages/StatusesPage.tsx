import { PageItem, Statuses } from '../components';
import { useAppSelector } from '../app/hooks';

const StatusesPage = () => {
    const { tabValue } = useAppSelector((state) => state.app);
    return (
        <PageItem>
            {tabValue === 2 && <Statuses />}
        </PageItem>
    );
};

export default StatusesPage;
