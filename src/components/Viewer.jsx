import "./Viewer.css";
import Category from "./Category";
import { useState, useEffect } from "react";

import { fetchMoviePoster } from "../api/tmdb";
import { fetchBookCover } from "../api/googleBooks";

const Viewer = ({ data }) => {
  // movie poster api 관련
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    if (!data.createdTitle) return;

    const cachedImage = localStorage.getItem(
      data.category === "movie"
        ? `poster_${data.createdTitle}`
        : `cover_${data.createdTitle}`
    );

    if (cachedImage) {
      setPoster(cachedImage);
    } else {
      const fetchCover =
        data.category === "movie" ? fetchMoviePoster : fetchBookCover;
      fetchCover(data.createdTitle).then((image) => {
        if (image) {
          setPoster(image);
        }
      });
    }
  }, [data.category, data.createdTitle]);

  return (
    <div className="Viewer">
      <section className="img_info_section">
        <div className="img_rectangle">
          {poster ? (
            <img
              src={poster}
              alt={`${data.createdTitle} Poster`}
              className="poster-image"
            />
          ) : (
            <div className="placeholder">이미지 없음</div>
          )}
        </div>
        <div className="detail_info">
          <div className="viewer_title">
            <Category type={data.category} />{" "}
            <span className="contentTitle">{data.createdTitle}</span>
          </div>

          <div className="viewer_rating_section">
            별점 <p>{"★ ".repeat(data.rating)}</p>
          </div>
          <div className="viewer_genres_section">
            <p>장르</p>{" "}
            {data.selectedGenres
              .filter((genre) => genre) // 빈 값 제거
              .map((genre, index) => (
                <span key={index}>#{genre}</span>
              ))}
          </div>
        </div>
      </section>
      <section className="contents_section">
        <h4>한 줄 리뷰</h4>
        <div className="summary_wraper">
          <p>{data.reviewSummary || "한 줄 리뷰 미입력"}</p>
        </div>
        <h4>전체 리뷰</h4>
        <div className="details_wraper">
          <p>{data.reviewDetails ? data.reviewDetails : "전체 리뷰 미입력"}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
