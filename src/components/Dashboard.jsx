import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  Inventory,
  Category,
  Warning,
  CurrencyRupee,
} from "@mui/icons-material";
import { useContext } from "react";
import { ProductContext } from "../Context/ProductsContext";
import { CategoryContext } from "../Context/CategoryContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const { products } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const Navigate = useNavigate();
  /* ================================== */
  const totalInventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );
  ///////////////////////////////////////////////
  /* ================= GRAPH DATA ================= */

  // Total Revenue (simple monthly mock based on products)
  const revenueData = products.slice(0, 6).map((p, index) => ({
    name: `P${index + 1}`,
    revenue: p.price || 0,
  }));

  // Popular Products (Top 5 by price)
  const popularProductsData = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .map((p) => ({
      name: p.title.slice(0, 10),
      sold: p.price,
    }));

  //////////////////////////////////////////////
  const lowPriceProducts = products.filter((p) => p.price < 50);

  const recentProducts = products.slice(0, 5);
  const weeklyData = [
    { day: "Mon", value: 50 },
    { day: "Tue", value: 50 },
    { day: "Wed", value: 200 },
    { day: "Thu", value: 100 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 200 },
    { day: "Sun", value: 150 },
  ];

  const totalSales = products.reduce((sum, p) => sum + (p.price || 0), 0);

  const paymentData = [
    { name: "Bank Transfer", value: 30 },
    { name: "Credit Card", value: 70 },
  ];

  const COLORS = ["#6366f1", "#bfdbfe"];
  /* ============================================ */

  const cardStyle = {
    color: "#fff",
    borderRadius: 4,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 16px 30px rgba(0,0,0,0.25)",
    },
  };

  return (
    <>
      <Box sx={{ p: 3, marginTop: "100px", marginLeft: "50px" }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          📊 Dashboard Overview
        </Typography>

        {/* ================= KPI CARDS ================= */}
        <Grid container spacing={8}>
          {/* Total Products */}
          <Grid item xs={12} md={3}>
            <Card
              onClick={() => Navigate("/products")}
              sx={{
                ...cardStyle,
                background: "linear-gradient(135deg,#667eea,#764ba2)",
                width: "350px",
              }}
            >
              <CardContent>
                <Typography>Total Products</Typography>
                <Typography variant="h3">{products.length}</Typography>
                <Inventory sx={{ fontSize: 50, opacity: 0.7 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Total Categories */}
          <Grid item xs={12} md={3}>
            <Card
              onClick={() => Navigate("/category")}
              sx={{
                ...cardStyle,
                background: "linear-gradient(135deg,#43cea2,#185a9d)",
                width: "350px",
              }}
            >
              <CardContent>
                <Typography>Total Categories</Typography>
                <Typography variant="h3">{categories.length}</Typography>
                <Category sx={{ fontSize: 50, opacity: 0.7 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* 🔥 NEW: Inventory Value */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                ...cardStyle,
                background: "linear-gradient(135deg,#f7971e,#ffd200)",
                width: "350px",
              }}
            >
              <CardContent>
                <Typography>Total Inventory Value</Typography>
                <Typography variant="h3"> {totalInventoryValue}</Typography>
                <CurrencyRupee sx={{ fontSize: 50, opacity: 0.7 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* 🔥 NEW: Low Stock */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                ...cardStyle,
                background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
                width: "350px",
              }}
            >
              <CardContent>
                <Typography>Low Price Items</Typography>
                <Typography variant="h3">{lowPriceProducts.length}</Typography>
                <AttachMoneyIcon sx={{ fontSize: 50, opacity: 0.7 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* ================= CLEAN ANALYTICS SECTION ================= */}
        <Box mt={6}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            Analytics
          </Typography>

          <Grid container spacing={3}>
            {/* ===== Revenue Line ===== */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  width: "500px",
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  background: "linear-gradient(135deg, #ecfdf5, #ecfdf5)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography fontSize={13} color="text.secondary" mb={0.5}>
                    Revenue Overview
                  </Typography>
                  <Typography fontWeight={600} mb={2}>
                    Total Revenue
                  </Typography>

                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={revenueData}>
                      <CartesianGrid stroke="#f1f5f9" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        dataKey="revenue"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* ===== Popular Products ===== */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  width: "400px",
                  borderRadius: "20px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  background: "linear-gradient(135deg, #ecfdf5, #ecfdf5)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography fontSize={13} color="text.secondary" mb={0.5}>
                    Product Performance
                  </Typography>
                  <Typography fontWeight={600} mb={2}>
                    Popular Products
                  </Typography>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={popularProductsData}>
                      <CartesianGrid stroke="#f1f5f9" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="sold"
                        fill="#93c5fd"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* ////////////// */}
        <Card
          sx={{
            marginTop: "20px",
            borderRadius: "24px",
            backgroundColor: "#f8fafc",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {/* ===== LEFT SIDE ===== */}
              <Grid item xs={12} md={7}>
                <Typography variant="body2" color="text.secondary">
                  Weekly average new sales
                </Typography>

                <Typography variant="h5" fontWeight={700} mb={1}>
                  ₹{totalSales}
                </Typography>

                <Typography variant="body2" color="success.main" mb={3}>
                  ↑ +52.99% last 7 days
                </Typography>

                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>

              {/* ===== RIGHT SIDE ===== */}
              <Grid item xs={12} md={5}>
                <Typography fontWeight={600} mb={2}>
                  Monthly Sales
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  Average total sales +25.25%
                </Typography>

                <Box display="flex" justifyContent="center">
                  <PieChart width={220} height={220}>
                    <Pie
                      data={paymentData}
                      innerRadius={65}
                      outerRadius={90}
                      dataKey="value"
                    >
                      {paymentData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </Box>

                <Box textAlign="center" mt={-12}>
                  <Typography variant="body2" color="text.secondary">
                    Total
                  </Typography>
                  <Typography variant="p" fontWeight={100}>
                    ₹{totalSales}
                  </Typography>
                </Box>

                <Box mt={4}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">
                      <span style={{ color: "#6366f1" }}>●</span> Bank Transfer
                    </Typography>
                    <Typography variant="body2">30%</Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">
                      <span style={{ color: "#bfdbfe" }}>●</span> Credit Card
                    </Typography>
                    <Typography variant="body2">70%</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* ////////////// */}
        {/* ================= NEW: RECENT PRODUCTS ================= */}
        <Box mt={5}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            🕒 Recent Products
          </Typography>

          <Card
            sx={{
              borderRadius: "20px",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              {recentProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                  }}
                >
                  <Typography fontWeight={600}>{product.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹ {product.price} • {product.category?.name}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
}
