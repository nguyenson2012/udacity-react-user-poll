import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Typography, Button, Select, Spin } from "antd";
import { setAuthUser } from "../../actions/authUser";

const { Option } = Select;

const LoginForm = ({ setAuthUser, users }) => {
  const [value, setValue] = useState("");
  const [isShowError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setValue("");
      setShowError(false);
      setLoading(false);
    };
  }, []);

  const onChange = (newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    if (value === "") {
      setShowError(true);
    } else {
      console.log("handleSubmit", value);
      const authUser = value;

      setAuthUser(authUser);
    }
  };

  const getDropdownData = () => {
    return users.map((user) => (
      <Option key={user.id} value={user.id}>
        {user.name}
      </Option>
    ));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Typography level={2} style={{ color: "green" }}>
        Sign In
      </Typography>
      <Form.Item>
        <Select
          data-testid="user-select"
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
        <Button
          data-testid="submit-button"
          type="primary"
          htmlType="submit"
          block
        >
          {loading ? <Spin /> : "Login"}
        </Button>
      </Form.Item>
      {isShowError && (
        <Typography data-testid="error-text" level={1} style={{ color: "red" }}>
          Need Choose User!
        </Typography>
      )}
    </Form>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users),
});

export default connect(mapStateToProps, { setAuthUser })(LoginForm);
