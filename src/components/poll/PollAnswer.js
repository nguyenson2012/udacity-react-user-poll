import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Typography, Progress, Tag, Button } from "antd";
import { styles } from "../../helper/colors";

const YourVote = () => (
  <Tag color="orange" className="vote" style={{ marginLeft: "5px" }}>
    Your Vote
  </Tag>
);

function PollAnswer({ history, question, user }) {
  const optOneVoteNumber = question.optionOne.votes.length;
  const optTwoVoteNumber = question.optionTwo.votes.length;
  const totalVote = optOneVoteNumber + optTwoVoteNumber;
  const userVote = user.answers[question.id];

  let option1 = styles.secondary,
    option2 = styles.secondary;
  if (optOneVoteNumber > optTwoVoteNumber) {
    option1 = styles.primary;
  } else if (optTwoVoteNumber > optOneVoteNumber) {
    option2 = styles.primary;
  }

  const clickBack = () => {
    history.push("/");
  };

  return (
    <div>
      <Typography level={3}>
        Results:
        <Typography style={{ fontWeight: "bold" }}>
          {" "}
          Would you rather
        </Typography>
      </Typography>
      <div
        style={{
          backgroundColor: option1.bgColor,
          padding: "8px",
          borderRadius: "4px",
        }}
      >
        {userVote === "optionOne" && <YourVote />}
        <Typography strong>{question.optionOne.text}</Typography>
        <Progress
          percent={((optOneVoteNumber / totalVote) * 100).toFixed(2)}
          strokeColor={option1.color}
          showInfo={false}
        />
        <Typography>
          {optTwoVoteNumber} out of {totalVote} votes
        </Typography>
      </div>
      <div
        style={{
          backgroundColor: option2.bgColor,
          padding: "8px",
          marginTop: "8px",
          borderRadius: "4px",
        }}
      >
        {userVote === "optionTwo" && <YourVote />}
        <Typography strong>{question.optionTwo.text}</Typography>
        <Progress
          percent={((optTwoVoteNumber / totalVote) * 100).toFixed(2)}
          strokeColor={option2.color}
          showInfo={false}
        />
        <Typography>
          {optTwoVoteNumber} out of {totalVote} votes
        </Typography>
      </div>
      <Button
        type="default"
        size="small"
        style={{ marginTop: "8px" }}
        onClick={clickBack}
      >
        Back
      </Button>
    </div>
  );
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(PollAnswer));
