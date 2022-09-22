import { lazy } from "react";
import { HashRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

import { Layout } from "../components";

import type { Lazy } from "../types";

const Home: Lazy = lazy(() => import("../pages/HomePage"));
const Services: Lazy = lazy(() => import("../pages/ServicesPage"));
const Statuses: Lazy = lazy(() => import("../pages/StatusesPage"));
const Api: Lazy = lazy(() => import("../pages/ApiPage"));
const Outages: Lazy = lazy(() => import("../pages/OutagesPage"));
const Service: Lazy = lazy(() => import("../pages/ServicePage"));
const NotFound: Lazy = lazy(() => import("../pages/NotFoundPage"));

const Routes = (): JSX.Element => (
    <Router>
        <Layout>
            <Switch>
                <Route path="/" element={<Navigate to="/all" />} />
                <Route path="/all" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/statuses" element={<Statuses />} />
                <Route path="/api" element={<Api />} />
                <Route path="/outages" element={<Outages />} />
                <Route path="/service/:id" element={<Service />} />
                <Route path="*" element={<NotFound />} />
            </Switch>
        </Layout>
    </Router>
);

export default Routes;
