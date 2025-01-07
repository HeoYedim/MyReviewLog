import Button from "./Button";
import Category from "./Category";
import "./ReviewItem.css";

const ReviewItem = ({ category_type, title }) => {
  return (
    <div className="ReviewItem">
      <div className="img-edit_section">
        <div className="rectangle"></div>
        <Button text={"수정하기"} />
      </div>

      <div className="info_section">
        <div className="created_date">{new Date().toLocaleDateString()}</div>
        <div className="contentTitle_section">
          <Category type={category_type} />
          <span className="contentTitle">{title}</span>
        </div>
        <div className="content">
          <div className="star">
            <p>별점</p> ⭐️⭐️⭐️
          </div>
          <div className="genre">
            <p>장르</p> #로맨스/멜로
          </div>
          <div className="aLineReview">
            <p>한 줄 리뷰</p> 💡 어쩌구저쩌구
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
