import React, { Component } from "react";
import { Upload, Icon, message, Spin } from "antd";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

class UploadImg extends Component {
  state = {
    loading: false,
    imgUrl: ""
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imgUrl => {
        this.setState({
          loading: false,
          imgUrl
        });
        this.props.onImgChange(imgUrl);
      });
    }
  };

  render() {
    const { loading, imgUrl } = this.state;
    const { defaultImg } = this.props;
    const imageUrl = imgUrl || defaultImg;
    const uploadButton = (
      <div>
        <Icon type={loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Upload
        listType="picture-card"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        <Spin spinning={loading}>
          {imageUrl ? (
            <img src={imageUrl} alt="uploadImg" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Spin>
      </Upload>
    );
  }
}

export default UploadImg;
