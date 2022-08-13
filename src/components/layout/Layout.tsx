import Header from './Header';
import BackToTop from './BackToTop';
import Footer from './Footer';
import { Container, Body } from './Container';

import { ChildProps } from '../../interfaces';

/**
 * Layout Wrapper Component
 * @param {ChildProps} props React Node
 * @returns {JSX.Element} Layout as JSX Element
 */
export const Layout = ({ children }: ChildProps): JSX.Element => (
    <Body>
        <Header />
        <Container component='main'>
            {children}
            <BackToTop
                children={children}
            />
        </Container>
        <Footer />
    </Body>
);
