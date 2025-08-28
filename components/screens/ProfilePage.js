"use client";
import { Button, Box, Typography } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <Typography variant="h6">Please login to view profile</Typography>;
  }

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography>Name: John Doe</Typography>
      <Typography>Email: john@example.com</Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary">
          Edit Profile
        </Button>
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}
