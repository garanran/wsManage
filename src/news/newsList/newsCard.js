import React from 'react'
import './newsCard.scss'

const Card = (props) => {
    const { title, imageUrl, author, articleSynopsis } = props;
    return (
        <div className="news_card">
            <img src={imageUrl} />
            <div className="card_content">
                <div className="title">{title}</div>
                <div className="author">{author}</div>
                <div className="articleSynopsis">{articleSynopsis}</div>
            </div>   
        </div>
    )
}

export default Card;