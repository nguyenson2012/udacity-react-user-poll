import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Typography, Button, Select, Spin } from "antd";
import { setAuthUser } from "../../actions/authUser";

const { Option } = Select;

const LoginForm = ({ onLoading, setAuthUser, users }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit", value);
    const authUser = value;

    setLoading(true);
    setTimeout(() => {
      setAuthUser(authUser);
      setLoading(false);
    }, 500);
  };

  const getDropdownData = () => {
    return users.map((user) => (
      <Option key={user.id} value={user.id}>
        {user.name}
      </Option>
    ));
  };

  const disabled = value === "";

  return (
    <Form onFinish={handleSubmit}>
      <Typography level={2} style={{ color: "green" }}>
        Sign In
      </Typography>
      <Form.Item>
        <Select
          placeholder="Select a character"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={value}
          onChange={onChange}
          required
        >
          {getDropdownData()}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={disabled} block>
          {loading ? <Spin /> : "Login"}
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users),
});

export default connect(mapStateToProps, { setAuthUser })(LoginForm);
