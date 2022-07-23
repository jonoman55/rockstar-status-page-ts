import { PageItem, ServicesCard } from '../components';
import { useAppSelector } from '../app/hooks';

const ServicesPage = () => {
    const { tabValue } = useAppSelector((state) => state.app);
    return (
        <PageItem>
            {tabValue === 1 && <ServicesCard />}
        </PageItem>
    );
};

export default ServicesPage;
