import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import Authentication from "../../pages/Authentication/Authentication";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../store/reducers/themeSlice";
import SearchBar from "../../components/SearchBar";
import { setUser } from "../../store/reducers/userSlice";

const pages = ["Dashboard", "Pricing", "Blog"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState("login");
  const dispatch = useDispatch();

  const { theme, backgroundColor } = useSelector(
    (state: RootState) => state.theme
  );
  const { user } = useSelector((state: RootState) => state.user);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleAuthChange = () => {
    setAuth((prevAuth) => (prevAuth === "signup" ? "login" : "signup")); // Toggle between "signup" and "login"
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {" "}
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme === "light" ? "#2D2638" : "#E3DDFF",
          color: backgroundColor,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                ml: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Snap Cart
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-hasAuthentication="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={handleThemeToggle}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                {theme}
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <SearchBar />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {user.username ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="You">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Typography sx={{ ml: 1 }}>{user.username}</Typography>
                  <Button
                    onClick={() =>
                      dispatch(setUser({ username: "", email: "" }))
                    }
                    sx={{ my: 2, color: "inherit", display: "block" }}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  onClick={() => setOpen(true)}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Authentication
        open={open}
        onClose={handleClose}
        auth={auth}
        setAuth={handleAuthChange}
      />
    </>
  );
}
export default Header;
