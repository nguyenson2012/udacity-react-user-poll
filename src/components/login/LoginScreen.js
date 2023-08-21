import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Image } from "antd";
import { setAuthUser } from "../../actions/authUser";
import Header from "./Header";
import GridLayout from "./GridLayout";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleLoading = () => {
    setLoading(true);
  };

  return (
    <div>
      <Layout>
        <Layout.Content>
          <div style={{ padding: "20px" }}>
            <Header />
            <GridLayout
              image={<Image src="/images/marvel.jpeg" preview={false} />}
              form={<LoginForm onLoading={handleLoading} />}
              loading={loading}
            />
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { setAuthUser })(LoginScreen);
