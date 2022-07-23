import { PageItem, HomeCard } from '../components';
import { useAppSelector } from '../app/hooks';

const HomePage = () => {
    const { tabValue } = useAppSelector((state) => state.app);
    return (
        <PageItem>
            {tabValue === 0 && <HomeCard />}
        </PageItem>
    );
};

export default HomePage;
