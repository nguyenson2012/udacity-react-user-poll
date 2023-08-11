import React from "react";
import { Typography, Divider } from "antd";

const Header = () => (
  <div style={{ textAlign: "center" }}>
    <Typography level={4}>Welcome to the User Poll Management App!</Typography>
    <Typography>Please sign in to continue</Typography>
    <Divider />
  </div>
);

export default Header;
