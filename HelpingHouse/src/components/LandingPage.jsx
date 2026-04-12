import { useState, useEffect, useRef } from "react";
import {
  Button,
  Typography,
  Row,
  Col,
  Input,
  Avatar,
  Badge,
  Tag,
  Statistic,
  Carousel,
} from "antd";
import {
  HomeOutlined,
  HeartFilled,
  ArrowRightOutlined,
  CheckCircleFilled,
  StarFilled,
  TeamOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  GiftOutlined,
  RocketOutlined,
  MenuOutlined,
  CloseOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

// ─── Data ──────────────────────────────────────────────────────────
const navLinks = ["Home", "How It Works", "Houses", "About", "Contact"];

const houseTypes = [
  { icon: "🐕", label: "Dog Shelters", count: 124 },
  { icon: "🧒", label: "Children's Homes", count: 89 },
  { icon: "👴", label: "Elder Care", count: 67 },
  { icon: "🌸", label: "Women's Shelters", count: 53 },
  { icon: "🍱", label: "Food Banks", count: 201 },
  { icon: "🎖️", label: "Veterans' Homes", count: 38 },
  { icon: "🦋", label: "Youth Centers", count: 94 },
  { icon: "♿", label: "Disability Support", count: 45 },
];

const howItWorks = [
  {
    step: "01",
    icon: <SearchIcon />,
    title: "Discover Houses",
    desc: "Browse verified helping houses in your area by category, location, or specific needs.",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    step: "02",
    icon: <HeartFilled style={{ fontSize: 24 }} />,
    title: "Choose to Help",
    desc: "Select how you want to contribute — donate funds, supplies, time, or skills.",
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    step: "03",
    icon: <GiftOutlined style={{ fontSize: 24 }} />,
    title: "Make an Impact",
    desc: "Your contribution goes directly to the house. Track the real-time impact of your support.",
    color: "#10b981",
    bg: "#f0fdf4",
  },
];

const testimonials = [
  {
    name: "Maria Thompson",
    role: "Regular Donor",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "Helping House made it so easy to find and support local shelters. I can see exactly where my donations go — it's transparent and deeply rewarding.",
    stars: 5,
    house: "Little Stars Orphanage",
  },
  {
    name: "James Okafor",
    role: "Volunteer",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "I found my local veterans home through this platform and have been volunteering every weekend. The community it builds is unlike anything else.",
    stars: 5,
    house: "Veteran's Rest House",
  },
  {
    name: "Priya Nair",
    role: "House Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "As a shelter manager, this platform connected us with over 200 donors in our first month. It changed everything for the children we serve.",
    stars: 5,
    house: "Silver Years Home",
  },
  {
    name: "Robert Chen",
    role: "Corporate Partner",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Our company uses Helping House for CSR initiatives. The reporting and verification tools give us full confidence in every contribution we make.",
    stars: 5,
    house: "Open Table Food Bank",
  },
];

const featuredHouses = [
  {
    name: "Little Stars Orphanage",
    type: "Children's Home",
    emoji: "🧒",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    tagColor: "#ef4444",
    tagBg: "rgba(239,68,68,0.1)",
    location: "New York, NY",
    volunteers: 78,
    raised: "$24,800",
    goal: "$30,000",
    progress: 82,
    urgent: true,
  },
  {
    name: "Silver Years Home",
    type: "Elder Care",
    emoji: "👴",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80",
    tagColor: "#8b5cf6",
    tagBg: "rgba(139,92,246,0.1)",
    location: "Austin, TX",
    volunteers: 52,
    raised: "$18,200",
    goal: "$25,000",
    progress: 72,
    urgent: false,
  },
  {
    name: "Open Table Food Bank",
    type: "Food Bank",
    emoji: "🍱",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    tagColor: "#f97316",
    tagBg: "rgba(249,115,22,0.1)",
    location: "Chicago, IL",
    volunteers: 115,
    raised: "$41,500",
    goal: "$50,000",
    progress: 83,
    urgent: true,
  },
];

const impactStats = [
  { value: "1,240+", label: "Helping Houses", icon: "🏠", color: "#3b82f6" },
  { value: "48,000+", label: "Donors Connected", icon: "💛", color: "#f59e0b" },
  { value: "$2.8M+", label: "Funds Raised", icon: "💰", color: "#10b981" },
  {
    value: "12,000+",
    label: "Volunteers Active",
    icon: "🤝",
    color: "#8b5cf6",
  },
];

const partners = [
  "UNICEF",
  "Red Cross",
  "WHO",
  "UNHCR",
  "Save the Children",
  "Oxfam",
];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: 24,
        height: 24,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
      }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ─── Animated counter hook ─────────────────────────────────────
function useCountUp(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/[^0-9]/g, ""));
    if (!numeric) return;
    let start = 0;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView]);
  return count;
}

// ─── Progress bar ──────────────────────────────────────────────
function ProgressBar({ percent, color }) {
  return (
    <div
      style={{
        background: "#f1f5f9",
        borderRadius: 99,
        height: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          borderRadius: 99,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif; }

        .lp-nav-link {
          color: #cbd5e1;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
        }
        .lp-nav-link:hover { color: white; }

        .lp-card-hover {
          transition: all 0.28s ease;
        }
        .lp-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(59,130,246,0.16) !important;
        }

        .lp-type-chip {
          transition: all 0.2s;
          cursor: pointer;
        }
        .lp-type-chip:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(59,130,246,0.18) !important;
        }

        .lp-hero-fade-in {
          animation: fadeUp 0.8s ease forwards;
          opacity: 0;
        }
        .lp-hero-fade-in:nth-child(1) { animation-delay: 0.1s; }
        .lp-hero-fade-in:nth-child(2) { animation-delay: 0.25s; }
        .lp-hero-fade-in:nth-child(3) { animation-delay: 0.4s; }
        .lp-hero-fade-in:nth-child(4) { animation-delay: 0.55s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        .lp-float { animation: float 4s ease-in-out infinite; }

        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .lp-pulse::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: pulse-ring 2s ease-out infinite;
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .lp-shimmer-text {
          background: linear-gradient(90deg, #93c5fd 0%, white 40%, #93c5fd 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .lp-partner-chip {
          transition: all 0.2s;
        }
        .lp-partner-chip:hover {
          background: rgba(59,130,246,0.2) !important;
          border-color: rgba(59,130,246,0.5) !important;
          color: white !important;
        }

        @media (max-width: 768px) {
          .lp-hero-title { font-size: 36px !important; }
          .lp-hide-mobile { display: none !important; }
          .lp-hero-btns { flex-direction: column !important; }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif",
          overflowX: "hidden",
        }}
      >
        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              position: "fixed",
              top: 68,
              left: 0,
              right: 0,
              background: "rgba(15,23,42,0.97)",
              backdropFilter: "blur(16px)",
              padding: "24px 32px",
              zIndex: 999,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {navLinks.map((link) => (
              <div
                key={link}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Text style={{ color: "white", fontSize: 15, fontWeight: 500 }}>
                  {link}
                </Text>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Button
                style={{
                  flex: 1,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                Sign In
              </Button>
              <Button
                type="primary"
                style={{
                  flex: 1,
                  borderRadius: 10,
                  background: "#3b82f6",
                  border: "none",
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}

        <section
          style={{
            minHeight: "100vh",
            background:
              "linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            paddingTop: 68,
          }}
        >
          {/* Background decorations */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              right: "5%",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "2%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "35%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Grid pattern overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "60px 40px",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Row gutter={[48, 48]} align="middle">
              {/* Left — text */}
              <Col xs={24} lg={13}>
                {/* Top pill */}
                {/* <div className="lp-hero-fade-in">
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(59,130,246,0.15)",
                      color: "#93c5fd",
                      borderRadius: 99,
                      padding: "6px 16px",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 24,
                      border: "1px solid rgba(59,130,246,0.3)",
                      letterSpacing: 0.3,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#10b981",
                        display: "inline-block",
                      }}
                    />
                    1,240+ Houses · 48,000+ Donors · Making a Difference
                  </div>
                </div> */}

                {/* Headline */}
                <div className="lp-hero-fade-in">
                  <h1
                    className="lp-hero-title"
                    style={{
                      fontSize: 58,
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1.08,
                      marginBottom: 20,
                      letterSpacing: -1.5,
                    }}
                  >
                    Where Kindness
                    <br />
                    <span className="lp-shimmer-text">Finds a Home.</span>
                  </h1>
                </div>

                {/* Sub */}
                <div className="lp-hero-fade-in">
                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 17,
                      lineHeight: 1.75,
                      display: "block",
                      maxWidth: 500,
                      marginBottom: 36,
                    }}
                  >
                    Helping House connects compassionate donors with verified
                    shelters, orphanages, elder homes, and community centers
                    that need your support — transparently and directly.
                  </Text>
                </div>

                {/* Buttons */}
                <div
                  className="lp-hero-fade-in lp-hero-btns"
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 48,
                  }}
                >
                  <Button
                    onClick={() => navigate("/login")}
                    type="primary"
                    size="large"
                    icon={<HeartFilled />}
                    style={{
                      height: 54,
                      paddingInline: 32,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      border: "none",
                      fontWeight: 700,
                      fontSize: 15,
                      boxShadow: "0 8px 24px rgba(59,130,246,0.5)",
                      letterSpacing: 0.2,
                    }}
                  >
                    Start Donating
                  </Button>
                  <Button
                    onClick={() => navigate("/signup?type=helping_house")}
                    size="large"
                    icon={<HomeOutlined />}
                    style={{
                      height: 54,
                      paddingInline: 32,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.08)",
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 15,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Register Your House
                  </Button>
                  {/* <Button
                    size="large"
                    icon={<PlayCircleOutlined />}
                    type="link"
                    style={{
                      height: 54,
                      color: "#93c5fd",
                      fontWeight: 600,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      paddingInline: 8,
                    }}
                  >
                    Watch how it works
                  </Button> */}
                </div>

                {/* <div
                  className="lp-hero-fade-in"
                  style={{ display: "flex", alignItems: "center", gap: 14 }}
                >
                  <div style={{ display: "flex" }}>
                    {[
                      "https://randomuser.me/api/portraits/women/44.jpg",
                      "https://randomuser.me/api/portraits/men/32.jpg",
                      "https://randomuser.me/api/portraits/women/68.jpg",
                      "https://randomuser.me/api/portraits/men/75.jpg",
                      "https://randomuser.me/api/portraits/women/12.jpg",
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: "2.5px solid #1e3a5f",
                          marginLeft: i === 0 ? 0 : -10,
                          objectFit: "cover",
                        }}
                      />
                    ))}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#3b82f6",
                        border: "2.5px solid #1e3a5f",
                        marginLeft: -10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      +2K
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarFilled
                          key={s}
                          style={{ color: "#f59e0b", fontSize: 11 }}
                        />
                      ))}
                    </div>
                    <Text style={{ color: "#94a3b8", fontSize: 12 }}>
                      Trusted by{" "}
                      <Text strong style={{ color: "#e2e8f0" }}>
                        48,000+ donors
                      </Text>{" "}
                      worldwide
                    </Text>
                  </div>
                </div> */}
              </Col>

              <Col xs={0} lg={11}>
                <div style={{ position: "relative", height: 500 }}>
                  {/* Main featured house card */}
                  <div
                    className="lp-float"
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      right: 20,
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(20px)",
                      borderRadius: 24,
                      border: "1px solid rgba(255,255,255,0.1)",
                      overflow: "hidden",
                      boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                      alt=""
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div style={{ padding: "18px 20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <Text
                            style={{
                              color: "white",
                              fontWeight: 700,
                              fontSize: 16,
                              display: "block",
                            }}
                          >
                            Little Stars Orphanage
                          </Text>
                          <Text style={{ color: "#93c5fd", fontSize: 12 }}>
                            🧒 Children's Home · New York
                          </Text>
                        </div>
                        {/* <div
                          style={{
                            background: "rgba(239,68,68,0.2)",
                            borderRadius: 8,
                            padding: "4px 10px",
                          }}
                        >
                          {/* <Text
                            style={{
                              color: "#f87171",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            URGENT
                          </Text> */}
                        {/* </div>  */}
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <Text style={{ color: "#94a3b8", fontSize: 12 }}>
                            Raised $24,800 of $30,000
                          </Text>
                          <Text
                            style={{
                              color: "#3b82f6",
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            82%
                          </Text>
                        </div> */}
                        <div
                          style={{
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: 99,
                            height: 6,
                          }}
                        >
                          <div
                            style={{
                              width: "82%",
                              height: "100%",
                              background:
                                "linear-gradient(90deg, #3b82f6, #10b981)",
                              borderRadius: 99,
                            }}
                          />
                        </div>
                      </div>
                      {/* <Button
                        onClick={() => navigate("/login")}
                        type="primary"
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          background:
                            "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                          border: "none",
                          fontWeight: 600,
                          height: 38,
                        }}
                      >
                        Donate Now
                      </Button> */}
                    </div>
                  </div>

                  {/* Floating stat pills */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 60,
                      right: -10,
                      background: "white",
                      borderRadius: 14,
                      padding: "12px 16px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      animation: "float 5s ease-in-out infinite 1s",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "#fef2f2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <HeartFilled style={{ color: "#ef4444", fontSize: 16 }} />
                    </div>
                    <div>
                      {/* <Text
                        style={{
                          color: "#1e3a5f",
                          fontWeight: 800,
                          fontSize: 17,
                          display: "block",
                          lineHeight: 1.1,
                        }}
                      >
                        $2.8M+
                      </Text> */}
                      <Text style={{ color: "#64748b", fontSize: 11 }}>
                        Total Raised
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 0,
                      background: "white",
                      borderRadius: 14,
                      padding: "12px 16px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      animation: "float 6s ease-in-out infinite 0.5s",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "#f0fdf4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircleFilled
                        style={{ color: "#10b981", fontSize: 16 }}
                      />
                    </div>
                    <div>
                      {/* <Text
                        style={{
                          color: "#1e3a5f",
                          fontWeight: 800,
                          fontSize: 17,
                          display: "block",
                          lineHeight: 1.1,
                        }}
                      >
                        1,240+
                      </Text> */}
                      <Text style={{ color: "#64748b", fontSize: 11 }}>
                        Verified Houses
                      </Text>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Wave divider */}
          <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
            <svg
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
              style={{ width: "100%", height: 80, display: "block" }}
            >
              <path
                d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
                fill="#f0f7ff"
              />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            IMPACT STATS
        ══════════════════════════════════════════════════ */}

        {/* ══════════════════════════════════════════════════
            HOUSE TYPES
        ══════════════════════════════════════════════════ */}
        <section style={{ background: "white", padding: "80px 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#eff6ff",
                  color: "#3b82f6",
                  borderRadius: 99,
                  padding: "5px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 16,
                  border: "1px solid #bfdbfe",
                }}
              >
                📂 All Categories
              </div>
              <Title
                level={2}
                style={{
                  color: "#1e3a5f",
                  fontWeight: 900,
                  fontSize: 38,
                  margin: "0 0 14px",
                  letterSpacing: -0.5,
                }}
              >
                Every Kind of Help,
                <br />
                <span style={{ color: "#3b82f6" }}>One Platform</span>
              </Title>
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 16,
                  display: "block",
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                From animal shelters to elder care, find and support the houses
                that match your passion.
              </Text>
            </div>

            <Row gutter={[16, 16]}>
              {houseTypes.map((t, i) => (
                <Col xs={12} sm={8} md={6} key={i}>
                  <div
                    className="lp-type-chip"
                    style={{
                      background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
                      borderRadius: 18,
                      padding: "24px 20px",
                      textAlign: "center",
                      border: "1.5px solid #e2e8f0",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 10 }}>
                      {t.icon}
                    </div>
                    <Text
                      style={{
                        color: "#1e3a5f",
                        fontWeight: 700,
                        fontSize: 14,
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {t.label}
                    </Text>
                    {/* <Text
                      style={{
                        color: "#3b82f6",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {t.count} houses →
                    </Text> */}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════ */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #eff6ff 100%)",
            padding: "80px 40px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#f0fdf4",
                  color: "#15803d",
                  borderRadius: 99,
                  padding: "5px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 16,
                  border: "1px solid #bbf7d0",
                }}
              >
                <ThunderboltOutlined /> Simple & Transparent
              </div>
              <Title
                level={2}
                style={{
                  color: "#1e3a5f",
                  fontWeight: 900,
                  fontSize: 38,
                  margin: "0 0 14px",
                  letterSpacing: -0.5,
                }}
              >
                How It Works
              </Title>
              <Text style={{ color: "#64748b", fontSize: 16 }}>
                Three simple steps to start making a real difference.
              </Text>
            </div>

            <Row gutter={[32, 32]}>
              {howItWorks.map((step, i) => (
                <Col xs={24} md={8} key={i}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: 24,
                      padding: "36px 32px",
                      border: "1px solid #e8f0fe",
                      boxShadow: "0 4px 20px rgba(59,130,246,0.06)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="lp-card-hover"
                  >
                    {/* Step number watermark */}
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        right: 20,
                        fontSize: 80,
                        fontWeight: 900,
                        color: `${step.color}08`,
                        lineHeight: 1,
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    >
                      {step.step}
                    </div>

                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 18,
                        background: step.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: step.color,
                        fontSize: 26,
                        marginBottom: 20,
                        border: `1.5px solid ${step.color}25`,
                        position: "relative",
                      }}
                    >
                      {step.icon}
                    </div>

                    <Text
                      style={{
                        background: step.bg,
                        color: step.color,
                        borderRadius: 8,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "inline-block",
                        marginBottom: 12,
                        border: `1px solid ${step.color}25`,
                      }}
                    >
                      STEP {step.step}
                    </Text>

                    <Title
                      level={4}
                      style={{
                        color: "#1e3a5f",
                        fontWeight: 800,
                        margin: "0 0 10px",
                        fontSize: 20,
                      }}
                    >
                      {step.title}
                    </Title>
                    <Text
                      style={{
                        color: "#64748b",
                        fontSize: 14,
                        lineHeight: 1.7,
                      }}
                    >
                      {step.desc}
                    </Text>

                    {i < howItWorks.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          right: -16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 32,
                          height: 32,
                          background:
                            "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 1,
                          boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
                        }}
                        className="lp-hide-mobile"
                      >
                        <ArrowRightOutlined
                          style={{ color: "white", fontSize: 13 }}
                        />
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FEATURED HOUSES
        ══════════════════════════════════════════════════ */}

        {/* ══════════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════════ */}

        {/* ══════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════ */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #eff6ff 100%)",
            padding: "80px 40px",
          }}
        >
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                background:
                  "linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)",
                borderRadius: 32,
                padding: "64px 48px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(59,130,246,0.25)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: "rgba(59,130,246,0.15)",
                  pointerEvents: "none",
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
                  background: "rgba(16,185,129,0.08)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
                <Title
                  level={2}
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: 36,
                    margin: "0 0 16px",
                    letterSpacing: -0.5,
                  }}
                >
                  Ready to Make a Difference?
                </Title>
                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 16,
                    display: "block",
                    maxWidth: 480,
                    margin: "0 auto 36px",
                    lineHeight: 1.7,
                  }}
                >
                  Whether you're a donor wanting to give, or a house manager
                  seeking support — join thousands already changing lives.
                </Text>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    onClick={() => navigate("/login")}
                    type="primary"
                    size="large"
                    icon={<HeartFilled />}
                    style={{
                      height: 52,
                      paddingInline: 32,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      border: "none",
                      fontWeight: 700,
                      fontSize: 15,
                      boxShadow: "0 8px 24px rgba(59,130,246,0.5)",
                    }}
                  >
                    Start Donating Today
                  </Button>
                  <Button
                    onClick={() => navigate("/signup?type=helping_house")}
                    size="large"
                    icon={<HomeOutlined />}
                    style={{
                      height: 52,
                      paddingInline: 32,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.1)",
                      border: "1.5px solid rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    Register Your House
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            PARTNERS
        ══════════════════════════════════════════════════ */}
      
        {/* ══════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════ */}
        <footer
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 100%)",
            padding: "64px 40px 32px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Row gutter={[48, 40]} style={{ marginBottom: 48 }}>
              {/* Brand col */}
              <Col xs={24} md={8}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      borderRadius: 11,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(59,130,246,0.5)",
                    }}
                  >
                    <HomeOutlined style={{ color: "white", fontSize: 18 }} />
                  </div>
                  <div>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 800,
                        fontSize: 16,
                        display: "block",
                        lineHeight: 1.1,
                      }}
                    >
                      Helping House
                    </Text>
                    <Text
                      style={{
                        color: "#93c5fd",
                        fontSize: 10,
                        letterSpacing: 0.5,
                      }}
                    >
                      COMMUNITY NETWORK
                    </Text>
                  </div>
                </div>
                <Text
                  style={{
                    color: "#64748b",
                    fontSize: 14,
                    lineHeight: 1.75,
                    display: "block",
                    maxWidth: 280,
                    marginBottom: 20,
                  }}
                >
                  Connecting compassionate donors with verified community houses
                  that need support. Transparent. Direct. Impactful.
                </Text>
                <div style={{ display: "flex", gap: 10 }}>
                  {["📘", "🐦", "📸", "💼"].map((emoji, i) => (
                    <div
                      key={i}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: 16,
                        transition: "all 0.2s",
                      }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </Col>

              {/* Links */}
              {[
                {
                  title: "Platform",
                  links: [
                    "Browse Houses",
                    "Donate",
                    "Volunteer",
                    "Register House",
                    "Become a Partner",
                  ],
                },
                {
                  title: "Company",
                  links: [
                    "About Us",
                    "Our Mission",
                    "Blog",
                    "Press",
                    "Careers",
                  ],
                },
              ].map((col, i) => (
                <Col xs={12} md={4} key={i}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "block",
                      marginBottom: 20,
                      letterSpacing: 0.3,
                    }}
                  >
                    {col.title}
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {col.links.map((link, j) => (
                      <Text
                        key={j}
                        style={{
                          color: "#64748b",
                          fontSize: 13,
                          cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#93c5fd")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#64748b")
                        }
                      >
                        {link}
                      </Text>
                    ))}
                  </div>
                </Col>
              ))}

              {/* Contact */}
              <Col xs={24} md={6}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    display: "block",
                    marginBottom: 20,
                    letterSpacing: 0.3,
                  }}
                >
                  Contact Us
                </Text>
                {[
                  { icon: <MailOutlined />, text: "yashkumar52622@gmail.com" },
                  { icon: <PhoneOutlined />, text: "+91 8755504162" },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: "rgba(59,130,246,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#93c5fd",
                        fontSize: 13,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {item.icon}
                    </div>
                    <Text
                      style={{
                        color: "#64748b",
                        fontSize: 13,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </Text>
                  </div>
                ))}

                {/* Newsletter */}
                <div style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 12,
                      display: "block",
                      marginBottom: 10,
                    }}
                  >
                    Get impact updates in your inbox
                  </Text>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Input
                      placeholder="your@email.com"
                      style={{
                        flex: 1,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        fontSize: 13,
                        height: 38,
                      }}
                    />
                    <Button
                      type="primary"
                      style={{
                        height: 38,
                        borderRadius: 10,
                        background: "#3b82f6",
                        border: "none",
                        fontWeight: 600,
                        paddingInline: 16,
                      }}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Bottom bar */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <Text style={{ color: "#475569", fontSize: 13 }}>
                © 2026 Helping House Network. Made with{" "}
                <HeartFilled style={{ color: "#ef4444", fontSize: 11 }} /> for
                communities everywhere.
              </Text>
              <div style={{ display: "flex", gap: 20 }}>
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (link, i) => (
                    <Text
                      key={i}
                      style={{
                        color: "#475569",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#93c5fd")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#475569")
                      }
                    >
                      {link}
                    </Text>
                  ),
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
