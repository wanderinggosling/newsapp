import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:8,
        category:"general"
    }

    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8bbb29108843e6a1a6620af952c9c1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    handlePrevClick = async () => {
        console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8bbb29108843e6a1a6620af952c9c1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page - 1
        })
    }
    handleNextClick = async () => {
        console.log("next");
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c8bbb29108843e6a1a6620af952c9c1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({ articles: parsedData.articles })
            this.setState({
                page: this.state.page + 1
            })
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">News -Top headlines</h1>
              
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title.slice(0, 45)} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://media.hotnews.ro/media_server1/image-2022-06-23-25637907-0-masini-tesla.jpg"} redirect={element.url}></NewsItem>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
