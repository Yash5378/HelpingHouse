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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const param = useParams();
  const location = useLocation();

  console.log("location", location);
  console.log("param", param);

  const userlogin = useSelector((state) => state?.login?.donerData);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/landing");
  };

  const useData = JSON.parse(localStorage.getItem("userData"));
  console.log("useData", useData);
  const userMenuItems = [
    // {
    //   key: "profile",
    //   icon: <UserOutlined />,
    //   label: "My Profile",
    //   onClick: onProfileClick,
    // },

    ...(useData?.user?.role === "helping_house"
      ? [
          {
            key: "dashboard",
            icon: <UserOutlined />,
            label: "Dashboard",
            onClick: () => navigate("/dashboard"),
          },
        ]
      : []),

    { type: "divider" },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <Text style={{ color: "#ef4444" }}>Logout</Text>,
      onClick: () => handleLogout(),
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
      <Space
        size={16}
        align="center"
        style={{ cursor: "pointer " }}
        onClick={() => navigate("/home")}
      >
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

      {location.pathname === "/landing" ? (
        <Button onClick={() => navigate("/signup")}>SignUp</Button>
      ) : (
        <Space size={12} align="center">
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
              <div>
                <Text strong style={{ fontSize: 13 }}>
                  {useData?.user?.name}
                </Text>
              </div>
              <DownOutlined style={{ fontSize: 10 }} />
            </Space>
          </Dropdown>
        </Space>
      )}
    </Header>
  );
};

export default HeaderComponent;
