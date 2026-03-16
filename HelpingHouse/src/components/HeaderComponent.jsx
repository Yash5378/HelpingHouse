import { useState } from "react";
import {
    Layout,
    Badge,
    Button,
    Avatar,
    Space,
    Typography,
    Dropdown,
    Tooltip,
} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
    DownOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = ({



    navigate = useNavigate(),
    collapsed = false,
    onToggle,
    // user = {
    //     name: "Sarah Chen",
    //     role: "Director",
    //     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    // },
    notificationCount = 3,
    onNotificationClick,
    onProfileClick,
    onSettingsClick,
    onLogout,
    showNotification = true,
    showSettings = true,
}) => {


    const userlogin = useSelector((state) => state?.login?.donerData)
    const userMenuItems = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "My Profile",
            onClick: onProfileClick,
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Account Settings",
            onClick: onSettingsClick,
        },
        { type: "divider" },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <Text style={{ color: "#ef4444" }}>Logout</Text>,
            onClick: onLogout,
        },
    ];

    return (
        <Header
            style={{
                background: "white",
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                position: "sticky",
                top: 0,
                zIndex: 99,
                height: 64,
                lineHeight: "normal",
            }}
        >
            {/* Left: Hamburger only */}
            <Space size={16} align="center" style={{ cursor: "pointer " }} onClick={() => navigate("/home")}  >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 4px 12px rgba(59,130,246,0.5)",
                    }}
                >
                    <HomeOutlined style={{ fontSize: 18, color: "white" }} />
                </div>
                <Text>Helping House</Text>
            </Space>

            {/* Right: Actions + User */}
            <Space size={12} align="center">

                {showSettings && (
                    <Tooltip title="Settings">
                        <Button
                            shape="circle"
                            icon={<SettingOutlined />}
                            onClick={onSettingsClick}
                            style={{
                                border: "1px solid #e5e7eb",
                                background: "#f9fafb",
                                width: 38,
                                height: 38,
                            }}
                        />
                    </Tooltip>
                )}

                {showNotification && (
                    <Tooltip title="Notifications">
                        <Badge count={notificationCount} size="small">
                            <Button
                                shape="circle"
                                icon={<BellOutlined />}
                                onClick={onNotificationClick}
                                style={{
                                    border: "1px solid #e5e7eb",
                                    background: "#f9fafb",
                                    width: 38,
                                    height: 38,
                                }}
                            />
                        </Badge>
                    </Tooltip>
                )}

                <div
                    style={{
                        width: 1,
                        height: 32,
                        background: "#e5e7eb",
                    }}
                />

                <Dropdown
                    menu={{ items: userMenuItems }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <Space
                        style={{
                            cursor: "pointer",
                            padding: "6px 10px",
                            borderRadius: 10,
                            border: "1px solid #e5e7eb",
                            background: "#f9fafb",
                        }}
                        size={8}
                    >
                        {/* <Avatar
                            src={user.avatar}
                            size={30}
                            icon={<UserOutlined />}
                        /> */}
                        <div>
                            <Text strong style={{ fontSize: 13 }}>
                                {userlogin?.user?.name}
                            </Text>

                        </div>
                        <DownOutlined style={{ fontSize: 10 }} />
                    </Space>
                </Dropdown>

            </Space>
        </Header>
    );
};

export default HeaderComponent;
