import React from "react";
import { Typography } from "antd";

const NotFoundScreen = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography level={3}>Not Found</Typography>
      <Typography>Please try again.</Typography>
    </div>
  );
};

export default NotFoundScreen;
