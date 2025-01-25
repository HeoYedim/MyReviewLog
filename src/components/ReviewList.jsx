import "./ReviewList.css";
import Button from "./Button";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-dom";

const ReviewList = ({ data }) => {
  console.log("리뷰 리스트 데이터 확인: ", data);
  const nav = useNavigate();

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
        <Button
          onClick={() => nav("/new")}
          text={"새 리뷰 작성"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {data.length > 0 &&
          data.map((item) => (
            <ReviewItem
              key={item.id}
              id={item.id} // id 추가
              category={item.category}
              createdTitle={item.createdTitle}
              createdDate1={item.createdDate1 || ""}
              createdDate2={item.createdDate2 || ""}
              rating={item.rating}
              selectedGenres={item.selectedGenres}
              reviewSummary={item.reviewSummary}
            />
          ))}
      </div>
    </div>
  );
};

export default ReviewList;
