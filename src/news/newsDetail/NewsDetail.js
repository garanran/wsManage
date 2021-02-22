import React from 'react'
import request from '../../request';
import { Form, Input, Button, Upload, message,Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Editor from '../../components/Editor'
import './newsDetail.css'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

class NewsDetail extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        request(`/article/get_article_info?id=${this.props.match.params.id}`)
        .then((data) => {
            const { title, author, articleSynopsis, content, imageUrl } = data
            this.formRef.current.setFieldsValue({
                title,
                author,
                articleSynopsis,
                content,
            })
            this.setState({
                imageUrl,
            })
        }).catch(err => console.log(err))
    }

    handleChange = info => {
        console.log('info----', info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const { data: { imageID } } = info.file.response;
            this.setState({ imageID })
            console.log('imageID---', imageID)
        }
    };

    uploadMedia = (componentsData) => {
        console.log('componentsData', componentsData)
        const formData = new FormData();
        formData.append('file', componentsData);

        request('/image/add_image', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => data.data)
        .then(data=> componentsData.onSuccess())
        // .then(data => {
        //     this.setState({ imageId: data.imageID })
        //     // return data
        // })
        .catch(err => console.log(err))
    }

    onFinish = (values) => {
        // this.formRef.current.resetFields();
        const allData = {
            ...values,
            imageId: this.state.imageId,
        }
        console.log('allData----', allData)
      };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          );
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
          };
        const tailLayout = {
        wrapperCol: { offset: 4, span: 8 },
        };

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        };
        return (
            <Form
                {...layout}
                ref={this.formRef}
                className="news_detail"
                onFinish={this.onFinish}>
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="作者"
                    name="author"
                    rules={[{ required: true, message: 'Please input author!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="图片"
                    name="imageUrl"
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action='http://172.28.29.13:8080/portal/image/add_image'
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="简介"
                    name="articleSynopsis"
                    rules={[{ required: true, message: 'Please input articleSynopsis!' }]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    label="内容"
                    name="content"
                    rules={[{ required: true, message: 'Please input content!' }]}
                >
                    <Editor />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default NewsDetail;