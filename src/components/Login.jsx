import React, { useContext, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import {
  Button,
  Paper,
  Typography,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff, Login } from "@mui/icons-material";

function LoginPage() {
  const { login, loading, error } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        width: 360,
        mx: "auto",
        mt: 10,
        borderRadius: 3,
        background: "linear-gradient(145deg, #ffffff, #f0f4ff)",
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        mb={3}
      >
      Admin Login
      </Typography>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Email Field */}
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="primary" />
            </InputAdornment>
          ),
        }}
      />

      {/* Password Field */}
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Login Button */}
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.2,
          fontWeight: "bold",
          borderRadius: 2,
        }}
        startIcon={!loading && <Login />}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </Paper>
  );
}

export default LoginPage;
