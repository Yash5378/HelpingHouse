/**
 * ─────────────────────────────────────────────────────────────
 *  AppHeader — Usage Example
 *  Shows how to plug <AppHeader /> into any page/layout
 * ─────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { Layout, notification, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import AppHeader from "./AppHeader"; // ← import the shared component

const { Sider, Content } = Layout;

export default function SideBar() {
    const [collapsed, setCollapsed] = useState(false);

    // ── handlers (define once, pass to AppHeader) ──────────────
    const handleSearch = (value) => {
        message.info(`Searching for: "${value}"`);
    };

    const handleNotification = () => {
        notification.open({
            message: "Notifications",
            description: "You have 3 unread notifications.",
            placement: "topRight",
        });
    };

    const handleLogout = () => {
        message.success("Logged out successfully.");
    };

    const handleSettings = () => {
        message.info("Opening settings...");
    };

    const handleHelp = () => {
        message.info("Opening help center...");
    };

    const handleProfile = () => {
        message.info("Opening profile...");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Your Sidebar */}
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                width={240}
                style={{ background: "#0f172a" }}
            >
                {/* ... your menu items ... */}
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: "margin-left 0.2s" }}>

                {/* ── Drop AppHeader here — just pass props ─────────── */}
                <AppHeader
                    collapsed={collapsed}
                    onToggle={() => setCollapsed(!collapsed)}

                    // Breadcrumb: array of { title, href? }
                    breadcrumbs={[
                        { title: <HomeOutlined /> },
                        { title: "Organizations", href: "/organizations" },
                        { title: "Community Lighthouse" },           // last item = current page (no link)
                    ]}

                    // User info
                    user={{
                        name: "Sarah Chen",
                        role: "Director",
                        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                    }}

                    // Notification badge count
                    notificationCount={3}

                    // Callbacks
                    onSearch={handleSearch}
                    onNotificationClick={handleNotification}
                    onProfileClick={handleProfile}
                    onSettingsClick={handleSettings}
                    onLogout={handleLogout}
                    onHelpClick={handleHelp}

                    // Feature toggles (all true by default)
                    showSearch={true}
                    showNotification={true}
                    showHelp={true}
                    showSettings={true}
                />

                {/* ── Your page content goes here ───────────────────── */}
                <Content style={{ padding: 32, background: "#f0f7ff" }}>
                    {/* page body... */}
                </Content>
            </Layout>
        </Layout>
    );
}


/* ─────────────────────────────────────────────────────────────
   QUICK REFERENCE — All AppHeader Props
   ─────────────────────────────────────────────────────────────

   PROP                  TYPE        DEFAULT     DESCRIPTION
   ─────────────────     ────────    ────────    ──────────────────────────────────────
   collapsed             boolean     false       Controls hamburger icon (open/closed)
   onToggle              function    —           Fires when hamburger button is clicked
   breadcrumbs           Array       [Home]      [{ title: ReactNode, href?: string }]
   user                  object      —           { name, role, avatar }
   notificationCount     number      0           Red badge count on the bell icon
   onSearch              function    —           (searchString) => void
   onNotificationClick   function    —           () => void
   onProfileClick        function    —           () => void
   onSettingsClick       function    —           () => void
   onLogout              function    —           () => void
   onHelpClick           function    —           () => void
   showSearch            boolean     true        Toggle search bar visibility
   showNotification      boolean     true        Toggle bell icon visibility
   showHelp              boolean     true        Toggle help icon visibility
   showSettings          boolean     true        Toggle settings icon visibility
   ─────────────────────────────────────────────────────────────  */