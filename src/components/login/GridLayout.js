import React from 'react';
import { Spin, Row, Col } from 'antd';

const GridLayout = ({ image, form, loading }) => (
  <div style={{ textAlign: 'center' }}>
    <Row justify="center" align="middle" className="login">
      <Col span={15}>
        {loading === true && (
          <Spin size="large" />
        )}
        {image}
        <br />
        {form}
      </Col>
    </Row>
  </div>
);

export default GridLayout;
