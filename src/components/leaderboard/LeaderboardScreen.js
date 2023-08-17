import React from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Avatar, Tag } from "antd";

const trophyColor = ["gold", "silver", "bronze"];

const LeaderboardScreen = ({ leaderboardData }) => {
  return (
    <div>
      {leaderboardData.map((user, idx) => (
        <Card key={user.id} bordered={false} style={{ marginBottom: "8px" }}>
          <Row gutter={[15, 15]}>
            <Col span={4} align="middle">
              <Avatar src={user.avatarURL} size={50} />
              <Tag
                color={trophyColor[idx]}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                {idx + 1}
              </Tag>
            </Col>
            <Col span={16}>
              <h3>{user.name}</h3>
              <div>Answered questions: {user.answerCount}</div>
              <div>Created questions: {user.questionCount}</div>
            </Col>
            <Col span={4} align="middle">
              <Card bordered={false}>
                <h5>Score</h5>
                <Tag color="green" style={{ fontSize: "18px" }}>
                  {user.questionCount + user.answerCount}
                </Tag>
              </Card>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3);
  return {
    leaderboardData,
  };
};

export default connect(mapStateToProps)(LeaderboardScreen);
