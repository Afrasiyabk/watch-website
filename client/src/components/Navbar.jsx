import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { RiMenuFold3Fill} from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { Logout } from "../store/slices/auth";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";


import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { FaCartPlus, FaJediOrder, FaSignOutAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useEffect } from "react";


const Navbar = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);


   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className="sticky top-0 left-0 bg-[#222]  shadow-lg z-[100]">
      <div className=" nav-container pl-[50px]! pr-[50px]! flex flex-row items-center justify-between w-full h-[80px]">
        <Link to={"/"} className="flex items-center justify-center">
          <h4 id="logo" className=" logo text-5xl! text-amber-400!">
            Luxury
          </h4>
        </Link>
        <ul className="hidden md:flex flex-row items-center justify-center gap-10">
          <li className="hover:scale-110 duration-200">
            <NavLink
              className={`${
                location.pathname === "/" ? "text-amber-400" : "text-gray-500"
              } hover:text-amber-400 hover:scale-105! transition-all duration-150`}
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li className="hover:scale-110 duration-200">
            <NavLink
              className={`${
                location.pathname === "/products"
                  ? "text-amber-400"
                  : "text-gray-500"
              } hover:text-amber-400 hover:scale-105! transition-all duration-150`}
              to={"/products"}
            >
              Products
            </NavLink>
          </li>
          <li className="hover:scale-110 duration-200">
            <NavLink
              className={`${
                location.pathname === "/services"
                  ? "text-amber-400"
                  : "text-gray-500"
              } hover:text-amber-400 hover:scale-105! transition-all duration-150`}
              to={"/services"}
            >
              Services
            </NavLink>
          </li>
          <li className="hover:scale-110 duration-200">
            <NavLink
              className={`${
                location.pathname === "/blog"
                  ? "text-amber-400"
                  : "text-gray-500"
              } hover:text-amber-400 hover:scale-105! transition-all duration-150`}
              to={"/blog"}
            >
              Blog
            </NavLink>
          </li>
          <li className="hover:scale-110 duration-200">
            <NavLink
              className={`${
                location.pathname === "/contact"
                  ? "text-amber-400"
                  : "text-gray-500"
              } hover:text-amber-400 hover:scale-105! transition-all duration-150`}
              to={"/contact"}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:flex flex-row justify-center items-center gap-4">
          <SearchBar />
          {localStorage.getItem("token") ? (
            <>
              <button
                className="relative flex items-center justify-center p-4! bg-amber-400 rounded-full"
                onClick={() => {
                  setSearch(!search);
                }}
              >
                <Link className="flex" to={"/cart-page"}>
                  {cartItems?.length > 0 && (
                    <span className="absolute top-[-10px] left-0 text-sm rounded-full text-center justify-center text-white p-1! bg-black border border-gray-300 w-[30px] h-[30px]">
                      {cartItems?.length}
                    </span>
                  )}
                  <TiShoppingCart size={"20px"} />
                </Link>
              </button>
              <Box>
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar className="bg-amber-400!" sx={{ width: 50, height: 50 }}>
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem  onClick={ () => { handleClose(); navigate("/orders"); }}>
                <ListItemIcon>
                  <FaCartPlus fontSize={'20px'} />
                </ListItemIcon>
                   Orders
                </MenuItem>
                <Divider />
                <MenuItem onClick={ () => { handleClose(); Logout(); navigate("/login"); }}>
                  <ListItemIcon>
                    <FaSignOutAlt fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="btn-primary">Login</button>
              </Link>
              <Link to={"/signup"} className="flex! items-center! justify-center! btn-primary">
                SignUp
              </Link>
            </>
          )}
        </div>
        <div className="flex md:hidden">
          {active == false ? (
            <button
              onClick={() => setActive(true)}
              className={`flex flex items-center justify-center md:hidden bg-orange-400 p-5! w-[40px] h-[40px] rounded-full text-white`}
            >
              <RiMenuFold3Fill size={"20px"} />
            </button>
          ) : (
            <button
              onClick={() => setActive(false)}
              className={`flex flex items-center justify-center md:hidden bg-orange-400 p-5! w-[40px] h-[40px] rounded-full text-white`}
            >
              <IoClose size={"20px"} />
            </button>
          )}
        </div>

        {/* mobile res */}
        <div
          className={`absolute  ${active == true ? "visible" : "invisible"} top-[100%] transition-all duration-150 left-0 w-full bg-white p-5! rounded-lg shadow-lg md:hidden flex flex-col items-start justify-center gap-5 z-[15] border-t-1 border-gray-200`}
        >
          <NavLink
            onClick={() => setActive(false)}
            className={`${
              location.pathname === "/" ? "text-orange-400" : "text-gray-500"
            } hover:text-orange-400 transition-all duration-150`}
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setActive(false)}
            className={`${location.pathname === "/services" ? "text-orange-400" : "text-gray-700"} hover:text-orange-400 transition-all duration-150`}
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            onClick={() => setActive(false)}
            className={`${location.pathname === "/products" ? "text-orange-400" : "text-gray-500"} hover:text-orange-400 transition-all duration-150`}
            to={"/products"}
          >
            Products
          </NavLink>
          <NavLink
            onClick={() => setActive(false)}
            className={`${location.pathname === "/blog" ? "text-orange-400" : "text-gray-500"} hover:text-orange-400 transition-all duration-150`}
            to={"/blog"}
          >
            Blog
          </NavLink>
          <NavLink
            onClick={() => setActive(false)}
            className={`${location.pathname === "/contact" ? "text-orange-400" : "text-gray-500"} hover:text-orange-400 transition-all duration-150`}
            to={"/contact"}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
