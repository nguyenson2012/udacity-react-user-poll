import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Typography, Divider, Input, Button } from "antd";
import { handleSaveQuestion } from "../../actions/questions";

const AddPollScreen = ({ authUser, handleSaveQuestion }) => {
  const [submitValid, setSubmitValid] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "option1") {
      setOption1(value);
    } else if (id === "option2") {
      setOption2(value);
    }
  };

  const handleSubmit = (e) => {
    handleSaveQuestion(option1, option2, authUser);
    setOption1("");
    setOption2("");
    setSubmitValid(true);
  };

  const disabled = option1 === "" || option2 === "";

  if (submitValid === true) {
    return <Redirect to="/" />;
  }

  return (
    <Card title="Create a New Poll">
      <div>
        <Typography>Answer The Question Below:</Typography>
        <Typography>
          <strong>Would you rather </strong>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Input
            id="option1"
            placeholder="Enter option one..."
            value={option1}
            onChange={handleChange}
            required
          />
          <Divider>Or</Divider>
          <Input
            id="option2"
            placeholder="Enter option two..."
            value={option2}
            onChange={handleChange}
            required
          />
          <Button
            type="primary"
            size="small"
            block
            disabled={disabled}
            htmlType="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Card>
  );
};

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(AddPollScreen);
