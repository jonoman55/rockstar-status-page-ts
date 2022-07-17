import { lazy } from "react";
import { HashRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";

import { Layout } from "../components";

const Home = lazy(() => import("../pages/HomePage"));
const Services = lazy(() => import("../pages/ServicesPage"));
const Statuses = lazy(() => import("../pages/StatusesPage"));
const Api = lazy(() => import("../pages/ApiPage"));
const NotFound = lazy(() => import("../pages/NotFoundPage"));

// TODO : Add :id routes for Statuses and Services
const Routes = () => (
    <Router>
        <Layout>
            <Switch>
                <Route path="/" element={<Navigate to="/all" />} />
                <Route path="/all" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/statuses" element={<Statuses />} />
                <Route path="/api" element={<Api />} />
                <Route path="*" element={<NotFound />} />
            </Switch>
        </Layout>
    </Router>
);

export default Routes;
