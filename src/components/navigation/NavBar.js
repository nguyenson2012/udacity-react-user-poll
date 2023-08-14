import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Image, Button, Row, Col } from "antd";
import { setAuthUser } from "../actions/authUser";

const NavBar = ({ authUser, users, setAuthUser }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    setAuthUser(null);
  };

  return (
    <div className="nav">
      <Row justify="space-between" align="middle">
        <Col>
          <Menu mode="horizontal" theme="dark">
            <Menu.Item key="home">
              <NavLink to="/" exact>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="new-poll">
              <NavLink to="/add">New Poll</NavLink>
            </Menu.Item>
            <Menu.Item key="leaderboard">
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col>
          <div className="user-info">
            <Image
              src={users[authUser].avatarURL}
              avatar
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
