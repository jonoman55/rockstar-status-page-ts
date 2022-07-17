import { PageItem, Services } from '../components';
import { useAppSelector } from '../app/hooks';

const ServicesPage = () => {
    const { tabValue } = useAppSelector((state) => state.app);
    return (
        <PageItem>
            {tabValue === 1 && <Services />}
        </PageItem>
    );
};

export default ServicesPage;
