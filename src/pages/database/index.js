import {
  EyeOutlined,
  FileOutlined,
  FolderOpenOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React from "react";
import folder from "../../assets/folders.jpg";
import Image from "next/image";

const Database = () => {
  return (
    <div className="mt-2 px-2">
      <div className="d-flex justify-content-between">
      <div className="text-primary">abinaya-m / Home (4 items)</div>
      <div className="d-flex align-items-center justify-content-end gap-3">
        <div className="text-center">
          <div>
            <UploadOutlined />
          </div>
          Upload
        </div>
        <div className="text-center">
          <div>
            <FolderOpenOutlined />
          </div>
          Add Folder
        </div>
        <div className="text-center">
          <div>
            <EyeOutlined />
          </div>
          Show Screen
        </div>
      </div>
      </div>
      <div className="row ">
        <div className="col-10 mt-5">
          <div className="d-flex justify-content-around">
            <div>
              <Image
                className="cursor-pointer ml-[3rem]"
                src={folder}
                width={150}
                height={150}
                alt="Folder"
                priority
              />
              <div>Parent Folder </div>
            </div>
            <div>
              <Image
                className="cursor-pointer ml-[3rem]"
                src={folder}
                width={150}
                height={150}
                alt="Folder"
                priority
              />
              <div>Experimental Groups</div>
            </div>
            <div>
              <Image
                className="cursor-pointer ml-[3rem]"
                src={folder}
                width={150}
                height={150}
                alt="Folder"
                priority
              />
              <div>Experiments</div>
            </div>
            <div>
              <Image
                className="cursor-pointer ml-[3rem]"
                src={folder}
                width={150}
                height={150}
                alt="Folder"
                priority
              />
              <div>Features</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mt-5">
          <div className="d-flex justify-content-around">
            <div>
              <Image
                className="cursor-pointer ml-[3rem]"
                src={folder}
                width={150}
                height={150}
                priority
                alt="Folder"
              />
              <div>Genome Groups</div>
            </div>
            <div>
              <Image
                className="cursor-pointer ml-[3rem]"
                src={folder}
                width={150}
                height={150}
                alt="Folder"
                priority
              />
              <div>Sample</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
