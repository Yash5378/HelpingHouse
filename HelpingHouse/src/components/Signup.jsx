import React, { useState, useEffect } from "react";
import { Card, Flex, Typography, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "../Style/Auth.css";
import DonorSignupForm from "./DonorsignupForm";
import HelpingHouseSignupForm from "./HelpingHouseSignupForm";


const { Title, Text } = Typography;

const ACCOUNT_TYPES = [
  {
    key: "donor",
    emoji: "💛",
    title: "Donor",
    description:
      "I want to donate money, goods, or time to support people in need.",
  },
  {
    key: "helping_house",
    emoji: "🏠",
    title: "Helping House User",
    description:
      "I represent an organisation or shelter seeking donations and support.",
  },
];

 function Signup() {
  const [selectedType, setSelectedType] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    if (
      type === "helping_house" ||
      type === "helping-house" ||
      type === "house"
    ) {
      setSelectedType("helping_house");
    }
  }, [searchParams]);

  const handleSelect = (key) => setSelectedType(key);
  const handleBack = () => setSelectedType(null);

  return (
    <Flex
      align="center"
      justify="center"
      className="signup-page"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="signup-container"
        style={{ maxWidth: 640, width: "100%" }}
      >
        {!selectedType ? (
          // Step 1: Type selection
          <Flex vertical align="center" className="signup-header">
            <Flex align="center" gap="small" className="mb-4">
              <div className="auth-logo-icon">
                <HomeOutlined />
              </div>
              <Text className="auth-logo-text">Helping House</Text>
            </Flex>

            <Title level={2} className="auth-title">
              Who are you joining as?
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Choose the account type that best describes you.
            </Text>

            <Flex
              gap="middle"
              className="signup-type-grid w-100"
              style={{ marginTop: 24 }}
            >
              {ACCOUNT_TYPES.map((type) => (
                <Card
                  key={type.key}
                  hoverable
                  className="signup-type-card"
                  onClick={() => handleSelect(type.key)}
                  style={{ flex: 1, cursor: "pointer", textAlign: "center" }}
                >
                  <div className="signup-type-icon">
                    <span style={{ fontSize: 28 }}>{type.emoji}</span>
                  </div>
                  <Title level={5} className="signup-type-title">
                    {type.title}
                  </Title>
                  <Text type="secondary" className="signup-type-desc">
                    {type.description}
                  </Text>
                </Card>
              ))}
            </Flex>

            <Flex justify="center" className="auth-footer mt-5">
              <Text type="secondary">Already have an account? </Text>
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </Flex>
          </Flex>
        ) : (
          // Step 2: Show form
          <Card
            className="auth-card wide"
            style={{ maxWidth: 540, margin: "0 auto" }}
            bordered={false}
          >
            {selectedType === "donor" ? (
              <DonorSignupForm onBack={handleBack} />
            ) : (
              <HelpingHouseSignupForm onBack={handleBack} />
            )}
            <Flex justify="center" className="auth-footer mt-4">
              <Text type="secondary">Already have an account? </Text>
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </Flex>
          </Card>
        )}
      </div>
    </Flex>
  );
}


export default Signup;