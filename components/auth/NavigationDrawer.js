"use client";
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import AppDrawer from "@/components/AppDrawer";

export default function NavigationDrawer({
  open,
  onClose,
  navItems,
  guestActions,
}) {
  const { isLoggedIn } = useAuth();
  const { colors } = useTheme();

  const renderNavLinks = () =>
    navItems.map((item) => (
      <ListItemButton
        key={item.key}
        component={Link}
        href={item.href}
        onClick={onClose}
        sx={{
          "&:hover .MuiListItemText-primary": { color: colors.accent },
        }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ sx: { color: colors.text } }}
        />
      </ListItemButton>
    ));

  const renderGuestActions = () =>
    guestActions.map((item) => (
      <ListItemButton
        key={item.key}
        onClick={() => {
          item.onClick();
          onClose();
        }}
        sx={{
          cursor: "pointer",
          "&:hover .MuiListItemText-primary": { color: colors.accent },
        }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ sx: { color: colors.text } }}
        />
      </ListItemButton>
    ));

  return (
    <AppDrawer open={open} onClose={onClose} width={280} anchor="left">
      <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
        {/* Nav Links */}
        <List>{renderNavLinks()}</List>

        {/* Guest Actions (if not logged in) */}
        {!isLoggedIn && <List>{renderGuestActions()}</List>}

        {/* Footer */}
        <Divider sx={{ borderColor: colors.border, mt: 1, mb: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: 3,
          }}
        >
          <ThemeToggle />
          <LanguageToggle />
        </Box>
      </Box>
    </AppDrawer>
  );
}
