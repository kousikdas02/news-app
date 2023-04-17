import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import ReactLoading from "react-loading";

const NewsTrending = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const BaseUrl =
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=f2b86ca3d3ac43d689830404d4545385";
  const getNewsData = async () => {
    try {
      const response = await axios.get(BaseUrl);
      setNews(response.data.articles);
    } catch (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    
  };

  useEffect(() => {
    getNewsData();
  }, []);

  console.log(news);
  const newsPerRow = 9;
  const [loadMoreNews, setloadMoreNews] = useState(newsPerRow);
  const handleMoreImage = () => {
    setloadMoreNews(loadMoreNews + newsPerRow);
  };
  return (
    <>
      {loading === true ? (
        <ReactLoading className="loader" type={"spin"} color={"black"} width={'100px'}/>
      ) : (
        <>
          <div className='commonWpr'>
            <Container>
              <Row>
                {news
                  ?.slice(0, loadMoreNews)
                  ?.map((newsData, index) => {
                    const [date, time] =
                      newsData.publishedAt.split("T");
                    const placeholderImage =
                      "http://via.placeholder.com/640x360";
                    return (
                      <>
                        <div
                          className='col-md-4 mt-3'
                          key={index}>
                          <div className='card'>
                            <div className='card-wrapper'>
                              <img
                                src={
                                  newsData.urlToImage
                                    ? newsData.urlToImage
                                    : placeholderImage
                                }
                                className='card-img-top img-fluid'
                                alt='...'
                              />
                            </div>
                            <div className='card-body'>
                              <div className=' cardInfo'>
                                <p className='text-muted authorName'>
                                  Author:{" "}
                                  {newsData.author
                                    ? newsData.author
                                    : "Unknown"}
                                </p>
                                <p className='text-muted'>
                                  Date:{date}
                                </p>
                                <p className='text-muted'>
                                  Time:{time}
                                </p>
                              </div>
                              <h5 className='card-title'>
                                {newsData.title.slice(
                                  0,
                                  35
                                )}
                                ...
                              </h5>
                              <p className='card-text'>
                                {newsData.description &&
                                  newsData.description.slice(
                                    0,
                                    55
                                  )}
                                ...
                              </p>
                              <a
                                href={
                                  newsData.url
                                }
                                className='btn btn-primary'>
                                READ MORE...
                              </a>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {loadMoreNews < news.length && (
                  <Button
                    className='mt-4 loadMore_btn'
                    onClick={handleMoreImage}>
                    Load more
                  </Button>
                )}
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  )
}

export default NewsTrending