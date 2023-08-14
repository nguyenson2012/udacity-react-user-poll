import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { initData } from "./actions/shared";
import { connect } from "react-redux";
import LoginScreen from "./components/login/LoginScreen";
import NavBar from "./components/navigation/NavBar";
import Home from "./components/home/Home";
import UserBox from "./components/home/UserBox";
import AddPollScreen from "./components/add/AddPollScreen";
import LeaderboardScreen from "./components/leaderboard/LeaderboardScreen";
import NotFoundScreen from "./components/error/NotFoundScreen";

const App = ({ authUser, initData }) => {
  useEffect(() => {
    initData();
  }, [initData]);

  return (
    <Router>
      <Layout style={{ padding: "0 50px", marginTop: 64 }}>
        {authUser === null ? (
          <ContentGrid>
            <LoginScreen />
          </ContentGrid>
        ) : (
          <div>
            <NavBar />
            <ContentGrid>
              <Routes>
                <Route exact path="/" element={Home} />
                <Route path="/questions/bad_id" element={NotFoundScreen} />
                <Route path="/questions/:question_id" element={UserBox} />
                <Route path="/add" element={AddPollScreen} />
                <Route path="/leaderboard" element={LeaderboardScreen} />
                <Route element={NotFoundScreen} />
              </Routes>
            </ContentGrid>
          </div>
        )}
      </Layout>
    </Router>
  );
};

const ContentGrid = ({ children }) => (
  <Row justify="center">
    <Col xs={24} sm={20} md={16} lg={12} xl={8}>
      {children}
    </Col>
  </Row>
);

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { initData })(App);
