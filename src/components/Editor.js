import React from 'react';
import E from 'wangeditor';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent:'',
         };
         
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     const { value } = nextProps;
    //     editor && editor.txt.html(value)
    //     return null;
    // }

    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu, elemBody);

        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.config.onchange = html => {
            this.setState({
                editorContent: editor.txt.html()
            })
            this.props.onChange(editor.txt.html());
        }
        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.config.uploadImgShowBase64 = true;
        editor.config.uploadFileName = 'file';
        editor.config.uploadImgServer = 'http://172.28.29.13:8080/portal/image/add_image'
        editor.config.uploadImgMaxLength = 1;
        editor.config.uploadImgHooks = {
            success: function(xhr) {
                console.log('success', xhr)
            },
            // 图片上传并返回了结果，但图片插入时出错了
            fail: function(xhr, editor, resData) {
                console.log('fail', resData)
            },
            // 上传图片出错，一般为 http 请求的错误
            error: function(xhr, editor, resData) {
                console.log('error', xhr, resData)
            },
            customInsert: function(insertImgFn, result) {
                // result 即服务端返回的接口
                const img = {
                    url: `http://172.28.29.13/images/group1/portal/${result.data.imageUrl}`,
                    alt: '',
                    href: 'www.baidu.com'
                }
                console.log('result', result)

                // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                insertImgFn(`http://172.28.29.13/images/group1/portal/${result.data.imageUrl}`)
            }
        }
        editor.create()
    };


    render() {
        return (
            <div className="shop">
                <div className="text-area" >
                    <div ref="editorElemMenu"
                         style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc"}}
                         className="editorElem-menu">

                    </div>
                    <div
                        style={{
                            padding:"0 10px",
                            overflowY:"scroll",
                            height:300,
                            border:"1px solid #ccc",
                            borderTop:"none"
                        }}
                        ref="editorElemBody" className="editorElem-body">
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;
