import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Button, Row, Col, Image } from "antd";

import { setAuthUser } from "../../actions/authUser";

const NavBar = ({ authUser, users, setAuthUser }) => {
  console.log("NavBar", authUser, users);
  const handleLogout = (e) => {
    setAuthUser(null);
  };

  const items = [
    {
      label: "Home",
      key: "home",
      icon: <NavLink to="/" exact />,
    },
    {
      label: "New Poll",
      key: "new-poll",
      icon: <NavLink to="/add" />,
    },
    {
      label: "Leaderboard",
      key: "leaderboard",
      icon: <NavLink to="/leaderboard" />,
    },
  ];

  return (
    <div className="nav">
      <Row justify="space-between" align="middle">
        <Col>
          <Menu mode="horizontal" items={items} />
        </Col>
        <Col>
          <div className="user-info">
            <Image
              src={users[authUser].avatarURL}
              width={40}
              height={40}
              preview={false}
              style={{ marginRight: "8px" }}
            />
            <span>{users[authUser].name}</span>
            <Button
              type="link"
              size="small"
              onClick={handleLogout}
              style={{ marginLeft: "8px" }}
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthUser })(NavBar);
