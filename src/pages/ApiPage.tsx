import { Api, PageItem } from '../components';
import { useAppSelector } from '../app/hooks';

const ApiPage = () => {
    const { tabValue } = useAppSelector((state) => state.app);
    return (
        <PageItem>
            {tabValue === 3 && <Api />}
        </PageItem>
    );
};

export default ApiPage;
