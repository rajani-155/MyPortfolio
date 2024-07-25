import React from "react";
import { List, ListItem, Link, SvgIcon, Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import data from "../../config/config";

const Footer = () => {
  return (
    <Box
      className="bg-nav"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "rgb(136, 146, 176)",
        textAlign: "center",
        height: "auto",
        minHeight: "70px",
        padding: "15px",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 0,
          "& *": {
            marginTop: 1,
            marginBottom: 1,
          },
        }}
      >
        {data.drawerButtons.map((drawerBtn) => (
          <ListItem
            button
            key={drawerBtn.iconName}
            component="a"
            target="_blank"
            href={drawerBtn.link}
          >
            {drawerBtn.iconName === "instagram" ? (
              <InstagramIcon sx={{ color: "#ffffff" }} fontSize="large" />
            ) : drawerBtn.iconName === "linkedin" ? (
              <LinkedInIcon sx={{ color: "#ffffff" }} fontSize="large" />
            ) : drawerBtn.iconName === "email" ? (
              <EmailIcon sx={{ color: "#ffffff" }} fontSize="large" />
            ) : (
              <SvgIcon>
                <path d={drawerBtn.svgPath} fill="#ffffff" />
              </SvgIcon>
            )}
          </ListItem>
        ))}
      </List>
      <Link
        href="https://github.com/rajani-155"
        target="_blank"
        rel="nofollow noopener noreferrer"
        sx={{
          textAlign: "center",
          textDecoration: "none", // Removes the underline
          color: "inherit", // Keeps the text color from the surrounding context
        }}
      >
        <div className="text-black text-xl">
          Designed & Built with by Rajani Shrestha
        </div>
      </Link>
    </Box>
  );
};

export default Footer;
