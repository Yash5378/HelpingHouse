import { useState } from "react";
import {
    Layout,
    Input,
    Button,
    Typography,
    Row,
    Col,
    Tag,
    Badge,
    Select,
    Avatar,
    Tooltip,
    Empty,
    Pagination,
    Dropdown,
    Space,
} from "antd";
import {
    SearchOutlined,
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    HeartOutlined,
    HeartFilled,
    EyeOutlined,
    FilterOutlined,
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    StarFilled,
    CheckCircleFilled,
    GlobalOutlined,
    TeamOutlined,
    SortAscendingOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;


const houses = [
    {
        id: 1,
        name: "Paws & Hearts Shelter",
        type: "Dog Shelter",
        typeKey: "dog",
        tagColor: "#f59e0b",
        tagBg: "rgba(245,158,11,0.1)",
        emoji: "🐕",
        image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80",
        address: "45 Bark Avenue, Petville, CA 90210",
        email: "paws@heartshelter.org",
        phone: "+1 800-555-0201",
        website: "www.pawshearts.org",
        volunteers: 34,
        rating: 4.8,
        verified: true,
        description: "A safe haven for abandoned and rescued dogs. We provide medical care, training, and find forever homes for every pup.",
        needs: ["Food", "Blankets", "Vet Care"],
        founded: "2015",
    },
    {
        id: 2,
        name: "Silver Years Home",
        type: "Elder Care House",
        typeKey: "elder",
        tagColor: "#8b5cf6",
        tagBg: "rgba(139,92,246,0.1)",
        emoji: "👴",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80",
        address: "12 Maple Street, Sunridge, TX 78201",
        email: "care@silveryears.org",
        phone: "+1 800-555-0202",
        website: "www.silveryears.org",
        volunteers: 52,
        rating: 4.9,
        verified: true,
        description: "Dedicated to providing dignity, comfort, and community for seniors who need support and companionship in their golden years.",
        needs: ["Medicines", "Companionship", "Meals"],
        founded: "2010",
    },
    {
        id: 3,
        name: "Little Stars Orphanage",
        type: "Children's House",
        typeKey: "children",
        tagColor: "#ef4444",
        tagBg: "rgba(239,68,68,0.1)",
        emoji: "🧒",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
        address: "88 Hope Lane, Brightfield, NY 10001",
        email: "hello@littlestars.org",
        phone: "+1 800-555-0203",
        website: "www.littlestars.org",
        volunteers: 78,
        rating: 5.0,
        verified: true,
        description: "A loving home for children who need care, education, and the chance to dream big. Every child deserves a bright future.",
        needs: ["School Supplies", "Clothing", "Tutors"],
        founded: "2008",
    },
    {
        id: 4,
        name: "Green Paws Cat Rescue",
        type: "Cat Shelter",
        typeKey: "cat",
        tagColor: "#10b981",
        tagBg: "rgba(16,185,129,0.1)",
        emoji: "🐱",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
        address: "7 Whisker Way, Felineville, OR 97201",
        email: "meow@greenpaws.org",
        phone: "+1 800-555-0204",
        website: "www.greenpaws.org",
        volunteers: 21,
        rating: 4.6,
        verified: false,
        description: "Rescuing stray and abandoned cats across the city. We rehabilitate, vaccinate and rehome cats with loving families.",
        needs: ["Cat Food", "Litter", "Toys"],
        founded: "2018",
    },
    {
        id: 5,
        name: "New Dawn Women's Shelter",
        type: "Women's Shelter",
        typeKey: "women",
        tagColor: "#ec4899",
        tagBg: "rgba(236,72,153,0.1)",
        emoji: "🌸",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
        address: "33 Sunrise Blvd, Hopetown, FL 33101",
        email: "support@newdawn.org",
        phone: "+1 800-555-0205",
        website: "www.newdawn.org",
        volunteers: 44,
        rating: 4.7,
        verified: true,
        description: "A safe refuge for women and families escaping difficult situations. We provide shelter, counseling, and paths to independence.",
        needs: ["Hygiene Kits", "Legal Aid", "Childcare"],
        founded: "2012",
    },
    {
        id: 6,
        name: "Open Table Food Bank",
        type: "Food Bank",
        typeKey: "food",
        tagColor: "#f97316",
        tagBg: "rgba(249,115,22,0.1)",
        emoji: "🍱",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
        address: "100 Harvest Road, Grainsboro, IL 60601",
        email: "feed@opentable.org",
        phone: "+1 800-555-0206",
        website: "www.opentable.org",
        volunteers: 115,
        rating: 4.9,
        verified: true,
        description: "Fighting hunger one meal at a time. We distribute nutritious food to families, seniors, and children across the community.",
        needs: ["Non-perishables", "Volunteers", "Fridges"],
        founded: "2005",
    },
    {
        id: 7,
        name: "Veteran's Rest House",
        type: "Veterans' Home",
        typeKey: "veterans",
        tagColor: "#3b82f6",
        tagBg: "rgba(59,130,246,0.1)",
        emoji: "🎖️",
        image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&q=80",
        address: "21 Freedom Ave, Saluteville, VA 20101",
        email: "honor@veteransrest.org",
        phone: "+1 800-555-0207",
        website: "www.veteransrest.org",
        volunteers: 39,
        rating: 4.8,
        verified: true,
        description: "Providing housing, mental health support, and community to veterans who served our country and now need a hand up.",
        needs: ["Furniture", "Therapy", "Job Training"],
        founded: "2011",
    },
    {
        id: 8,
        name: "Butterfly Youth Centre",
        type: "Youth Center",
        typeKey: "youth",
        tagColor: "#06b6d4",
        tagBg: "rgba(6,182,212,0.1)",
        emoji: "🦋",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80",
        address: "56 Growth Street, Bloomfield, WA 98101",
        email: "grow@butterfly.org",
        phone: "+1 800-555-0208",
        website: "www.butterfly.org",
        volunteers: 63,
        rating: 4.7,
        verified: false,
        description: "Empowering at-risk youth through education, mentorship, arts, and sports programs. Building tomorrow's leaders today.",
        needs: ["Sports Gear", "Mentors", "Art Supplies"],
        founded: "2016",
    },
    {
        id: 9,
        name: "Harmony Disability House",
        type: "Disability Support",
        typeKey: "disability",
        tagColor: "#84cc16",
        tagBg: "rgba(132,204,22,0.1)",
        emoji: "♿",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
        address: "9 Inclusion Way, Equaltown, MN 55101",
        email: "harmony@disabilityhouse.org",
        phone: "+1 800-555-0209",
        website: "www.harmonyhouse.org",
        volunteers: 28,
        rating: 4.5,
        verified: true,
        description: "Supporting individuals with physical and cognitive disabilities through adaptive care, therapy, and community inclusion programs.",
        needs: ["Wheelchairs", "Therapists", "Equipment"],
        founded: "2014",
    },
];

const houseTypes = [
    { label: "All Types", value: "all" },
    { label: "Dog Shelter", value: "dog" },
    { label: "Cat Shelter", value: "cat" },
    { label: "Children's House", value: "children" },
    { label: "Elder Care", value: "elder" },
    { label: "Women's Shelter", value: "women" },
    { label: "Food Bank", value: "food" },
    { label: "Veterans' Home", value: "veterans" },
    { label: "Youth Center", value: "youth" },
    { label: "Disability Support", value: "disability" },
];

// ─── House Card Component ────────────────────────────────────
function HouseCard({ house, viewMode, onFavorite, isFavorite }) {
    const isGrid = viewMode === "grid";

    return (
        <div
            style={{
                background: "white",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(59,130,246,0.07), 0 1px 4px rgba(0,0,0,0.05)",
                border: "1px solid #e8f0fe",
                transition: "all 0.25s ease",
                display: isGrid ? "block" : "flex",
                cursor: "pointer",
                height: isGrid ? "auto" : "auto",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(59,130,246,0.14), 0 4px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(59,130,246,0.07), 0 1px 4px rgba(0,0,0,0.05)";
            }}
        >
            {/* Image */}
            <div
                style={{
                    position: "relative",
                    width: isGrid ? "100%" : 220,
                    minWidth: isGrid ? "auto" : 220,
                    height: isGrid ? 180 : "100%",
                    minHeight: isGrid ? "auto" : 160,
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <img
                    src={house.image}
                    alt={house.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Gradient overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 60%)",
                    }}
                />
                {/* Type badge */}
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: house.tagBg,
                        backdropFilter: "blur(8px)",
                        color: house.tagColor,
                        borderRadius: 20,
                        padding: "4px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        border: `1px solid ${house.tagColor}30`,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <span>{house.emoji}</span> {house.type}
                </div>
                {/* Favorite button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onFavorite(house.id); }}
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    {isFavorite
                        ? <HeartFilled style={{ color: "#ef4444", fontSize: 14 }} />
                        : <HeartOutlined style={{ color: "#94a3b8", fontSize: 14 }} />
                    }
                </button>
                {/* Rating pill at bottom of image */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 12,
                        background: "rgba(255,255,255,0.95)",
                        borderRadius: 10,
                        padding: "3px 8px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <StarFilled style={{ color: "#f59e0b", fontSize: 11 }} />
                    <Text style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f" }}>{house.rating}</Text>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
                {/* Name row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Text
                        style={{
                            fontWeight: 800,
                            fontSize: 15,
                            color: "#1e3a5f",
                            flex: 1,
                            lineHeight: 1.3,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {house.name}
                    </Text>
                    {house.verified && (
                        <Tooltip title="Verified Organization">
                            <CheckCircleFilled style={{ color: "#3b82f6", fontSize: 15, flexShrink: 0 }} />
                        </Tooltip>
                    )}
                </div>

                {/* Description */}
                <Text
                    style={{
                        color: "#64748b",
                        fontSize: 12.5,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: 14,
                    }}
                >
                    {house.description}
                </Text>

                {/* Info rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <EnvironmentOutlined style={{ color: "#3b82f6", fontSize: 12 }} />
                        </div>
                        <Text style={{ color: "#475569", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {house.address}
                        </Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <MailOutlined style={{ color: "#3b82f6", fontSize: 12 }} />
                        </div>
                        <Text style={{ color: "#475569", fontSize: 12 }}>{house.email}</Text>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 7, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <PhoneOutlined style={{ color: "#3b82f6", fontSize: 12 }} />
                        </div>
                        <Text style={{ color: "#475569", fontSize: 12 }}>{house.phone}</Text>
                    </div>
                </div>

                {/* Needs tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {house.needs.map((need, i) => (
                        <span
                            key={i}
                            style={{
                                background: "#f0f9ff",
                                color: "#0369a1",
                                border: "1px solid #bae6fd",
                                borderRadius: 8,
                                padding: "2px 9px",
                                fontSize: 11,
                                fontWeight: 500,
                            }}
                        >
                            {need}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 12,
                        borderTop: "1px solid #f1f5f9",
                        marginTop: "auto",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <TeamOutlined style={{ color: "#64748b", fontSize: 13 }} />
                        <Text style={{ color: "#64748b", fontSize: 12 }}>{house.volunteers} volunteers</Text>
                    </div>
                    <Button
                        type="primary"
                        size="small"
                        icon={<EyeOutlined />}
                        style={{
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                            border: "none",
                            fontWeight: 600,
                            fontSize: 12,
                            height: 30,
                            paddingInline: 14,
                            boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
                        }}
                    >
                        View
                    </Button>
                </div>
            </div>
        </div>
    );
}


export default function Home() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [favorites, setFavorites] = useState([]);
    const [sortBy, setSortBy] = useState("rating");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    // Filter + sort
    const filtered = houses
        .filter((h) => {
            const matchSearch =
                h.name.toLowerCase().includes(search.toLowerCase()) ||
                h.type.toLowerCase().includes(search.toLowerCase()) ||
                h.address.toLowerCase().includes(search.toLowerCase());
            const matchType = selectedType === "all" || h.typeKey === selectedType;
            return matchSearch && matchType;
        })
        .sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "volunteers") return b.volunteers - a.volunteers;
            if (sortBy === "name") return a.name.localeCompare(b.name);
            return 0;
        });

    const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const stats = [
        { label: "Helping Houses", value: houses.length, icon: "🏠", color: "#3b82f6" },
        { label: "Total Volunteers", value: houses.reduce((s, h) => s + h.volunteers, 0), icon: "🤝", color: "#10b981" },
        { label: "Verified Orgs", value: houses.filter((h) => h.verified).length, icon: "✅", color: "#8b5cf6" },
        { label: "Categories", value: houseTypes.length - 1, icon: "📂", color: "#f59e0b" },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 50%, #eff6ff 100%)",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
            }}
        >
            {/* ── Hero Banner ───────────────────────────────────── */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)",
                    padding: "50px 32px 60px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative blobs */}
                <div style={{ position: "absolute", top: -100, right: -100, width: 360, height: 360, borderRadius: "50%", background: "rgba(59,130,246,0.1)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -80, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(29,78,216,0.12)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "30%", left: "45%", width: 160, height: 160, borderRadius: "50%", background: "rgba(16,185,129,0.07)", pointerEvents: "none" }} />

                <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
                    {/* Logo row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                        {/* <div
                            style={{
                                width: 46,
                                height: 46,
                                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 14px rgba(59,130,246,0.55)",
                            }}
                        >
                            <HomeOutlined style={{ color: "white", fontSize: 22 }} />
                        </div> */}
                        {/* <div>
                            <Text style={{ color: "white", fontWeight: 700, fontSize: 16, display: "block", lineHeight: 1.1 }}>Helping House</Text>
                            <Text style={{ color: "#93c5fd", fontSize: 11 }}>Community Network</Text>
                        </div> */}
                        {/* <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                            <Button
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    color: "white",
                                    borderRadius: 10,
                                    fontWeight: 500,
                                    fontSize: 13,
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                type="primary"
                                style={{
                                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                    border: "none",
                                    borderRadius: 10,
                                    fontWeight: 600,
                                    fontSize: 13,
                                    boxShadow: "0 4px 12px rgba(59,130,246,0.45)",
                                }}
                            >
                                Register House
                            </Button>
                        </div> */}
                    </div>

                    {/* Headline */}
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        {/* <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                background: "rgba(59,130,246,0.15)",
                                color: "#93c5fd",
                                borderRadius: 20,
                                padding: "5px 16px",
                                fontSize: 12,
                                fontWeight: 600,
                                marginBottom: 18,
                                border: "1px solid rgba(59,130,246,0.25)",
                                letterSpacing: 0.5,
                            }}
                        >
                            ❤️ {houses.reduce((s, h) => s + h.volunteers, 0)}+ Volunteers Making a Difference
                        </div> */}
                        <Title
                            level={1}
                            style={{
                                color: "white",
                                margin: "0 0 14px",
                                fontWeight: 900,
                                fontSize: 44,
                                lineHeight: 1.15,
                                letterSpacing: -0.5,
                            }}
                        >
                            Find a Helping House<br />
                            <span style={{ color: "#93c5fd" }}>Near You</span>
                        </Title>
                        <Text style={{ color: "#cbd5e1", fontSize: 17, lineHeight: 1.7, display: "block", maxWidth: 520, margin: "0 auto" }}>
                            Connect with verified shelters, orphanages, elder homes, and community centers that need your support.
                        </Text>
                    </div>

                    {/* Search bar */}
                    <div
                        style={{
                            maxWidth: 680,
                            margin: "0 auto",
                            display: "flex",
                            gap: 10,
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(12px)",
                            borderRadius: 16,
                            padding: 8,
                            border: "1px solid rgba(255,255,255,0.15)",
                        }}
                    >
                        <Input
                            placeholder="Search by name, type, or location…"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            prefix={<SearchOutlined style={{ color: "#93c5fd", fontSize: 16 }} />}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontSize: 14,
                                height: 44,
                            }}
                            allowClear
                        />
                        <Button
                            type="primary"
                            style={{
                                height: 44,
                                paddingInline: 28,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                border: "none",
                                fontWeight: 700,
                                fontSize: 14,
                                boxShadow: "0 4px 14px rgba(59,130,246,0.5)",
                            }}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* ── Stats Row ─────────────────────────────────────── */}
            <div style={{ maxWidth: 1200, margin: "-36px auto 0", padding: "0 32px", position: "relative", zIndex: 10 }}>
                <Row gutter={[16, 16]}>
                    {stats.map((s, i) => (
                        <Col xs={12} sm={6} key={i}>
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 16,
                                    padding: "18px 20px",
                                    boxShadow: "0 4px 20px rgba(59,130,246,0.1), 0 1px 6px rgba(0,0,0,0.05)",
                                    border: "1px solid #e8f0fe",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        background: `${s.color}15`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20,
                                        flexShrink: 0,
                                    }}
                                >
                                    {s.icon}
                                </div>
                                <div>
                                    <Text style={{ color: "#0f172a", fontWeight: 800, fontSize: 22, display: "block", lineHeight: 1.1 }}>
                                        {s.value.toLocaleString()}
                                    </Text>
                                    <Text style={{ color: "#64748b", fontSize: 12 }}>{s.label}</Text>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* ── Main Content ──────────────────────────────────── */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px 60px" }}>

                {/* ── Filter + Sort bar ── */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 28,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Type filter chips */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
                        {houseTypes.slice(0, 6).map((t) => (
                            <button
                                key={t.value}
                                onClick={() => { setSelectedType(t.value); setCurrentPage(1); }}
                                style={{
                                    background: selectedType === t.value
                                        ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                                        : "white",
                                    color: selectedType === t.value ? "white" : "#475569",
                                    border: selectedType === t.value ? "none" : "1.5px solid #e2e8f0",
                                    borderRadius: 10,
                                    padding: "7px 16px",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    boxShadow: selectedType === t.value ? "0 4px 12px rgba(59,130,246,0.3)" : "0 1px 4px rgba(0,0,0,0.05)",
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                        <Select
                            value={selectedType}
                            onChange={(v) => { setSelectedType(v); setCurrentPage(1); }}
                            style={{ width: 140, borderRadius: 10 }}
                            size="middle"
                            placeholder="More types…"
                            options={houseTypes.slice(6)}
                        />
                    </div>

                    {/* Sort */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Select
                            value={sortBy}
                            onChange={setSortBy}
                            style={{ width: 150 }}
                            size="middle"
                            prefix={<SortAscendingOutlined />}
                            options={[
                                { label: "⭐ Top Rated", value: "rating" },
                                { label: "👥 Most Volunteers", value: "volunteers" },
                                { label: "🔤 Name A–Z", value: "name" },
                            ]}
                        />
                        {/* View toggle */}
                        <div
                            style={{
                                display: "flex",
                                background: "white",
                                borderRadius: 10,
                                border: "1.5px solid #e2e8f0",
                                overflow: "hidden",
                            }}
                        >
                            {[
                                { mode: "grid", icon: <AppstoreOutlined /> },
                                { mode: "list", icon: <BarsOutlined /> },
                            ].map(({ mode, icon }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    style={{
                                        background: viewMode === mode ? "#3b82f6" : "white",
                                        color: viewMode === mode ? "white" : "#64748b",
                                        border: "none",
                                        padding: "8px 14px",
                                        cursor: "pointer",
                                        fontSize: 16,
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Results count ── */}
                <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: "#64748b", fontSize: 14 }}>
                        Showing <Text strong style={{ color: "#1e3a5f" }}>{filtered.length}</Text> helping house{filtered.length !== 1 ? "s" : ""}
                        {selectedType !== "all" && (
                            <> in <Text strong style={{ color: "#3b82f6" }}>{houseTypes.find((t) => t.value === selectedType)?.label}</Text></>
                        )}
                    </Text>
                    {favorites.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <HeartFilled style={{ color: "#ef4444", fontSize: 13 }} />
                            <Text style={{ color: "#64748b", fontSize: 13 }}>{favorites.length} saved</Text>
                        </div>
                    )}
                </div>

                {/* ── Cards Grid / List ── */}
                {paginated.length === 0 ? (
                    <div
                        style={{
                            background: "white",
                            borderRadius: 20,
                            padding: "60px 24px",
                            textAlign: "center",
                            border: "1px solid #e8f0fe",
                        }}
                    >
                        <Empty
                            description={
                                <Text style={{ color: "#64748b", fontSize: 15 }}>
                                    No helping houses found for <Text strong>"{search}"</Text>
                                </Text>
                            }
                        />
                        <Button
                            style={{ marginTop: 16, borderRadius: 10, borderColor: "#3b82f6", color: "#3b82f6" }}
                            onClick={() => { setSearch(""); setSelectedType("all"); }}
                        >
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <>
                        {viewMode === "grid" ? (
                            <Row gutter={[20, 20]}>
                                {paginated.map((house) => (
                                    <Col xs={24} sm={12} lg={8} key={house.id}>
                                        <HouseCard
                                            house={house}
                                            viewMode="grid"
                                            onFavorite={toggleFavorite}
                                            isFavorite={favorites.includes(house.id)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {paginated.map((house) => (
                                    <HouseCard
                                        key={house.id}
                                        house={house}
                                        viewMode="list"
                                        onFavorite={toggleFavorite}
                                        isFavorite={favorites.includes(house.id)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {filtered.length > pageSize && (
                            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                                <Pagination
                                    current={currentPage}
                                    total={filtered.length}
                                    pageSize={pageSize}
                                    onChange={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                    showSizeChanger={false}
                                    style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ── Footer ─────────────────────────────────────────── */}
            <div
                style={{
                    background: "linear-gradient(135deg, #0f172a, #1e3a5f)",
                    padding: "40px 32px",
                    textAlign: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <HomeOutlined style={{ color: "white", fontSize: 16 }} />
                    </div>
                    <Text style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Helping House Network</Text>
                </div>
                <Text style={{ color: "#64748b", fontSize: 13 }}>
                    © 2026 Helping House. Made with ❤️ for communities everywhere.
                </Text>
            </div>
        </div>
    );
}