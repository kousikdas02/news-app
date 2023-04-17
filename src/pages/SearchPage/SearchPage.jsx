import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./SearchPage.scss"
import axios from "axios";

const SearchPage = () => {
  const [searchNews, setSearchNews] = useState([]);
  const [inputData, setInputData] = useState('');

  const search = async (e) => {
    const query = e.target.value;
    setInputData(query)
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=f2b86ca3d3ac43d689830404d4545385`)
    setSearchNews(response.data.articles)
  }
  useEffect(() => {
    search()
  }, []);

  console.log(searchNews)
  const newsPerRow = 9;
  const [loadMoreNews, setloadMoreNews] = useState(newsPerRow);
  const handleMoreImage = () => {
    setloadMoreNews(loadMoreNews + newsPerRow);
  };

  return (
    <>
      <div className='commonWpr'>
        <Container>
          <h1>Search News</h1>
          <div className='searchInput'>
            <input type='text' placeholder='Search News' onChange={search} />
          </div>

          <div className="showSearchText">
            {
              inputData.length > 0 &&
              <>
                <h3>You Searched : {inputData}</h3>
              </>
            }
          </div>

          <Row>
            {searchNews.length > 0 && searchNews.slice(0, loadMoreNews).map((newsData, index) => {
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
            {loadMoreNews < searchNews.length && (
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
  );
};

export default SearchPage;
