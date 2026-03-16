import { useState, useRef } from "react";
import {
    Layout,
    Card,
    Typography,
    Row,
    Col,
    Carousel,
    Avatar,
    Button,
    Space,
    Tag,
    Tooltip,
    Menu,
    Badge,
    Statistic,
    Progress,
    Timeline,
    Tabs,
    Table,
    Input,
    Form,
    Select,
    DatePicker,
    Breadcrumb,
    Dropdown,
    notification,
    Modal,
} from "antd";
import {
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    GlobalOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    HomeOutlined,
    HeartFilled,
    LeftOutlined,
    RightOutlined,
    UserOutlined,
    TeamOutlined,
    DashboardOutlined,
    FileTextOutlined,
    BellOutlined,
    SettingOutlined,
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    EyeOutlined,
    CalendarOutlined,
    TrophyOutlined,
    RiseOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    DownOutlined,
    StarFilled,
    ShareAltOutlined,
    DownloadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph, Link } = Typography;
const { TabPane } = Tabs;

const carouselImages = [
    {
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80",
        caption: "Building Communities Together",
    },
    {
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1400&q=80",
        caption: "Growing a Greener Future",
    },
    {
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80",
        caption: "Sharing Meals, Sharing Love",
    },
    {
        url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&q=80",
        caption: "Volunteers Making a Difference",
    },
];

const personnel = [
    {
        name: "Sarah Chen",
        role: "Director",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        phone: "+1 800-555-0101",
        email: "sarah@lighthouse.org",
        status: "online",
    },
    {
        name: "David Miller",
        role: "Program Coordinator",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        phone: "+1 800-555-0102",
        email: "david@lighthouse.org",
        status: "online",
    },
    {
        name: "Priya Patel",
        role: "Volunteer Manager",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        phone: "+1 800-555-0103",
        email: "priya@lighthouse.org",
        status: "away",
    },
    {
        name: "James Wu",
        role: "Outreach Lead",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        phone: "+1 800-555-0104",
        email: "james@lighthouse.org",
        status: "offline",
    },
];

const documents = [
    { name: "NGO Registration Certificate.pdf", type: "pdf", size: "2.4 MB", date: "Jan 12, 2024" },
    { name: "Tax Exemption Letter 2024.pdf", type: "pdf", size: "1.1 MB", date: "Feb 03, 2024" },
    { name: "Annual Impact Report.docx", type: "word", size: "3.8 MB", date: "Mar 20, 2024" },
    { name: "Board Resolution 2024.pdf", type: "pdf", size: "0.9 MB", date: "Apr 01, 2024" },
];

const upcomingEvents = [
    { event: "Food Drive – City Park", date: "Feb 25, 2026", color: "#3b82f6" },
    { event: "Volunteer Orientation", date: "Mar 02, 2026", color: "#10b981" },
    { event: "Annual Gala Fundraiser", date: "Mar 15, 2026", color: "#f59e0b" },
    { event: "Community Garden Launch", date: "Apr 05, 2026", color: "#8b5cf6" },
];

const recentDonors = [
    { key: "1", name: "Alice Johnson", amount: "$500", date: "Feb 20, 2026", status: "Completed" },
    { key: "2", name: "Robert Lee", amount: "$1,200", date: "Feb 18, 2026", status: "Completed" },
    { key: "3", name: "Maria Garcia", amount: "$250", date: "Feb 15, 2026", status: "Pending" },
    { key: "4", name: "Tom Brown", amount: "$750", date: "Feb 12, 2026", status: "Completed" },
];

const donorColumns = [
    { title: "Donor", dataIndex: "name", key: "name", render: (t) => <Text strong>{t}</Text> },
    { title: "Amount", dataIndex: "amount", key: "amount", render: (t) => <Text style={{ color: "#10b981", fontWeight: 600 }}>{t}</Text> },
    { title: "Date", dataIndex: "date", key: "date" },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (s) => (
            <Tag color={s === "Completed" ? "green" : "orange"}>{s}</Tag>
        ),
    },
];


function HelpingHouseDashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedKey, setSelectedKey] = useState("2");
    const [modalOpen, setModalOpen] = useState(false);
    const carouselRef = useRef(null);

    const openNotif = () => {
        notification.success({
            message: "Action Successful",
            description: "Your changes have been saved.",
            placement: "topRight",
        });
    };

 

    return (
        <Layout style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

            {/* ─── MAIN LAYOUT ───────────────────────────────────── */}
            <Layout style={{ transition: "margin-left 0.2s" }}>

               
                <Content
                    style={{
                        background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #eff6ff 100%)",
                        minHeight: "calc(100vh - 64px)",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <Carousel
                            ref={carouselRef}
                            autoplay
                            autoplaySpeed={4000}
                            effect="fade"
                            dots
                            style={{ lineHeight: 0 }}
                        >
                            {carouselImages.map((img, i) => (
                                <div key={i}>
                                    <div
                                        style={{
                                            height: 260,
                                            backgroundImage: `url(${img.url})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            position: "relative",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                                            }}
                                        />
                                        <div style={{ position: "absolute", bottom: 40, left: 40 }}>
                                            <Text style={{ color: "white", fontSize: 22, fontWeight: 700, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                                                {img.caption}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>

                        {/* Carousel nav buttons */}
                        <Button
                            shape="circle"
                            icon={<LeftOutlined />}
                            onClick={() => carouselRef.current?.prev()}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 16,
                                transform: "translateY(-50%)",
                                zIndex: 10,
                                background: "rgba(255,255,255,0.85)",
                                border: "none",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                            }}
                        />
                        <Button
                            shape="circle"
                            icon={<RightOutlined />}
                            onClick={() => carouselRef.current?.next()}
                            style={{
                                position: "absolute",
                                top: "50%",
                                right: 16,
                                transform: "translateY(-50%)",
                                zIndex: 10,
                                background: "rgba(255,255,255,0.85)",
                                border: "none",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                            }}
                        />

                        {/* Logo badge overlapping carousel bottom */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: -48,
                                left: 36,
                                zIndex: 20,
                            }}
                        >
                            <div
                                style={{
                                    width: 96,
                                    height: 96,
                                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                    borderRadius: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "4px solid white",
                                    boxShadow: "0 8px 24px rgba(59,130,246,0.45)",
                                    position: "relative",
                                }}
                            >
                                <HomeOutlined style={{ fontSize: 40, color: "white" }} />
                                <HeartFilled
                                    style={{
                                        fontSize: 16,
                                        color: "#fbbf24",
                                        position: "absolute",
                                        bottom: 14,
                                        right: 14,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: "72px 32px 40px" }}>
                        <Row gutter={[24, 24]}>
                            {/* Left Column */}
                            <Col xs={24} lg={15}>

                                {/* Org Info */}
                                <Card
                                    style={{
                                        borderRadius: 20,
                                        border: "1px solid #dbeafe",
                                        background: "white",
                                        boxShadow: "0 4px 20px rgba(59,130,246,0.07)",
                                        marginBottom: 24,
                                    }}
                                    bodyStyle={{ padding: "28px 32px" }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
                                        <div>
                                            <Title level={2} style={{ margin: 0, color: "#1e3a5f", fontWeight: 800, fontSize: 28 }}>
                                                The Community Lighthouse
                                            </Title>
                                            <Space style={{ marginTop: 4 }}>
                                                <Text style={{ color: "#64748b" }}>Guiding light for a better future</Text>
                                                <Tag color="blue">NGO</Tag>
                                                <Tag color="green">Verified</Tag>
                                            </Space>
                                        </div>
                                        <Space>
                                            <Button icon={<ShareAltOutlined />} style={{ borderRadius: 8, borderColor: "#dbeafe", color: "#3b82f6" }}>
                                                Share
                                            </Button>
                                            <Button type="primary" icon={<EditOutlined />} style={{ borderRadius: 8, background: "#3b82f6", borderColor: "#3b82f6" }} onClick={() => setModalOpen(true)}>
                                                Edit Profile
                                            </Button>
                                        </Space>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 16,
                                            marginTop: 12,
                                            marginBottom: 20,
                                        }}
                                    >
                                        {[
                                            { icon: <StarFilled />, text: "Est. 2010", color: "#f59e0b" },
                                            { icon: <EnvironmentOutlined />, text: "Cityville, USA", color: "#3b82f6" },
                                            { icon: <TeamOutlined />, text: "1,248 Volunteers", color: "#10b981" },
                                        ].map((badge, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <span style={{ color: badge.color, fontSize: 14 }}>{badge.icon}</span>
                                                <Text style={{ color: "#475569", fontSize: 13 }}>{badge.text}</Text>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ width: "100%", height: 1, background: "#f1f5f9", marginBottom: 20 }} />

                                    <Title level={5} style={{ color: "#1e3a5f", marginBottom: 10 }}>About Them</Title>
                                    <Paragraph style={{ color: "#475569", lineHeight: 1.8, marginBottom: 6 }}>
                                        {expanded
                                            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud laborois nisl ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud laborois nisl ut aliquip ex ea commodo consequat."}
                                    </Paragraph>
                                    <Link onClick={() => setExpanded(!expanded)} style={{ color: "#3b82f6", fontWeight: 500 }}>
                                        {expanded ? "Read Less" : "Read More"}
                                    </Link>

                                    <div style={{ width: "100%", height: 1, background: "#f1f5f9", margin: "24px 0" }} />

                                    {/* Contact Info */}
                                    <Title level={5} style={{ color: "#1e3a5f", marginBottom: 16 }}>Contact Information</Title>
                                    <Row gutter={[16, 12]}>
                                        {[
                                            { icon: <EnvironmentOutlined />, label: "Address", value: "123 Hope Street, Cityville" },
                                            { icon: <PhoneOutlined />, label: "Phone", value: "+1 800-555-HELP" },
                                            { icon: <MailOutlined />, label: "Email", value: "contact@lighthouse.org" },
                                            { icon: <GlobalOutlined />, label: "Website", value: "www.communitylighthouse.org", link: true },
                                        ].map((c, i) => (
                                            <Col xs={24} sm={12} key={i}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 12,
                                                        padding: "10px 14px",
                                                        borderRadius: 10,
                                                        background: "#f8fafc",
                                                        border: "1px solid #e2e8f0",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 8,
                                                            background: "#eff6ff",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "#3b82f6",
                                                            fontSize: 16,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {c.icon}
                                                    </div>
                                                    <div>
                                                        <Text style={{ color: "#9ca3af", fontSize: 11, display: "block" }}>{c.label}</Text>
                                                        {c.link ? (
                                                            <Link href="#" style={{ color: "#3b82f6", fontSize: 13 }}>{c.value}</Link>
                                                        ) : (
                                                            <Text style={{ color: "#374151", fontSize: 13 }}>{c.value}</Text>
                                                        )}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card>

                                {/* Tabs — Donations / Events */}
                                <Card
                                    style={{
                                        borderRadius: 20,
                                        border: "1px solid #dbeafe",
                                        background: "white",
                                        boxShadow: "0 4px 20px rgba(59,130,246,0.07)",
                                    }}
                                    bodyStyle={{ padding: "0" }}
                                >
                                    <Tabs
                                        defaultActiveKey="1"
                                        style={{ padding: "0 24px" }}
                                        tabBarExtraContent={
                                            <Button size="small" type="primary" icon={<PlusOutlined />} style={{ borderRadius: 8, background: "#3b82f6" }}>
                                                Add New
                                            </Button>
                                        }
                                    >
                                        <TabPane tab="Recent Donations" key="1">
                                            <div style={{ padding: "0 0 24px" }}>
                                                <Table
                                                    columns={donorColumns}
                                                    dataSource={recentDonors}
                                                    pagination={false}
                                                    size="middle"
                                                    style={{ borderRadius: 12, overflow: "hidden" }}
                                                />
                                            </div>
                                        </TabPane>
                                        <TabPane tab="Upcoming Events" key="2">
                                            <div style={{ padding: "16px 0 24px" }}>
                                                <Timeline
                                                    items={upcomingEvents.map((e) => ({
                                                        color: e.color,
                                                        children: (
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <Text strong style={{ color: "#1e3a5f" }}>{e.event}</Text>
                                                                <Tag color="blue" style={{ borderRadius: 6 }}>
                                                                    <CalendarOutlined style={{ marginRight: 4 }} />
                                                                    {e.date}
                                                                </Tag>
                                                            </div>
                                                        ),
                                                    }))}
                                                />
                                            </div>
                                        </TabPane>
                                        <TabPane tab="Impact Goals" key="3">
                                            <div style={{ padding: "16px 0 24px" }}>
                                                {[
                                                    { label: "Food Distribution", value: 85, color: "#3b82f6" },
                                                    { label: "Housing Support", value: 62, color: "#10b981" },
                                                    { label: "Education Programs", value: 74, color: "#f59e0b" },
                                                    { label: "Healthcare Access", value: 48, color: "#8b5cf6" },
                                                ].map((g, i) => (
                                                    <div key={i} style={{ marginBottom: 18 }}>
                                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                                            <Text style={{ color: "#374151", fontSize: 14 }}>{g.label}</Text>
                                                            <Text style={{ color: g.color, fontWeight: 600 }}>{g.value}%</Text>
                                                        </div>
                                                        <Progress percent={g.value} strokeColor={g.color} trailColor="#f1f5f9" showInfo={false} />
                                                    </div>
                                                ))}
                                            </div>
                                        </TabPane>
                                    </Tabs>
                                </Card>
                            </Col>

                            {/* Right Column */}
                            <Col xs={24} lg={9}>

                                {/* Key Personnel */}
                                <Card
                                    style={{
                                        borderRadius: 20,
                                        border: "1px solid #dbeafe",
                                        background: "white",
                                        boxShadow: "0 4px 20px rgba(59,130,246,0.07)",
                                        marginBottom: 24,
                                    }}
                                    bodyStyle={{ padding: "24px" }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                        <Title level={5} style={{ margin: 0, color: "#1e3a5f" }}>Key Personnel</Title>
                                        <Button size="small" icon={<PlusOutlined />} style={{ borderRadius: 8, borderColor: "#dbeafe", color: "#3b82f6" }}>
                                            Add
                                        </Button>
                                    </div>
                                    <Space direction="vertical" style={{ width: "100%" }} size={16}>
                                        {personnel.map((p) => (
                                            <div
                                                key={p.name}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "12px 14px",
                                                    borderRadius: 14,
                                                    background: "#f8fafc",
                                                    border: "1px solid #e2e8f0",
                                                    transition: "box-shadow 0.2s",
                                                }}
                                            >
                                                <Badge
                                                    dot
                                                    color={p.status === "online" ? "#10b981" : p.status === "away" ? "#f59e0b" : "#94a3b8"}
                                                    offset={[-4, 36]}
                                                >
                                                    <Avatar src={p.avatar} size={48} style={{ border: "2px solid #dbeafe", flexShrink: 0 }} />
                                                </Badge>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <Text strong style={{ color: "#1e3a5f", display: "block", fontSize: 14 }}>{p.name}</Text>
                                                    <Text style={{ color: "#64748b", fontSize: 12 }}>{p.role}</Text>
                                                </div>
                                                <Space size={6}>
                                                    <Tooltip title={p.phone}>
                                                        <Button
                                                            size="small"
                                                            shape="circle"
                                                            icon={<PhoneOutlined />}
                                                            style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#3b82f6" }}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip title={p.email}>
                                                        <Button
                                                            size="small"
                                                            shape="circle"
                                                            icon={<MailOutlined />}
                                                            style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#3b82f6" }}
                                                        />
                                                    </Tooltip>
                                                </Space>
                                            </div>
                                        ))}
                                    </Space>
                                </Card>

                                {/* Official Documents */}
                                <Card
                                    style={{
                                        borderRadius: 20,
                                        border: "1px solid #dbeafe",
                                        background: "white",
                                        boxShadow: "0 4px 20px rgba(59,130,246,0.07)",
                                        marginBottom: 24,
                                    }}
                                    bodyStyle={{ padding: "24px" }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                        <Title level={5} style={{ margin: 0, color: "#1e3a5f" }}>Official Documents</Title>
                                        <Button size="small" icon={<PlusOutlined />} style={{ borderRadius: 8, borderColor: "#dbeafe", color: "#3b82f6" }}>
                                            Upload
                                        </Button>
                                    </div>
                                    <Space direction="vertical" style={{ width: "100%" }} size={10}>
                                        {documents.map((doc, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "10px 14px",
                                                    borderRadius: 12,
                                                    background: "#f8fafc",
                                                    border: "1px solid #e2e8f0",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 10,
                                                        background: doc.type === "pdf" ? "#fef2f2" : "#eff6ff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {doc.type === "pdf" ? (
                                                        <FilePdfOutlined style={{ fontSize: 20, color: "#ef4444" }} />
                                                    ) : (
                                                        <FileWordOutlined style={{ fontSize: 20, color: "#2563eb" }} />
                                                    )}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <Text style={{ color: "#374151", fontSize: 13, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {doc.name}
                                                    </Text>
                                                    <Text style={{ color: "#94a3b8", fontSize: 11 }}>
                                                        {doc.size} · {doc.date}
                                                    </Text>
                                                </div>
                                                <Space size={4}>
                                                    <Tooltip title="Preview">
                                                        <Button size="small" shape="circle" icon={<EyeOutlined />} style={{ color: "#64748b", border: "none", background: "transparent" }} />
                                                    </Tooltip>
                                                    <Tooltip title="Download">
                                                        <Button size="small" shape="circle" icon={<DownloadOutlined />} style={{ color: "#64748b", border: "none", background: "transparent" }} />
                                                    </Tooltip>
                                                </Space>
                                            </div>
                                        ))}
                                    </Space>
                                </Card>

                                {/* Activity Feed */}
                                <Card
                                    style={{
                                        borderRadius: 20,
                                        border: "1px solid #dbeafe",
                                        background: "white",
                                        boxShadow: "0 4px 20px rgba(59,130,246,0.07)",
                                    }}
                                    bodyStyle={{ padding: "24px" }}
                                >
                                    <Title level={5} style={{ margin: "0 0 20px", color: "#1e3a5f" }}>Recent Activity</Title>
                                    <Timeline
                                        items={[
                                            {
                                                dot: <CheckCircleOutlined style={{ color: "#10b981", fontSize: 14 }} />,
                                                children: (
                                                    <div>
                                                        <Text style={{ color: "#374151", fontSize: 13 }}>New volunteer registered: <Text strong>Alex Kim</Text></Text>
                                                        <Text style={{ color: "#94a3b8", fontSize: 11, display: "block" }}>2 hours ago</Text>
                                                    </div>
                                                ),
                                            },
                                            {
                                                dot: <HeartFilled style={{ color: "#ef4444", fontSize: 14 }} />,
                                                children: (
                                                    <div>
                                                        <Text style={{ color: "#374151", fontSize: 13 }}>Donation received: <Text strong style={{ color: "#10b981" }}>$1,200</Text></Text>
                                                        <Text style={{ color: "#94a3b8", fontSize: 11, display: "block" }}>5 hours ago</Text>
                                                    </div>
                                                ),
                                            },
                                            {
                                                dot: <CalendarOutlined style={{ color: "#3b82f6", fontSize: 14 }} />,
                                                children: (
                                                    <div>
                                                        <Text style={{ color: "#374151", fontSize: 13 }}>Event updated: <Text strong>Food Drive</Text></Text>
                                                        <Text style={{ color: "#94a3b8", fontSize: 11, display: "block" }}>Yesterday</Text>
                                                    </div>
                                                ),
                                            },
                                            {
                                                dot: <ClockCircleOutlined style={{ color: "#f59e0b", fontSize: 14 }} />,
                                                children: (
                                                    <div>
                                                        <Text style={{ color: "#374151", fontSize: 13 }}>Report submitted to board</Text>
                                                        <Text style={{ color: "#94a3b8", fontSize: 11, display: "block" }}>2 days ago</Text>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>

            {/* ─── Edit Profile Modal ─────────────────────────────── */}
            <Modal
                title="Edit Organization Profile"
                open={modalOpen}
                onOk={() => { setModalOpen(false); openNotif(); }}
                onCancel={() => setModalOpen(false)}
                okText="Save Changes"
                okButtonProps={{ style: { background: "#3b82f6", borderColor: "#3b82f6", borderRadius: 8 } }}
                cancelButtonProps={{ style: { borderRadius: 8 } }}
                width={560}
            >
                <Form layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item label="Organization Name">
                        <Input defaultValue="The Community Lighthouse" style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <Form.Item label="Tagline">
                        <Input defaultValue="Guiding light for a better future" style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Phone">
                                <Input defaultValue="+1 800-555-HELP" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email">
                                <Input defaultValue="contact@lighthouse.org" style={{ borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Category">
                        <Select defaultValue="ngo" style={{ borderRadius: 8 }}>
                            <Select.Option value="ngo">NGO</Select.Option>
                            <Select.Option value="charity">Charity</Select.Option>
                            <Select.Option value="foundation">Foundation</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Founded Date">
                        <DatePicker style={{ width: "100%", borderRadius: 8 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
}

export default HelpingHouseDashboard