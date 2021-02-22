import React from 'react'
import request from '../../request';
import { List, message } from 'antd';
import Card from './newsCard';
import './newsList.css'

class NewsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newsList: []
        }
    }
    componentDidMount() {
        this.getNewsList()
    }

    getNewsList = () => {
        request('article/get_article_list?limit=100&offset=0&articleTypeId=1')
        .then((data) => {
            const { list } = data;
            this.setState({ newsList: list })
        }).catch(err => console.log(err))
    }

    handleNewsEdit = (id) => this.props.history.push(`/edit/${id}`);

    handleNewsDelete = (id) => {
        request('/article/del_article', {
            method: 'POST',
            body: { ids: [id] },
        })
        .then(() => {
            message.info('删除成功');
            this.getNewsList();
        }).catch(err => console.log(err))
    }

    render() {
        const { newsList } = this.state;
        return (
            <div className="news_list">
                <List
                    size="large"
                    header={<div>全部文章</div>}
                    footer={<div>新增</div>}
                    bordered
                    dataSource={newsList}
                    renderItem={item => <Card onNewsEdit={this.handleNewsEdit} onNewsDelete={this.handleNewsDelete} {...item}/>}
                />
            </div>
        )
    }
}

export default NewsList;