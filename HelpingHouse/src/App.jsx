import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";

import Login from "./components/login";
import Signup from "./components/Signup";
import HeaderComponent from "./components/HeaderComponent";
import HelpingHouseDashboard from "./components/HelpingHouseDashboard";
import DemoDashboard from "./components/DemoDashboard";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import RouteProtection from "./GenericComponent/RouteProtection";
import HelpingHouse from "./components/HelpingHouse";
import TokenExpiryHandler from "./components/TokenExpiryHandler";

const { Content } = Layout;

const antdTheme = {
  token: {
    colorPrimary: "#1a6b45",
    colorError: "#dc2626",
    colorText: "#1c1c1c",
    colorTextSecondary: "#6b7280",
    colorBorder: "#e2ddd5",
    colorBgContainer: "#ffffff",
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    borderRadius: 8,
    controlHeight: 44,
  },
};

export default function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <TokenExpiryHandler />
        <Layout>
          <HeaderComponent />
          <Content>
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/" element={<Navigate to="/landing" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* ✅ Protected Routes */}
              <Route element={<RouteProtection />}>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<HelpingHouseDashboard />} />
                <Route path="/:id" element={<HelpingHouse />} />
              </Route>

              <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}
