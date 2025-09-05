"use client";
import { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import ButtonComp from "@components/ButtonComp";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import ChangePasswordModal from "@components/auth/ChangePasswordModal";
import AppDrawer from "../AppDrawer";

export default function ProfileDrawer({ open, onClose }) {
  const { colors } = useTheme();
  const { t: tAuth } = useTranslation("auth");
  const { user, logout } = useAuth();

  const [showChangePassword, setShowChangePassword] = useState(false);

  if (!user) return null;

  return (
    <>
      <AppDrawer open={open} onClose={onClose} width={340} height="100%">
        <Box
          sx={{
            width: { xs: 280, sm: 340 },
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
          }}
        >
          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
            <Avatar
              sx={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
                mr: 2,
              }}
            >
              {user.name?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.subtitle }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: colors.border }} />

          {/* Actions */}
          <Box sx={{ p: 3, mt: "auto" }}>
            <ButtonComp
              label={tAuth("changePassword")}
              onClick={() => setShowChangePassword(true)}
            />

            <ButtonComp label={tAuth("logout")} onClick={logout} />
          </Box>
        </Box>
      </AppDrawer>

      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}
