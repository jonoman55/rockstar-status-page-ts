import Header from './Header';
import BackToTop from './BackToTop';
import Footer from './Footer';
import { Container, Body } from './Container';

import type { ChildProps } from '../../types';

interface Props {
    children: ChildProps;
};

export const Layout = (props: Props) => (
    <Body>
        <Header />
        <Container component='main'>
            {props.children}
            <BackToTop
                children={props.children}
            />
        </Container>
        <Footer />
    </Body>
);
