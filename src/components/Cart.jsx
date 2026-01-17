import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function Cart() {
  ///////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleRemove = () => {
    removeItem(selectedId);
    handleClose();
  };

  ///////////////////////////////////////////////////////
  const { cartItem, removeItem, increment, decrement } =
    useContext(CartContext);

  const total = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* ===== Page Wrapper ===== */}
      <Box
        sx={{
          mt: "100px",
          maxWidth: 960,
          mx: "auto",
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={4}
          sx={{
            background: "linear-gradient(90deg,#4f46e5,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Shopping Cart
        </Typography>

        {cartItem.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary">
            🛒 Cart is empty
          </Typography>
        ) : (
          cartItem.map((p) => (
            <Card
              key={p.id}
              sx={{
                mb: 3,
                p: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: "22px",
                background: "linear-gradient(135deg,#ffffff,#f1f5f9)",
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: "0.35s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 22px 55px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* ===== Image ===== */}
              <CardMedia
                component="img"
                image={p.image}
                alt={p.title}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "18px",
                  objectFit: "cover",
                  background: "linear-gradient(135deg,#e0e7ff,#ede9fe)",
                }}
              />

              {/* ===== Content ===== */}
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="h6" fontWeight={700}>
                  {p.title}
                </Typography>

                <Typography variant="body2" sx={{ color: "#475569", mt: 0.5 }}>
                  ₹ {p.price} × {p.quantity}
                </Typography>

                <Divider sx={{ my: 1.2 }} />

                {/* ===== Quantity Controls ===== */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => decrement(p.id)}
                    sx={{
                      minWidth: 36,
                      borderRadius: "12px",
                      fontWeight: 700,
                      color: "#0f766e",
                      border: "1px solid #5eead4",
                      "&:hover": {
                        backgroundColor: "#ccfbf1",
                      },
                    }}
                  >
                    −
                  </Button>

                  <Typography
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "10px",
                      backgroundColor: "#ecfeff",
                      fontWeight: 700,
                    }}
                  >
                    {p.quantity}
                  </Typography>

                  <Button
                    size="small"
                    onClick={() => increment(p.id)}
                    sx={{
                      minWidth: 36,
                      borderRadius: "12px",
                      fontWeight: 700,
                      color: "#0f766e",
                      border: "1px solid #5eead4",
                      "&:hover": {
                        backgroundColor: "#ccfbf1",
                      },
                    }}
                  >
                    +
                  </Button>
                </Box>
              </CardContent>

              {/* ===== Remove Button ===== */}
              <Button
                onClick={() => handleOpen(p.id)}
                sx={{
                  px: 3,
                  borderRadius: "16px",
                  fontWeight: 700,
                  color: "#b91c1c",
                  background: "linear-gradient(135deg,#fee2e2,#fecaca)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#fecaca,#fca5a5)",
                  },
                }}
              >
                Remove
              </Button>
            </Card>
          ))
        )}
      </Box>

      {/* ===== Total Summary ===== */}
      {cartItem.length > 0 && (
        <Box
          sx={{
            maxWidth: 520,
            mx: "auto",
            my: 7,
            p: 4,
            borderRadius: "26px",
            textAlign: "center",
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "#ffffff",
            boxShadow: "0 30px 70px rgba(79,70,229,0.5)",
            transition: "0.35s",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 40px 90px rgba(79,70,229,0.65)",
            },
          }}
        >
          <Typography sx={{ opacity: 0.9, mb: 1 }}>💳 Total Payable</Typography>

          <Typography variant="h3" fontWeight={900} letterSpacing={1}>
            ₹ {total}
          </Typography>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            background: "linear-gradient(135deg,#ffffff,#f8fafc)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#1e293b" }}>
          Remove Item?
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to remove this item from your cart?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              color: "#475569",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleRemove}
            sx={{
              borderRadius: "12px",
              fontWeight: 700,
              color: "#ffffff",
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              "&:hover": {
                background: "linear-gradient(135deg,#dc2626,#b91c1c)",
              },
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
