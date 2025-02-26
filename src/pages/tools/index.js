import { Button, Form, Input, Radio, Select, Table } from "antd";
import React, { useState } from "react";
import { FileOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Tools = () => {
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState("Single");
  const columns = [
    {
      title: "Sample Id",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Files",
      dataIndex: "files",
      key: "files",
    },
    {
      title: "Condition",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "34rh78",
      files: <FileOutlined />,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "8rfy678",
      files: <FileOutlined />,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "tgb7788",
      files: <FileOutlined />,
      address: "Sydney No. 1 Lake Park",
    },
  ];
  const trimOptions = {
    Single: [
      { value: "fast", label: "NanoPlot" },
      { value: "unique", label: "FlitLong" },
    ],
    Paired: [
      { value: "cell", label: "Cell Adopt" },
      { value: "trimmatic", label: "Trimmatic" },
    ],
  };

  const options = [
    { label: "Single", value: "Single" },
    { label: "Paired", value: "Paired" },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mt-3 px-2">
      <div
        className="row"
        style={{
          marginTop: "15px",
          width: "100%",
          borderBottom: "1px solid gray",
          height: "70px",
        }}
      >
        <div className="col-12">
          Let start with entrance as its as simple as it sounds. These are
          the products that belong on the front door the entrance to the home.
          They will primarily take the format of handles for houses and levers
          for apartments, but are not limited to one of the two. In some cases,
          knobs can also be an entrance function. An entrance set also has a
          lock and requires a key to unlock from the outside. Whether or not you
          need a key to unlock from the inside depends on whether it is a single
          or double-cylinder lock. Moving onto the passfiles, it is used for
          doors that dont have locking as a requirement. It has a latch but no
          lock. This could be for general areas such as hallways, laundry rooms
          or closet walk-ins.
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <h2
            className="mt-3"
            style={{ borderRight: "1px solid gray", height: "60vh" }}
          >
            Tool Preference
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <Radio.Group
                  block
                  options={options}
                  value={radioValue}
                  onChange={(e) => setRadioValue(e.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                />
              </div>
            </div>
            <div className="mt-4">
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Reference"
                  name="refer"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Select
                    placeholder="hg38"
                    options={[
                      { value: "hg38", label: "hg38" },
                      { value: "hg37", label: "hg37" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="QC"
                  name="qc"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select the QC type"
                    options={[
                      { value: "fast", label: "fastqc" },
                      { value: "unique", label: "multiqc" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Trimming"
                  name="trim"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Trimmming"
                    options={trimOptions[radioValue]}
                  />
                </Form.Item>

                <Form.Item
                  label="Mapping"
                  name="mapping"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Mapping"
                    options={[
                      { value: "fast", label: "Histat2" },
                      { value: "unique", label: "Star" },
                      { value: "unique", label: "Tophat2" },
                      { value: "unique", label: "Bowkie 2" },
                      { value: "unique", label: "Salmon" },
                      { value: "unique", label: "Kallikso" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Qualifiers"
                  name="Select"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Qualifiers"
                    options={[
                      { value: "unique", label: "Salmon" },
                      { value: "unique", label: "Kallikso" },
                      { value: "unique", label: "Feadure counts" },
                      { value: "unique", label: "Htseq" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Diff gen"
                  name="gen"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Select
                    options={[
                      { value: "fast", label: "Edge R" },
                      { value: "unique", label: "Deseq 2" },
                    ]}
                    placeholder="Select Gen"
                  />
                </Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </h2>
        </div>
        <div className="col-6">
          <h2 className="mt-3">Sample Details</h2>
          <div className="mt-4 ">
            <div className="mt-5">
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="No of Samples "
                  name="refer"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Input placeholder="Enter the count" />
                </Form.Item>
                <Form.Item
                  label="Sample Id "
                  name="refer"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Input placeholder="Enter the Sample id " />
                </Form.Item>
                <Form.Item
                  label="File "
                  name="refer"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Input placeholder="Enter the File  " />
                </Form.Item>
                <Form.Item
                  label="Condition "
                  name="refer"
                  rules={[
                    {
                      required: true,
                      messfiles: "Please input!",
                    },
                  ]}
                >
                  <Input placeholder="Enter the Condition " />
                </Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
              <Table columns={columns} dataSource={data} pagination={false} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <h2>Comparison Details</h2>
        </div>
        <div className="col-6">
          <label>CONDITION 1:</label>
          <Input placeholder="Enter the Condition 1" />
        </div>
        <div className="col-6">
          <label>CONDITION 2:</label>
          <div className="d-flex gap-2">
            <Input placeholder="Enter the Condition 2" />
            <PlusCircleOutlined className="lead" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
