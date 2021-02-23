import React from 'react'
import {API_IMG} from '../../env'
import './newsCard.css'

const Card = (props) => {
    const { id, title, imageUrl, author, articleSynopsis, onNewsEdit, onNewsDelete } = props;
    
    const url = `${API_IMG}/${imageUrl}`
    console.log('IMG_ROOT----', url)
    return (
        <div className="news_card">
            <img src={url} />
            <div className="card_content">
                <div className="title">{title}</div>
                <div className="author">{author}</div>
                <div className="articleSynopsis">简介：{articleSynopsis}</div>
                <div className="actions"><span onClick={() => onNewsEdit(id)}>编辑</span><span onClick={() => onNewsDelete(id)}>删除</span></div>  
            </div> 
        </div>
    )
}

export default Card;