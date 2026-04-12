import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Flex,
  message,
  Progress,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SignupDoner } from "../Store/login/loginAction";
import { useDispatch } from "react-redux";
import "../Style/Auth.css";

const { Title, Text, Link } = Typography;

const passwordRules = [
  { required: true, message: "Please enter a password." },
  { min: 8, message: "Password must be at least 8 characters." },
  { pattern: /[A-Z]/, message: "Must contain at least one uppercase letter." },
  { pattern: /[0-9]/, message: "Must contain at least one number." },
  { pattern: /[^A-Za-z0-9]/, message: "Must contain at least one special character." },
];

function getPasswordStrength(password) {
  if (!password) return { percent: 0, color: "#e2e8f0", label: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { percent: 0,   color: "#e2e8f0", label: "" },
    { percent: 25,  color: "#ef4444", label: "Weak" },
    { percent: 50,  color: "#f59e0b", label: "Fair" },
    { percent: 75,  color: "#3b82f6", label: "Good" },
    { percent: 100, color: "#1a6b45", label: "Strong" },
  ];
  return map[score];
}

export default function DonorSignupForm({ onBack }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const dispatch = useDispatch();

  const strength = getPasswordStrength(passwordValue);

  const handleRegister = async (values) => {
    setLoadingRegister(true);
    try {
      const res = await dispatch(SignupDoner(values));
      if (res?.status_code === 201) {
        message.success("Account created! Welcome 🎉");
        localStorage.setItem("userData", JSON.stringify(res));
        if (res?.userType === "helping_house") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        message.error(res?.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      message.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <>
      <Button
        type="link"
        className="btn-back"
        onClick={onBack}
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: 20 }}
      >
        Back to account type
      </Button>

      <div className="auth-badge">💛 Donor Account</div>

      <Title level={2} className="auth-title">
        Create your account
      </Title>
      <Text className="auth-subtitle">Start making a difference today.</Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
        requiredMark={false}
        scrollToFirstError
        autoComplete="off"
        style={{ marginTop: 24 }}
      >
        <Form.Item
          name="name"
          label="User Name"
          rules={[{ required: true, message: "Please enter your name." }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Your full name"
            autoComplete="new-name"
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
            prefix={<MailOutlined />}
            placeholder="you@example.com"
            autoComplete="new-email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={passwordRules}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Create a strong password"
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone twoToneColor="var(--hh-primary)" />
              ) : (
                <EyeInvisibleOutlined style={{ color: "#94a3b8" }} />
              )
            }
            onChange={(e) => setPasswordValue(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Item>

        {passwordValue && (
          <div style={{ marginTop: -12, marginBottom: 16 }}>
            <Flex justify="space-between" style={{ marginBottom: 4 }}>
              <Text style={{ fontSize: 11, color: "#94a3b8" }}>
                Password strength
              </Text>
              <Text style={{ fontSize: 11, color: strength.color, fontWeight: 600 }}>
                {strength.label}
              </Text>
            </Flex>
            <Progress
              percent={strength.percent}
              strokeColor={strength.color}
              trailColor="#f1f5f9"
              showInfo={false}
              size={["100%", 5]}
            />
          </div>
        )}

        <Text className="password-hint">
          Use 8+ characters with uppercase, numbers, and special characters (e.g. @#$%).
        </Text>

        <Text className="password-hint" style={{ marginBottom: 20 }}>
          By creating an account, you agree to our{" "}
          <Link style={{ color: "var(--hh-primary)" }}>Terms of Service</Link>{" "}
          and{" "}
          <Link style={{ color: "var(--hh-primary)" }}>Privacy Policy</Link>.
        </Text>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-primary w-100"
            loading={loadingRegister}
            icon={<ArrowRightOutlined />}
            iconPosition="end"
          >
            Create Donor Account
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
