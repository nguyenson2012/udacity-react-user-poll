import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Form, Radio, Button } from "antd";
import { handleSaveQuestionAnswer } from "../../actions/users";

const PollQuestion = ({ authUser, handleSaveQuestionAnswer, question }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    console.log("handleChange", e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit", value);
    if (value !== "") {
      handleSaveQuestionAnswer(authUser, question.id, value);
    }
  };

  const disabled = value === "";

  return (
    <div>
      <Typography level={4}>Would you rather</Typography>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Radio.Group name="radioGroup" onChange={handleChange} value={value}>
            <Radio value="optionOne">{question.optionOne.text}</Radio>
            <Radio value="optionTwo">{question.optionTwo.text}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="small"
            block
            htmlType="submit"
            disabled={disabled}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  PollQuestion
);
