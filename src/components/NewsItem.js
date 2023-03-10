import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let{title,description,imageUrl,redirect,publishedAt}=this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}...</p>
                            <h6 className="card-text">{publishedAt}</h6>
                            <a href={redirect} rel="noreferrer" target={'_blank'} className="btn btn-sm btn btn-primary">Read more</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
