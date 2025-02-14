import Button from "./Button";
import Category from "./Category";
import "./ReviewItem.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchMoviePoster } from "../api/tmdb";
import { fetchBookCover } from "../api/googleBooks";

const ReviewItem = ({
  id,
  category,
  createdTitle,
  createdDate1,
  createdDate2,
  rating,
  selectedGenres,
  reviewSummary,
}) => {
  const nav = useNavigate();
  // console.log("ReviewItem에서 받은 날짜:", createdDate1, createdDate2);

  // movie poster api 관련
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    // console.log("ReviewItem.jsx - createdTitle:", createdTitle);
    // console.log("ReviewItem.jsx - category:", category);

    if (!createdTitle) return;

    // 1️. localStorage에서 먼저 확인
    const cachedImage = localStorage.getItem(
      category === "movie" ? `poster_${createdTitle}` : `cover_${createdTitle}`
    );

    if (cachedImage) {
      setPoster(cachedImage);
    } else {
      // 2️. API 호출 후 이미지 가져오고, localStorage에 저장
      const fetchCover =
        category === "movie" ? fetchMoviePoster : fetchBookCover;
      fetchCover(createdTitle).then((image) => {
        if (image) {
          // console.log("ReviewItem.jsx - 가져온 표지 url:".image);
          setPoster(image);
        }
      });
    }
  }, [category, createdTitle]);

  const formatDate = (date) => {
    if (!date) return "날짜 없음";
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "날짜 없음";

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // 월을 2자리로
    const day = String(parsedDate.getDate()).padStart(2, "0"); // 일을 2자리로

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="ReviewItem">
      <div className="img-edit_section">
        <div className="rectangle" onClick={() => nav(`/review/${id}`)}>
          {poster ? (
            <img
              src={poster}
              alt={`${createdTitle} Poster`}
              className="poster-image"
            />
          ) : (
            <div className="placeholder">이미지 없음</div>
          )}
        </div>
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div>

      <div className="info_section" onClick={() => nav(`/review/${id}`)}>
        <div className="created_date">
          {formatDate(createdDate1) === formatDate(createdDate2)
            ? formatDate(createdDate1)
            : `${formatDate(createdDate1)} ~ ${formatDate(createdDate2)}`}
        </div>
        <div className="contentTitle_section">
          <Category type={category} />
          <span className="contentTitle">{createdTitle}</span>
        </div>
        <div className="content">
          <div className="rating">
            <p>별점</p>
            <div className="star">{"★ ".repeat(rating)}</div>
          </div>
          <div className="genre">
            <p>장르</p>{" "}
            {selectedGenres.filter((genre) => genre).length > 0 ? (
              selectedGenres
                .filter((genre) => genre) // 빈 값 제거
                .map((genre, index) => <span key={index}>#{genre}</span>)
            ) : (
              <span>장르 미추가</span>
            )}
          </div>
          <div className="aLineReview">
            <p>한 줄 리뷰</p> 💡 {reviewSummary}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
