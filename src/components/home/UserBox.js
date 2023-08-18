import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Divider, Row, Col, Typography, Image } from "antd";
import PollQuestion from "../poll/PollQuestion";
import PollAnswer from "../poll/PollAnswer";
import PollDemo from "../poll/PollDemo";
import { PollType } from "../../types/index";
import { setAuthUser } from "../../actions/authUser";

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case PollType.POLL_DEMO:
      return <PollDemo question={question} unanswered={unanswered} />;
    case PollType.POLL_QUESTION:
      return <PollQuestion question={question} />;
    case PollType.POLL_ANSWER:
      return <PollAnswer question={question} />;
    default:
      return null;
  }
};

const UserBox = ({ author, question, pollType, incorrectPath, unanswered }) => {
  if (incorrectPath === true) {
    setAuthUser(null);
    return <Redirect to="/questions/bad_id" />;
  }

  return (
    <Card bordered>
      <div>
        <Typography strong>{author.name} asks:</Typography>
      </div>
      <Divider />
      <Row gutter={[15, 15]}>
        <Col span={4}>
          <Image src={author.avatarURL} style={{ width: "100%" }} />
        </Col>
        <Col span={19}>
          <PollContent
            pollType={pollType}
            question={question}
            unanswered={unanswered}
          />
        </Col>
      </Row>
    </Card>
  );
};

function mapStateToProps(
  { users, questions, authUser },
  { match, question_id }
) {
  let question,
    author,
    pollType,
    incorrectPath = false;

  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = PollType.POLL_DEMO;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authUser];

    if (question === undefined) {
      incorrectPath = true;
    } else {
      author = users[question.author];
      pollType = PollType.POLL_QUESTION;
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = PollType.POLL_ANSWER;
      }
    }
  }

  return {
    incorrectPath,
    question,
    author,
    pollType,
  };
}

export default connect(mapStateToProps)(UserBox);
