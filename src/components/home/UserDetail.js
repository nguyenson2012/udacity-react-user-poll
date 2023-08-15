import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { Card, Divider, Row, Col, Typography } from "antd";
import PollQuestion from "../poll/PollQuestion";
import PollAnswer from "../poll/PollAnswer";
import PollDemo from "../poll/PollDemo";

const { Text } = Typography;

const pollTypes = {
  POLL_DEMO: "POLL_DEMO",
  POLL_QUESTION: "POLL_QUESTION",
  POLL_ANSWER: "POLL_ANSWER",
};

const PollContent = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case pollTypes.POLL_DEMO:
      return <PollDemo question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <PollQuestion question={question} />;
    case pollTypes.POLL_ANSWER:
      return <PollAnswer question={question} />;
    default:
      return null;
  }
};

const UserDetail = () => {
  const { question_id } = useParams();
  const { author, question, pollType, incorrectPath, unanswered } = useSelector(
    (state) => {
      const users = state.users;
      const questions = state.questions;
      const authUser = state.authUser;
      console.log(question_id, users, questions);
      let question,
        author,
        pollType,
        incorrectPath = false;

      question = questions[question_id];
      const user = users[authUser];

      if (question === undefined) {
        incorrectPath = true;
      } else {
        author = users[question.author];
        pollType = pollTypes.POLL_QUESTION;
        if (Object.keys(user.answers).includes(question.id)) {
          pollType = pollTypes.POLL_ANSWER;
        }
      }

      return {
        incorrectPath,
        question,
        author,
        pollType,
      };
    }
  );

  if (incorrectPath === true) {
    return <Navigate to="/questions/bad_id" />;
  }

  return (
    <Card bordered>
      <div>
        <Text strong>{author.name} asks:</Text>
      </div>
      <Divider />
      <Row gutter={[15, 15]}>
        <Col span={4}>
          <img
            src={author.avatarURL}
            alt="User Avatar"
            style={{ width: "100%" }}
          />
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

export default UserDetail;