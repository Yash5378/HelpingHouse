import { Layout, Button, Space, Typography, Dropdown } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/landing");
  };

  const userMenuItems = [
    ...(userData?.user?.role === "helping_house"
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
      onClick: handleLogout,
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
      {/* Logo */}
      <Space
        size={12}
        align="center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/home")}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #1a6b45, #155237)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(26,107,69,0.4)",
          }}
        >
          <HomeOutlined style={{ fontSize: 18, color: "white" }} />
        </div>
        <Text style={{ fontWeight: 700, color: "#1a6b45", fontSize: 15 }}>
          Helping House
        </Text>
      </Space>

      {/* Right side */}
      {location.pathname === "/landing" ? (
        <Button
          type="primary"
          onClick={() => navigate("/signup")}
          style={{ borderRadius: 8, fontWeight: 600 }}
        >
          Sign Up
        </Button>
      ) : (
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
            <Text strong style={{ fontSize: 13 }}>
              {userData?.user?.name}
            </Text>
            <DownOutlined style={{ fontSize: 10 }} />
          </Space>
        </Dropdown>
      )}
    </Header>
  );
};

export default HeaderComponent;
