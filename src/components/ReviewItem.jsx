import Button from "./Button";
import Category from "./Category";
import "./ReviewItem.css";
import { useNavigate } from "react-router-dom";

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
  console.log("ReviewItem에서 받은 날짜:", createdDate1, createdDate2);

  const formatDate = (date) => {
    if (!date) return "날짜 없음";
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString()
      : "날짜 없음";
  };

  return (
    <div className="ReviewItem">
      <div className="img-edit_section">
        <div className="rectangle" onClick={() => nav(`/review/${id}`)}></div>
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div>

      <div className="info_section" onClick={() => nav(`/review/${id}`)}>
        <div className="created_date">
          {formatDate(createdDate1)} ~ {formatDate(createdDate2)}
        </div>
        <div className="contentTitle_section">
          <Category type={category} />
          <span className="contentTitle">{createdTitle}</span>
        </div>
        <div className="content">
          <div className="star">
            <p>별점</p> {rating}
          </div>
          <div className="genre">
            <p>장르</p>{" "}
            {selectedGenres.length > 0
              ? selectedGenres.join(", ")
              : "장르 없음"}
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
