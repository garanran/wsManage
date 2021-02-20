import React from 'react'
import request from '../../request';
import { List } from 'antd';
import Card from './newsCard';

class NewsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newsList: []
        }
    }
    componentDidMount() {
        request('article/get_article_list?limit=100&offset=0&articleTypeId=1')
        .then((data) => {
            const { list } = data;
            this.setState({ newsList: list })
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
                    renderItem={item => <Card {...item}/>}
                />
            </div>
        )
    }
}

export default NewsList;