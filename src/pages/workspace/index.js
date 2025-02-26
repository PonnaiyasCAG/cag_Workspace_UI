import React from "react";
import {
  MoreOutlined,
  MenuOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import {
  Input, Button, FloatButton, Slider,
  Modal, Form, Dropdown, Space, Breadcrumb, Upload
} from 'antd';
const { Search } = Input;

import styles from '../../pages/styles.module.css'
import { useState } from "react";
import pdfImg from "../../assets/file_images/pdf.png";
import fileImg from "../../assets/file_images/file.png";
import htmlImg from "../../assets/file_images/html.png";
import textImg from "../../assets/file_images/text.png";
import zipImg from "../../assets/file_images/zip.png"
import Image from 'next/image';
import JSZip from "jszip";

const onSearch = (value, _e, info) => console.log(info?.source, value);

const WorkSpace = () => {

  // Workspace
  const [form] = Form.useForm();
  const [structure, setStructure] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);


  // const handleUploadFile = (file) => {
  //   setStructure((prev) => {
  //     const updated = [...prev];
  //     let current = getCurrentFolder(currentPath, updated);
  //     const fileUrl = URL.createObjectURL(file);
  //     current.push({ name: file.name, type: "file", originalType: file.type, url: fileUrl, });
  //     return updated;
  //   });
  // };

  // Upload Workspace File & Folder
  const handleUploadFile = (file) => {
    setStructure((prev) => {
      const updated = [...prev];
      let current = getCurrentFolder(currentPath, updated);
      const fileUrl = URL.createObjectURL(file);
      const pathParts = file.webkitRelativePath.split("/");

      if (pathParts.length > 1) {
        let folder = current;
        for (let i = 0; i < pathParts.length - 1; i++) {
          let folderName = pathParts[i];
          let existingFolder = folder.find(
            (item) => item.name === folderName && item.type === "folder"
          );
          if (!existingFolder) {
            existingFolder = { name: folderName, type: "folder", children: [] };
            folder.push(existingFolder);
          }
          folder = existingFolder.children;
        }
        const existingFile = folder.find((item) => item.name === file.name && item.type === "file");

        if (!existingFile) {
          folder.push({
            name: file.name,
            type: "file",
            originalType: file.type,
            url: fileUrl,
          });
        }
      } else {
        const existingFile = current.find((item) => item.name === file.name && item.type === "file");

        if (!existingFile) {
          current.push({
            name: file.name,
            type: "file",
            originalType: file.type,
            url: fileUrl,
          });
        }
      }

      return updated;
    });
  };

  const items = [
    {
      label: 'New Folder',
      value: 'newFolder',
      icon: <FolderOutlined />,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Upload beforeUpload={handleUploadFile} showUploadList={false}>
          File Upload
        </Upload>
      ),
      value: 'fileUpload',
      icon: <FileAddOutlined />,
      key: '1',
    },
    {
      label: (
        <Upload beforeUpload={handleUploadFile} showUploadList={false} directory>
          Floder Upload
        </Upload>
      ),
      value: 'folderUpload',
      icon: <FolderAddOutlined />,
      key: '3',
    },
  ];

  const getCurrentFolder = (path, files) => {
    return path.reduce((acc, folderName) => {
      return acc.find((f) => f.name === folderName && f.type === "folder")
        ?.children || [];
    }, files);
  };

  const handleNavigate = (folderName) => {
    setCurrentPath((prev) => [...prev, folderName]);
  };


  // Side menu for storage
  const [isOpen, setIsOpen] = useState(true);
  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  // Model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  // Dropdown
  const [selectLabel, setSelectLable] = useState("")
  const openList = (e) => {
    e.preventDefault();
  }

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem?.value === "newFolder") {
      setSelectLable(selectedItem?.label)
      showModal()
    }
  };

  // Add Folder Form
  const onFinish = (values) => {
    if (!values.newFolder) return;

    setStructure((prev) => {
      const updated = [...prev];
      let current = getCurrentFolder(currentPath, updated);
      current.push({ name: values.newFolder, type: "folder", children: [] });
      return updated;
    });
    setIsModalOpen(false);
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
  };

  // More Info
  const handleInfoClick = (e, file) => {
    const trimName = file.name.split('.')[0]
    if (e === "rename") {
      form.setFieldsValue({ newFolder: trimName })
      showModal()
    }
    if (e === "download" && file.type === "file") {
      downloadFile(file);
    }
    else if (e === "download" && file.type === "folder") downloadFolder(file);
  }
  // File Download
  const downloadFile = async (file) => {
    try {
      const response = await fetch(file.url);
      if (!response.ok) throw new Error("Failed to fetch file");
      const blob = await response.blob();
      const fileExtension = file.name?.split(".").pop();
      const mimeType = blob.type || getMimeType(fileExtension);
      const blobUrl = URL.createObjectURL(new Blob([blob], { type: mimeType }));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name || `download.${fileExtension || "bin"}`; // Default to 'bin' if unknown type
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const getMimeType = (extension) => {
    const mimeTypes = {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      txt: "text/plain",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      zip: "application/zip",
      rar: "application/x-rar-compressed",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      json: "application/json",
      csv: "text/csv",
    };

    return mimeTypes[extension] || "application/octet-stream"; // Default to 'octet-stream' for unknown types
  };

  //Folder Download 
  const downloadFolder = async (folder) => {
    const zip = new JSZip();
    const addFilesToZip = async (zipFolder, folderData) => {
      for (const item of folderData.children) {
        if (item.type === "folder") {
          const subFolder = zipFolder.folder(item.name);
          await addFilesToZip(subFolder, item);
        } else if (item.type === "file") {
          try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error(`Failed to fetch file: ${item.name}`);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            zipFolder.file(item.name, arrayBuffer);
          } catch (error) {
            console.error(`Error fetching file ${item.name}:`, error);
          }
        }
      }
    };
    // Start adding files to the ZIP
    await addFilesToZip(zip.folder(folder.name), folder);
    // Generate the ZIP file and trigger the download
    zip.generateAsync({ type: "blob" }).then((blob) => {
      const zipUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = `${folder.name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Cleanup
      URL.revokeObjectURL(zipUrl);
    });
  };

  const moreInfo = [
    {
      label: 'Rename',
      value: 'rename',
      icon: <EditOutlined />,
      key: '0',
    },
    {
      label: 'Download',
      value: 'download',
      icon: <DownloadOutlined />,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: 'Delete',
      value: 'delete',
      icon: <DeleteOutlined />,
      key: '3',
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`${styles.sidenav} ${isOpen ? `${styles.open}` : ""}`}>
        <div>
          {/* <span className={styles.closebtn} onClick={closeNav}>&times;</span> */}

          <div className={styles.sidenavcontent}>
            <div onClick={closeNav} className={styles.closebtn}>
              <MenuOutlined />
            </div>
            <span style={{ fontSize: '22px' }}>Work Station</span>
          </div>

          <div style={{ paddingTop: '2rem' }}>

            <div className={styles.historyMessage}>
              <span>Folder created Successfully</span>
              <div className={styles.dotIocn}><CheckCircleOutlined style={{ background: 'green', borderRadius: '50%', color: 'white' }} /></div>
            </div>

            <div className={styles.historyMessage}>
              <span>File Upload Successfully</span>
              <div className={styles.dotIocn}><CheckCircleOutlined style={{ background: 'green', borderRadius: '50%', color: 'white' }} /></div>
            </div>

            <div className={styles.historyMessage}>
              <span>File created Successfully</span>
              <div className={styles.dotIocn}><CheckCircleOutlined style={{ background: 'green', borderRadius: '50%', color: 'white' }} /></div>
            </div>
          </div>

        </div>
        <div style={{ marginBottom: "5rem" }} className={styles.logoutbtn}>Storage
          <div>  <Slider disabled defaultValue={50} />
          </div>
          <span>7.5 GB of 15 GB used</span>
        </div>

      </div>

      {/* Hide menu button when sidebar is open */}
      {/* {!isOpen && <span className={styles.menubtn} onClick={openNav}>☰ Menu</span>} */}
      {!isOpen && <div onClick={openNav} className={styles.menubtn}>
        <MenuOutlined />
      </div>}

      {/* Main Content */}
      <div id={styles.main} className={isOpen ? `${styles.shifted}` : ""}>
        <div>
          <div className="mt-2 px-2">
            <div className={styles.widthfull}>
              <Search className={styles.searchfield} placeholder="Search file here.." onSearch={onSearch} enterButton />
            </div>
            <div className="d-flex justify-content-between">
              <Breadcrumb
                separator=">"
                items={[
                  {
                    title: <span onClick={() => { setCurrentPath([]) }}
                      style={{ cursor: "pointer" }}>🏠 My Workspace</span>
                  },
                  ...currentPath.map((folder, index) => ({
                    title: (
                      <span
                        onClick={() => { setCurrentPath(currentPath.slice(0, index + 1)), console.log(index, 'cet index'); console.log(currentPath.slice(0, index + 1), 'new'); }}
                        style={{ cursor: "pointer" }}
                      >
                        {folder}
                      </span>
                    ),
                  })),
                ]}
              />
            </div>
            <div className="container-fluid pt-4">
              <div className="row g-4">
                {getCurrentFolder(currentPath, structure).map((item, index) => item.type == "folder" ? (
                  <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div className={styles.ZoOnRb} style={{
                      padding: "5px",
                      cursor: item.type === "folder" ? "pointer" : "default",
                      fontWeight: item.type === "folder" ? "bold" : "normal",
                    }}>
                      <div className={styles.RlzxUb} onClick={() => item.type === "folder" && handleNavigate(item.name)}>
                        <div className={styles.fileIcon}>{item.type === "folder" ? "📂" : "📄"}</div>
                      </div>
                      <div className={styles.hAkGVe} onClick={() => item.type === "folder" && handleNavigate(item.name)}>
                        <div className={styles.MxB3Nd}>{item.name}</div>
                      </div>
                      <div className={styles.K7P0Qd}>
                        <div className={styles.onHxhb}>
                          {/* {structure.map((folder) => ( */}
                          <span>
                            <Dropdown
                              menu={{
                                items: moreInfo.map((menuItem) => ({
                                  ...menuItem,
                                  onClick: () => handleInfoClick(menuItem.value, item),
                                })),
                              }}
                              trigger={["click"]}
                            >
                              <Button type="text" icon={<MoreOutlined />} />
                            </Dropdown>
                          </span>
                          {/* ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : '')}
              </div>

              {/* File Load */}
              <div className="row g-4 mt-4">
                {getCurrentFolder(currentPath, structure).map((item, index) => item.type == "file" ? (
                  <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                    <div className={styles.ZoOnRbCopy}>
                      <div className={styles.ZoOnRbFile} style={{
                        padding: "5px",
                        cursor: item.type === "folder" ? "pointer" : "default",
                        fontWeight: item.type === "folder" ? "bold" : "normal",
                      }}>
                        <div className={styles.RlzxUb} onClick={() => item.type === "folder" && handleNavigate(item.name)}>
                          <div className={styles.fileIcon}>{item.type === "folder" ? "📂" : "📄"}</div>
                        </div>
                        <div className={styles.hAkGVe}>
                          <div className={styles.fileTitle}> {item.name}</div>
                        </div>
                        <div className={styles.K7P0Qd}>
                          <div className={styles.onHxhb}>
                            <span>
                              <Dropdown
                                menu={{
                                  items: moreInfo.map((menuItem) => ({
                                    ...menuItem,
                                    onClick: () => handleInfoClick(menuItem.value, item),
                                  })),
                                }}
                                trigger={["click"]}
                              >
                                <Button type="text" icon={<MoreOutlined />} />
                              </Dropdown>

                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <Image
                          className='cursor-pointer ml-[3rem]'
                          src={item.originalType == "application/pdf" ? pdfImg :
                            item.originalType == "text/html" ? htmlImg :
                              item.originalType == "text/plain" ? textImg :
                                item.originalType == "application/x-zip-compressed" ? zipImg : fileImg}
                          width={100}
                          height={100}
                          style={{ borderRadius: '10px' }}
                          alt="Picture of the author"
                          priority
                        />
                        <div className={styles.fileDetails}>
                          {/* <div className={styles.fileTitle}>Rechal's Resumecopy.pdf</div> */}
                          <div className={styles.fileMeta}> <UserOutlined className={styles.userIcon} /> You modified • Jan 7, 2025</div>

                        </div>
                      </div>
                    </div>
                  </div>
                ) : '')}
              </div>
            </div>
            <div id={styles.main1} className={isOpen ? `${styles.shifted}` : ""}>
              <FloatButton.Group
                shape="circle"
                style={{ insetInlineEnd: isOpen ? 260 : 24 }}
              >
                <FloatButton icon={<ArrowDownOutlined />} />

                <Dropdown
                  menu={{
                    items,
                    onClick: handleMenuClick,
                  }}
                  trigger={['click']}
                >
                  <a onClick={openList}>
                    <Space>
                      <FloatButton icon={<PlusOutlined />} />
                    </Space>
                  </a>
                </Dropdown>
              </FloatButton.Group>
            </div>

            {/* Model Folder Adding */}
            <div>
              <Modal title={selectLabel || ""} open={isModalOpen} onOk={() => handleOk} onCancel={handleCancel} maskClosable={false} footer={null}>
                <Form form={form}
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
                    name="newFolder"
                    rules={[
                      {
                        required: true,
                        message: 'New Folder',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <div style={{ textAlign: 'end' }}>

                    <Form.Item label={null}>
                      <Button style={{ marginRight: '5px' }} onClick={handleCancel} htmlType="button">
                        Cancel
                      </Button>

                      <Button type="primary" htmlType="submit">
                        Create
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
            </div>

          </div>
        </div>

      </div>

    </>
  )
}

export default WorkSpace

{/* <div className="col-lg-2 4" col-xxl-1>
                  <div className={styles.folderDiv}>
                    <div className={styles.innerFile}>
                      <span className={styles.fileIcon}><FolderFilled /></span>
                      <span className={styles.folderName}>Sudhan</span>
                    </div>
                    <Tooltip placement="bottom" title="More action">
                      <Button type="text" icon={<MoreOutlined />}></Button>
                    </Tooltip>
                  </div>
                </div> */}

{/* <div className="col-lg-2 col-md-6">
                <div className={styles.folderDiv}>
                  <div className={styles.innerFile}>
                    <span className={styles.fileIcon}><FolderFilled /></span>
                    <span className={styles.folderName}>Sudhan</span>
                  </div>
                  <Tooltip placement="bottom" title="More action">
                    <Button type="text" icon={<MoreOutlined />}></Button>
                  </Tooltip>
                </div>
              </div> */}

// BreadCrumbs
// const [breadcrumbItems, setbreadcrumbItems] = useState([
//   {
//     title: 'My Workspace'
//   }
// ])

// const handleBreadcrumbClick = (index) => {
//   setbreadcrumbItems((prev) => prev.slice(0, index + 1))
//   setCurrentPath((prev) => prev.slice(0, index + 1));
// }