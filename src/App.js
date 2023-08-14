import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import LoginScreen from "./components/login/LoginScreen";
import NavBar from "./components/navigation/NavBar";
import Home from "./components/home/Home";
import UserBox from "./components/home/UserBox";
import AddPollScreen from "./components/add/AddPollScreen";
import LeaderboardScreen from "./components/leaderboard/LeaderboardScreen";
import NotFoundScreen from "./components/error/NotFoundScreen";

const App = ({ authUser, handleInitialData }) => {
  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);

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
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/questions/bad_id" component={NotFoundScreen} />
                <Route path="/questions/:question_id" component={UserBox} />
                <Route path="/add" component={AddPollScreen} />
                <Route path="/leaderboard" component={LeaderboardScreen} />
                <Route component={NotFoundScreen} />
              </Switch>
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

export default connect(mapStateToProps, { handleInitialData })(App);
