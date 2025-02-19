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
import { useEffect, useState } from "react";
import Authentication from "../../pages/Authentication/Authentication";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../store/reducers/themeSlice";
import SearchBar from "../../components/SearchBar";
import { setUser } from "../../store/reducers/userSlice";
import SearchResultList from "../../components/SearchResultList";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartService from "../../services/CartService";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState("login");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, backgroundColor } = useSelector(
    (state: RootState) => state.theme
  );
  const { user } = useSelector((state: RootState) => state.user);
  const { cartClickCount } = useSelector((state: RootState) => state.cartCount);

  const getCartItemsCount = async () => {
    try {
      const response = await CartService.GetAllCartItems();
      setCartItemsCount(
        response.data.filter((item: any) => item.userId === user.id).length
      );
      console.log(
        response.data.filter((item: any) => item.userId === user.id).length,
        response.data.filter((item: any) => item.userId === user.id)
      );
    } catch (error) {
      console.error("Error fetching cart items Count:", error);
    }
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

  useEffect(() => {
    getCartItemsCount();
  }, [cartClickCount]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme === "light" ? "#2D2638" : "#E3DDFF",
          color: backgroundColor,
        }}>
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
              }}>
              SnapCart
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-hasAuthentication="true"
                onClick={handleOpenNavMenu}
                color="inherit">
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
                sx={{ display: { xs: "block", md: "none" } }}>
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
              }}>
              SnapCart
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleThemeToggle}
                sx={{ my: 2, color: "inherit", display: "block" }}>
                {theme}
              </Button>
              <Button
                onClick={() => navigate("/category")}
                sx={{ my: 2, color: "inherit", display: "block" }}>
                Categories
              </Button>
              <Button
                onClick={() => navigate("/favorites")}
                sx={{ my: 2, color: "inherit", display: "block" }}>
                Favourites
              </Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <SearchBar onSearch={setSearchQuery} />
            </Box>
            <Box
              style={{
                position: "fixed",
                zIndex: 100,
                top: 60,
                right: 0,
                left: 850,
                width: "80%",
              }}>
              {searchQuery && (
                <SearchResultList
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 0,
              }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  mr: 2,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/cart")}>
                <ShoppingCartIcon fontSize="large" />
                {cartItemsCount > 0 && (
                  <Button
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      transform: "translate(40%, -40%)",
                      borderRadius: "50%",
                      border: "1px solid white",
                      backgroundColor: "red",
                      color: "white",
                      minWidth: "20px",
                      height: "20px",
                    }}>
                    {cartItemsCount}
                  </Button>
                )}
              </Box>

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
                      dispatch(
                        setUser({
                          id: "",
                          username: "",
                          email: "",
                          address: [],
                          password: "",
                        })
                      )
                    }
                    sx={{ my: 2, color: "inherit", display: "block" }}>
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button
                  onClick={() => setOpen(true)}
                  sx={{ my: 2, color: "inherit", display: "block" }}>
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
