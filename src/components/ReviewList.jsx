import "./ReviewList.css";
import Button from "./Button";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ReviewList = ({ data }) => {
  // console.log("리뷰 리스트 데이터 확인: ", data);
  const nav = useNavigate();

  const [sortCriteria, setSortCriteria] = useState("latest"); // 기본값: 최신순

  // 정렬 함수
  const getSortedData = () => {
    let sortedData = [...data];

    if (sortCriteria === "latest") {
      sortedData.sort(
        (a, b) => new Date(b.createdDate1) - new Date(a.createdDate1)
      );
    } else if (sortCriteria === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
    }

    return sortedData;
  };

  return (
    <div className="ReviewList">
      <div className="menu_bar">
        <select
          name="sort"
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
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
        {getSortedData().length > 0 &&
          getSortedData().map((item) => (
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
