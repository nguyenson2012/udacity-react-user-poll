import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Typography, Button } from "antd";
import { colors } from "../../helper/colors";

const PollDemo = ({ question, unanswered }) => {
  const [viewPoll, setViewPoll] = useState(false);

  const handleClick = () => {
    setViewPoll((prevViewPoll) => !prevViewPoll);
  };

  const buttonColor = unanswered === true ? colors.green : colors.blue;
  const buttonContent = unanswered === true ? "Poll Available" : "Results";

  if (viewPoll) {
    return <Redirect push to={`/questions/${question.id}`} />;
  }

  return (
    <div>
      <Typography strong style={{ textAlign: "left" }}>
        Would you rather
      </Typography>
      <p style={{ textAlign: "center" }}>
        {question.optionOne.text}
        <br />
        or...
      </p>
      <Button
        type="primary"
        style={{ backgroundColor: buttonColor.hex }}
        size="small"
        block
        onClick={handleClick}
      >
        {buttonContent}
      </Button>
    </div>
  );
};

export default PollDemo;
