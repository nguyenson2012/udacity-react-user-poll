import React from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import UserBox from "./UserBox";

const Home = ({ questionData }) => {
  return (
    <Tabs
      centered
      type="card"
      items={new Array(2).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: id === "1" ? `Unanswered` : `Answered`,
          key: id,
          children:
            id === "1" ? (
              <div>
                {questionData.unanswered.map((question) => (
                  <UserBox
                    key={question.id}
                    question_id={question.id}
                    unanswered={id === "1" ? true : false}
                  />
                ))}
              </div>
            ) : (
              <div>
                {questionData.answered.map((question) => (
                  <UserBox
                    key={question.id}
                    question_id={question.id}
                    unanswered={id === "1" ? true : false}
                  />
                ))}
              </div>
            ),
        };
      })}
    />
  );
};

function mapStateToProps({ authUser, users, questions }) {
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    questionData: {
      answered,
      unanswered,
    },
  };
}

export default connect(mapStateToProps)(Home);
