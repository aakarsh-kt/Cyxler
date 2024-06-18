import React from "react";
import { Form, Input, Button, AutoComplete } from "antd";
import { options } from "./options.jsx";

export default function (props) {
  function onFinish(values) {
    props.handleSubmit(values);
    console.log(values);
  }
  function onFinishFailed(values) {
    console.log(values);
  }
  return (
    <div>
     
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form--form"
      >
        <Form.Item
          label="Group Name"
          name="groupName"
          style={{color:"white"}}
          rules={[
            { required: true, message: "Please input your Group's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
       </Form>
    </div>
  );
}
