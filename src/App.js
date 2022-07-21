import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const pageUrl = "&page=";
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

// const clientID = `?client_id=${process.env.REACT_APP_API_KEY}`;

const clientID = `?client_id=xjFBX-XckAzqAYJBheiT3-pZ6btvZtLWpbt57mBBckU`;

function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const [newValue, setNewValue] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const fetchData = async () => {
    let url;

    try {
      if (!query) {
        url = `${mainUrl}${clientID}${pageUrl}${pageNumber}`;
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setPhotos((prevData) => {
          return [...prevData, ...data];
        });
      }

      if (query && !newValue) {
        url = `${searchUrl}${clientID}${pageUrl}${pageNumber}&query=${query}`;
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        if (data.results.length === 0) {
          setIsInvalid(true);
        } else {
          setIsInvalid(false);
        }
        setPhotos((prevData) => {
          return [...prevData, ...data.results];
        });
      }

      if (newValue) {
        url = `${searchUrl}${clientID}${pageUrl}${pageNumber}&query=${query}`;
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        if (data.results.length === 0) {
          setIsInvalid(true);
        } else {
          setIsInvalid(false);
        }
        setPhotos((prevData) => {
          return [...data.results];
        });
        setNewValue(false);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pageNumber]);

  useEffect(() => {
    const windowEvent = window.addEventListener("scroll", () => {
      console.log("scrolling");
      console.log(`Window innerHeight : ${window.innerHeight}`);
      console.log(`Length Scrolled : ${window.scrollY}`);
      console.log(`Body overall Lenght ${document.body.scrollHeight}`);

      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        console.log("Your scrolled to the end of the page");
        setPageNumber((prev) => prev + 1);
      }
    });
    return () => {
      window.removeEventListener("scroll", windowEvent);
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    } else {
      setPageNumber((prev) => {
        if (prev === 1) {
          return 2;
        } else {
          return 1;
        }
      });
      fetchData();
      setNewValue(true);
    }
  };

  return (
    <main>
      <section className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button className="submit-btn" type="submit">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photoData, index) => {
            const { urls, user, likes, id } = photoData;
            const { name, profile_image, social } = user;
            const { medium } = profile_image;
            const { regular } = urls;
            const { portfolio_url } = social;
            let photo = regular;
            let thumbnail = medium;
            let website = portfolio_url;

            let myData = { id, likes, name, photo, thumbnail, website };
            return <Photo key={index} myData={myData} />;
          })}
        </div>
        {isLoading && <h2 className="loading">Loading...</h2>}
        {isInvalid && (
          <h2 className="loading">
            Your Search Item was not Valid. Please try again.
          </h2>
        )}
      </section>
    </main>
  );
}

export default App;
