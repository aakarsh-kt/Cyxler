import React from "react";
import { Form, Input, Button, AutoComplete } from "antd";
import { options } from "./options.jsx";

export default function () {
  function onFinish(values) {
    console.log(values);
  }
  function onFinishFailed(values) {
    console.log(values);
  }
  return (
    <>
      <h3>Add an event</h3>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form--form"
      >
        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[
            { required: true, message: "Please input your Event's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            { required: true, message: "Please input your Event's location!" },
          ]}
        >
          <AutoComplete
            className="auto"
            options={options}
            id="standard-basic"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
        <Form.Item
          label="Duration(hrs)"
          name="duration"
          rules={[{ required: true, message: "Please input duration!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Mode"
          name="mode"
          rules={[{ required: true, message: "Please input mode!" }]}
        >

          <Input type="radio" />
          
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
