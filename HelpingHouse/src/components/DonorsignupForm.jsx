import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Flex,
  message,
  Divider,
  Progress,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  HeartFilled,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SignupDoner } from "../Store/login/loginAction";
import { useDispatch } from "react-redux";
// import { registerDonor, loginWithGoogle } from "../services/authService";

const { Title, Text, Link } = Typography;

const GoogleIcon = () => (
  <svg
    viewBox="0 0 48 48"
    style={{ width: 18, height: 18, marginRight: 8, verticalAlign: "middle" }}
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const passwordRules = [
  { required: true, message: "Please enter a password." },
  { min: 8, message: "Password must be at least 8 characters." },
  { pattern: /[A-Z]/, message: "Must contain at least one uppercase letter." },
  { pattern: /[0-9]/, message: "Must contain at least one number." },
  {
    pattern: /[^A-Za-z0-9]/,
    message: "Must contain at least one special character.",
  },
];

function getPasswordStrength(password) {
  if (!password) return { percent: 0, color: "#e2e8f0", label: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = [
    { percent: 0, color: "#e2e8f0", label: "" },
    { percent: 25, color: "#ef4444", label: "Weak" },
    { percent: 50, color: "#f59e0b", label: "Fair" },
    { percent: 75, color: "#3b82f6", label: "Good" },
    { percent: 100, color: "#10b981", label: "Strong" },
  ];
  return map[score];
}

export default function DonorSignupForm({ onBack }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const dispatch = useDispatch();

  const strength = getPasswordStrength(passwordValue);

  const handleRegister = async (values) => {
    setLoadingRegister(true);
    console.log("values", values);
    try {
      // await registerDonor({ email: values.email, password: values.password });
      const res = await dispatch(SignupDoner(values));

      console.log("res===>>>", res);
      if (res?.status_code === 201) {
        message.success("Donor account created! Welcome 🎉");
        navigate("/dashboard");
      }
    } catch (err) {
      message.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoadingGoogle(true);
    try {
      // await loginWithGoogle();
      message.success("Signed up with Google! Welcome 🎉");
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err) {
      message.error("Google sign-up failed. Please try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  // this is comment 

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f4fd 0%, #dbeafe 50%, #eff6ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Left panel — decorative */}
      <div
        style={{
          display: "none",
          width: 420,
          minHeight: 620,
          background:
            "linear-gradient(160deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)",
          borderRadius: "24px 0 0 24px",
          padding: "48px 40px",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
        className="auth-left-panel"
      >
        {/* decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(59,130,246,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(29,78,216,0.2)",
          }}
        />

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 48,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(59,130,246,0.5)",
              }}
            >
              <HeartFilled style={{ color: "white", fontSize: 20 }} />
            </div>
            <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
              Helping House
            </Text>
          </div>

          <Title
            level={2}
            style={{
              color: "white",
              margin: "0 0 12px",
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            Give hope.
            <br />
            Change lives.
          </Title>
          <Text style={{ color: "#93c5fd", fontSize: 15, lineHeight: 1.7 }}>
            Join thousands of donors making a real difference in communities
            around the world.
          </Text>
        </div>

        <div>
          {[
            { icon: "💛", text: "100% of donations go to families" },
            { icon: "🔒", text: "Secure & transparent giving" },
            { icon: "📊", text: "Real-time impact tracking" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {item.icon}
              </div>
              <Text style={{ color: "#cbd5e1", fontSize: 13 }}>
                {item.text}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: "44px 40px",
          width: "100%",
          maxWidth: 480,
          boxShadow:
            "0 20px 60px rgba(59,130,246,0.12), 0 4px 20px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        {/* Back button */}
        <Button
          type="link"
          onClick={onBack}
          icon={<ArrowLeftOutlined />}
          style={{
            padding: 0,
            marginBottom: 20,
            color: "#64748b",
            fontSize: 13,
            fontWeight: 500,
            height: "auto",
          }}
        >
          Back to account type
        </Button>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(244,160,36,0.1)",
            color: "#b45309",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 20,
            border: "1px solid rgba(244,160,36,0.2)",
          }}
        >
          💛 Donor Account
        </div>

        <Title
          level={2}
          style={{
            margin: "0 0 4px",
            color: "#1e3a5f",
            fontWeight: 800,
            fontSize: 26,
          }}
        >
          Create your account
        </Title>
        <Text style={{ color: "#64748b", fontSize: 14 }}>
          Start making a difference today.
        </Text>

        {/* Google button */}
        {/* <Button
                    onClick={handleGoogleSignup}
                    loading={loadingGoogle}
                    style={{
                        width: "100%",
                        marginTop: 24,
                        height: 46,
                        borderRadius: 12,
                        border: "1.5px solid #e2e8f0",
                        background: "white",
                        color: "#374151",
                        fontWeight: 600,
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        gap: 4,
                    }}
                    icon={!loadingGoogle && <GoogleIcon />}
                >
                    Sign up with Google
                </Button> */}

        {/* Divider */}
        {/* <Divider style={{ margin: "20px 0", color: "#94a3b8", fontSize: 12 }}>
          or register with email
        </Divider> */}

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
          scrollToFirstError
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label={
              <Text style={{ color: "#374151", fontWeight: 600, fontSize: 13 }}>
                User Name
              </Text>
            }
            rules={[{ required: true, message: "Please enter your Name." }]}
          >
            <Input
              style={{
                height: 44,
                borderRadius: 10,
                border: "1.5px solid #e2e8f0",
                fontSize: 14,
              }}
              autoComplete="new-name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <Text style={{ color: "#374151", fontWeight: 600, fontSize: 13 }}>
                Email address
              </Text>
            }
            rules={[
              { required: true, message: "Please enter your email." },
              { type: "email", message: "Please enter a valid email address." },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#94a3b8" }} />}
              placeholder="you@example.com"
              style={{
                height: 44,
                borderRadius: 10,
                border: "1.5px solid #e2e8f0",
                fontSize: 14,
              }}
              autoComplete="new-email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <Text style={{ color: "#374151", fontWeight: 600, fontSize: 13 }}>
                Password
              </Text>
            }
            rules={passwordRules}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
              placeholder="Create a strong password"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone twoToneColor="#3b82f6" />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#94a3b8" }} />
                )
              }
              style={{
                height: 44,
                borderRadius: 10,
                border: "1.5px solid #e2e8f0",
                fontSize: 14,
              }}
              onChange={(e) => setPasswordValue(e.target.value)}
              autoComplete="new-password"
            />
          </Form.Item>

          {/* Password strength meter */}
          {passwordValue && (
            <div style={{ marginTop: -12, marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text style={{ fontSize: 11, color: "#94a3b8" }}>
                  Password strength
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: strength.color,
                    fontWeight: 600,
                  }}
                >
                  {strength.label}
                </Text>
              </div>
              <Progress
                percent={strength.percent}
                strokeColor={strength.color}
                trailColor="#f1f5f9"
                showInfo={false}
                size={["100%", 5]}
                style={{ borderRadius: 99 }}
              />
            </div>
          )}

          <Text
            style={{
              color: "#94a3b8",
              fontSize: 12,
              display: "block",
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            Use 8+ characters with uppercase, numbers, and special characters
            (e.g. @#$%).
          </Text>

          {/* <Form.Item
                        name="confirmPassword"
                        label={<Text style={{ color: "#374151", fontWeight: 600, fontSize: 13 }}>Confirm password</Text>}
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
                            prefix={<CheckCircleOutlined style={{ color: "#94a3b8" }} />}
                            placeholder="Re-enter your password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone twoToneColor="#3b82f6" /> : <EyeInvisibleOutlined style={{ color: "#94a3b8" }} />
                            }
                            style={{
                                height: 44,
                                borderRadius: 10,
                                border: "1.5px solid #e2e8f0",
                                fontSize: 14,
                            }}
                        />
                    </Form.Item> */}

          {/* Terms */}
          <Text
            style={{
              color: "#94a3b8",
              fontSize: 12,
              display: "block",
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            By creating an account, you agree to our{" "}
            <Link style={{ color: "#3b82f6" }}>Terms of Service</Link> and{" "}
            <Link style={{ color: "#3b82f6" }}>Privacy Policy</Link>.
          </Text>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingRegister}
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              style={{
                width: "100%",
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                border: "none",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 4px 16px rgba(59,130,246,0.4)",
                letterSpacing: 0.3,
              }}
            >
              Create Donor Account
            </Button>
          </Form.Item>
        </Form>

        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginTop: 20,
            color: "#64748b",
            fontSize: 13,
          }}
        >
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#3b82f6", fontWeight: 600 }}>
            Sign in
          </Link>
        </Text>
      </div>
    </div>
  );
}
