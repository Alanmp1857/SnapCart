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
import AdbIcon from "@mui/icons-material/Adb";
import { useEffect, useRef, useState } from "react";
import Authentication from "../../pages/Authentication/Authentication";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../store/reducers/themeSlice";
import SearchBar from "../../components/SearchBar";
import { setUser } from "../../store/reducers/userSlice";
import SearchResultList from "../../components/SearchResultList";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MenuItem } from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Badge from "@mui/material/Badge";

function Header() {
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState("login");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchBarWidth, setSearchBarWidth] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.user);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  // For SearchBar Results Resize
  useEffect(() => {
    if (searchBarRef.current) {
      setSearchBarWidth(searchBarRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (searchBarRef.current) {
        setSearchBarWidth(searchBarRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme === "light" ? "#1976d2" : "black",
          // color: backgroundColor,
          color: "white",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                ml: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SnapCart
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
                {/* pending for optimization */}
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))} */}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                cursor: "pointer",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SnapCart
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => navigate("/category")}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Categories
              </Button>
              <Button
                onClick={() => navigate("/favorites")}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Favourites
              </Button>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ref={searchBarRef}
            >
              <SearchBar onSearch={setSearchQuery} />
            </Box>
            <Box
              sx={{
                position: "fixed",
                zIndex: 100,
                top: 60,
                right: 0,
                left: 650,
                width: searchBarWidth, // Dynamically set width
                minWidth: "70rem",
              }}
            >
              {searchQuery && (
                <SearchResultList
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </Box>
            <Box onClick={handleThemeToggle} sx={{ cursor: "pointer", mr: 2 }}>
              {theme === "light" ? (
                <LightModeIcon fontSize="large" />
              ) : (
                <DarkModeIcon fontSize="large" />
              )}
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 0,
              }}
            >
              <Badge
                badgeContent={user.cart?.length || 0}
                color="error"
                sx={{ mr: 2, cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              >
                <ShoppingCartIcon fontSize="large" />
              </Badge>

              {user.username ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="You">
                    <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleCloseUserMenu();
                      }}
                      sx={{
                        width: "150px",
                        borderBottom: 1,
                        boxShadow: "0px 0px 50px lightgray inset",
                      }}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/wallet");
                        handleCloseUserMenu();
                      }}
                      sx={{ width: "150px", borderBottom: 1 }}
                    >
                      Wallet
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/orders");
                        handleCloseUserMenu();
                      }}
                      sx={{ width: "150px", borderBottom: 1 }}
                    >
                      Orders
                    </MenuItem>
                    <MenuItem
                      sx={{
                        width: "150px",
                        color: "inherit",
                        display: "block",
                      }}
                      onClick={() => {
                        dispatch(
                          setUser({
                            id: "",
                            username: "",
                            email: "",
                            address: [],
                            password: "",
                          })
                        );
                        handleCloseUserMenu();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                  <Typography sx={{ ml: 1 }}>{user.username}</Typography>
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
