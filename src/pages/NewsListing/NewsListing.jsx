import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./NewsListing.scss"

const NewsListing = () => {
  const [news, setNews] = useState([]);
  const BaseUrl =
    "https://newsapi.org/v2/everything?q=india&apiKey=5bef830707fa4e92b4f4c390fb95dde7";
  const getNewsData = async () => {
    try {
      const response = await axios.get(BaseUrl);
      setNews(response.data.articles);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  console.log(news);

  return (
    <>
      <Container>
        <Row>
          {news.map((newsData, index) => {
            const [date, time] = newsData.publishedAt.split("T")
            const placeholderImage = "http://via.placeholder.com/640x360"
            return (
              <>
                <div className="col-md-4 mt-3" key={index}>
                  <div className="card">
                    <div className="card-wrapper">
                      <img
                        src={newsData.urlToImage ? newsData.urlToImage : placeholderImage}
                        className="card-img-top img-fluid"
                        alt="..."
                      />
                    </div>
                    <div className="card-body">
                      <div className=" cardInfo">
                        <p className="text-muted authorName">Author: {newsData.author ?  newsData.author : "Unknown"}</p>
                        <p className="text-muted">Date:{date}</p>
                        <p className="text-muted">Time:{time}</p>
                      </div>
                      <h5 className="card-title">
                        {newsData.title.slice(0, 40)}...
                      </h5>
                      <p className="card-text">
                        {newsData.description &&
                          newsData.description.slice(0, 55)}
                        ...
                      </p>
                      <a href={newsData.url} className="btn btn-primary">
                        READ MORE...
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default NewsListing;
