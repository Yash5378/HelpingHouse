import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Flex,
  Space,
  Select,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LockOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { registerHelpingHouse } from "../services/authService";
import "../Style/Auth.css";

const { Title, Text } = Typography;

const passwordRules = [
  { required: true, message: "Please enter a password." },
  { min: 8, message: "Password must be at least 8 characters." },
  { pattern: /[A-Z]/, message: "Include at least one uppercase letter." },
  { pattern: /[0-9]/, message: "Include at least one number." },
  {
    pattern: /[^A-Za-z0-9]/,
    message: "Include at least one special character.",
  },
];

export default function HelpingHouseSignupForm({ onBack }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await registerHelpingHouse({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        website: values.website,
        ngoType: values.ngoType,
        password: values.password,
        ngoName: values.ngoName,
      });
      console.log("Registration response:", res);
      if (res?.status_code === 201) {
        localStorage.setItem("userData", JSON.stringify(res));
        message.success("Account created! Redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        message.error(res?.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      message.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="link"
        className="btn-back"
        onClick={onBack}
        style={{ padding: 0, marginBottom: 16 }}
      >
        <ArrowLeftOutlined /> Back to account type
      </Button>

      <Flex align="center" className="mb-3">
        <div
          style={{
            background: "rgba(26,107,69,0.10)",
            color: "var(--hh-primary)",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          🏠 Helping House User
        </div>
      </Flex>

      <Title level={2} className="auth-title">
        Create your account
      </Title>
      <Text type="secondary" className="auth-subtitle">
        Join our network and connect with donors.
      </Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
        requiredMark={false}
        scrollToFirstError
        style={{ marginTop: 24 }}
        autoComplete="off"
      >
        <Form.Item
          name="fullName"
          label="Full name"
          rules={[
            { required: true, message: "Please enter your full name." },
            { min: 2, message: "Name must be at least 2 characters." },
            {
              pattern: /^[a-zA-Z\s'-]+$/,
              message:
                "Name should only contain letters, spaces, hyphens, or apostrophes.",
            },
          ]}
        >
          <Input
            autoComplete="off"
            prefix={<UserOutlined />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="ngoName"
          label="NGO Name"
          rules={[
            { required: true, message: "Please enter your NGO name." },
            { min: 2, message: "Name must be at least 2 characters." },
            {
              pattern: /^[a-zA-Z\s'-]+$/,
              message:
                "Name should only contain letters, spaces, hyphens, or apostrophes.",
            },
          ]}
        >
          <Input
            autoComplete="new-ngo-name"
            prefix={<UserOutlined />}
            placeholder="NGO Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[
            { required: true, message: "Please enter your email." },
            { type: "email", message: "Please enter a valid email address." },
          ]}
        >
          <Input
            autoComplete="new-email"
            prefix={<MailOutlined />}
            placeholder="you@example.com"
          />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[{ required: true, message: "Please enter your Website." }]}
        >
          <Input autoComplete="new-url" placeholder="website" />
        </Form.Item>
        <Form.Item
          name="ngoType"
          label="Ngo Type"
          rules={[{ required: true, message: "Please select your ngo type ." }]}
        >
          <Select placeholder="Select NGO Type">
            <Select.Option value="dog_shelter">Dog Shelter</Select.Option>
            <Select.Option value="cat_shelter">Cat Shelter</Select.Option>
            <Select.Option value="children_house">
              Children's House
            </Select.Option>
            <Select.Option value="elder_care">Elder Care</Select.Option>
            <Select.Option value="women_shelter">Women's Shelter</Select.Option>
            <Select.Option value="food_bank">Food Bank</Select.Option>
            <Select.Option value="veterans_home">Veteran's Home</Select.Option>
            <Select.Option value="youth_center">Youth Center</Select.Option>
            <Select.Option value="disability_support">
              Disability Support
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone number"
          rules={[
            { required: true, message: "Please enter your phone number." },
            {
              pattern: /^[0-9+\-\s]{7,15}$/,
              message: "Please enter a valid phone number.",
            },
          ]}
        >
          <Input
            autoComplete="new-phone"
            prefix={<PhoneOutlined />}
            placeholder="+1 555 000 0000"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            { required: true, message: "Please enter your address." },
            { min: 10, message: "Please enter a complete address." },
          ]}
        >
          <Input.TextArea
            prefix={<EnvironmentOutlined />}
            placeholder="123 Main Street, City, State, ZIP"
            rows={2}
            style={{ resize: "none" }}
            autoComplete="off"
          />
        </Form.Item>

        <Text strong className="form-section-label" style={{ marginTop: 8 }}>
          Security
        </Text>

        <Form.Item
          name="password"
          label="Password"
          rules={passwordRules}
          hasFeedback
        >
          <Input.Password
            autoComplete="new-password"
            prefix={<LockOutlined />}
            placeholder="Create a strong password"
          />
        </Form.Item>

        <Text type="secondary" className="password-hint">
          Use 8+ characters with uppercase, numbers, and special characters
          (e.g. @#$%).
        </Text>

        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password." },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match."));
              },
            }),
          ]}
        >
          <Input.Password
            autoComplete="off"
            prefix={<CheckCircleOutlined />}
            placeholder="Re-enter your password"
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-primary w-100"
            loading={loading}
            icon={<ArrowRightOutlined />}
            iconPosition="end"
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
