import "./ReviewList.css";
import Button from "./Button";
import ReviewItem from "./ReviewItem";

const ReviewList = () => {
  return (
    <div className="ReviewList">
      <div className="menu_bar">
        <select name="sort" id="sort">
          <option value={"latest"}>최신순</option>
          <option value={"horoscope"}>별점순</option>
        </select>
        <select name="category" id="category">
          <option value={"all"}>전체</option>
          <option value={"movies"}>영화</option>
          <option value={"books"}>도서</option>
        </select>
        <Button text={"새 리뷰 작성"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        <ReviewItem />
      </div>
    </div>
  );
};

export default ReviewList;
