import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Typography,
  Flex,
  message,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import {
  donerLogin,
  loginUser,
  loginWithGoogle,
} from "../Store/login/loginAction";
import "../Style/Auth.css";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;

const GoogleIcon = () => (
  <svg className="google-icon" viewBox="0 0 48 48">
    {/* SVG paths - unchanged */}
  </svg>
);

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const dispatch = useDispatch();
  const userlogin = useSelector((state) => state?.login?.donerData);
  console.log("userlogin", userlogin);

  const handleLogin = async (values) => {
    console.log(values);
    setLoadingLogin(true);
    try {
      const res = await dispatch(donerLogin(values));
      console.log("res", res);
      if (res?.status_code === 200) {
        message.success("Login successful! Redirecting…");
        localStorage.setItem("userData", JSON.stringify(res));
        if (res?.userType === "helping_house") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (err) {
      message.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const response = await loginWithGoogle();
      if (response?.token) {
        localStorage.setItem("userData", JSON.stringify(response));
      }
      message.success("Signed in with Google! Redirecting…");
      if (response?.userType === "helping_house") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      message.error(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      className="auth-page"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="auth-card"
        style={{ maxWidth: 480, width: "100%" }}
        bordered={false}
      >
        {/* Logo */}
        <Flex align="center" gap="small" className="mb-4">
          <div className="auth-logo-icon">
            <HomeOutlined />
          </div>
          <Text className="auth-logo-text">Helping House</Text>
        </Flex>

        <Title level={2} className="auth-title">
          Welcome back
        </Title>
        <Text type="secondary" className="auth-subtitle">
          Sign in to continue your journey of giving.
        </Text>

        {/* <Button
          className="btn-google w-100"
          onClick={handleGoogleLogin}
          loading={loadingGoogle}
          icon={!loadingGoogle && <GoogleIcon />}
          style={{ marginTop: 24 }}
        >
          Continue with Google
        </Button> */}

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              { required: true, message: "Please enter your email." },
              { type: "email", message: "Please enter a valid email address." },
            ]}
          >
            <Input prefix={<MailOutlined />} autoComplete="new-email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 20 }}>
            <Flex justify="space-between" align="center">
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{ fontSize: 13, color: "var(--hh-text-muted)" }}>
                                    Remember me
                                </Checkbox>
                            </Form.Item> */}
              <Button
                type="link"
                className="auth-link"
                style={{ fontSize: 13, padding: 0 }}
                onClick={() => message.info("Password reset coming soon!")}
              >
                Forgot password?
              </Button>
            </Flex>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-primary w-100"
              loading={loadingLogin}
              icon={<ArrowRightOutlined />}
              iconPosition="end"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Flex justify="center" className="auth-footer mt-4">
          <Text type="secondary">Don't have an account? </Text>
          <Link to="/signup" className="auth-link">
            Create one free
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
}
