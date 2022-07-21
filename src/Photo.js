import React from "react";

const Photo = ({ myData }) => {
  return (
    <article className="photo">
      <img src={myData.photo} alt={myData.name} />
      <div className="photo-info">
        <div>
          <h4>{myData.name}</h4>
          <p>{myData.likes}</p>
        </div>
        <a href={myData.website}>
          <img src={myData.thumbnail} alt={myData.name} className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
