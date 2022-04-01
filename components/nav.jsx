import React, { useState } from "react";
import NavStyle from "./nav.style";
import Link from "next/link";
import { useLanyard } from "react-use-lanyard";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

const LINKS = [
  {
    title: "Skills",
    href: "/skills",
  },
  {
    title: "Resume",
    href: "/resume",
  },
  {
    title: "Mail Me",
    href: "mailto:me@bravo68web.me",
  },
];

function Nav() {
  const { loading, status /*, websocket */ } = useLanyard({
    userId: "457039372009865226",
    socket: true,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavStyle>
      <Link href="/">
        <div className="title">
          <h1>echo &quot;Bravo&quot;</h1>
          <div className="indicator">
            <div
              className={`circle ${
                !loading &&
                (status?.discord_status === "online" ||
                  status?.discord_status === "idle" ||
                  status?.discord_status === "dnd")
                  ? "green"
                  : "red"
              }`}
            ></div>
          </div>
        </div>
      </Link>

      <div className="links">
        {LINKS.map(({ title, href }, index) => (
          <div key={index} className="link">
            <Link href={href}>{title}</Link> |
          </div>
        ))}
      </div>
      {/* Mobile Menu */}
      <div className={"menu"}>
        <IconButton
          id="nav-menu-button"
          aria-controls={open ? "nav-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "nav-menu-button",
          }}
        >
          {LINKS.map(({ title, href }, index) => (
            <MenuItem onClick={handleClose}>
              <Link href={href}>{title}</Link>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </NavStyle>
  );
}

export default Nav;
