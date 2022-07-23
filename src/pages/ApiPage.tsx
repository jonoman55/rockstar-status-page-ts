import { ApiCard, PageItem } from '../components';
import { useAppSelector } from '../app/hooks';

const ApiPage = () => {
    const { tabValue } = useAppSelector((state) => state.app);
    return (
        <PageItem>
            {tabValue === 3 && <ApiCard />}
        </PageItem>
    );
};

export default ApiPage;
