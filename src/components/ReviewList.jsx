import "./ReviewList.css";
import Button from "./Button";
import ReviewItem from "./ReviewItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ReviewList = ({ data }) => {
  // console.log("리뷰 리스트 데이터 확인: ", data);
  const nav = useNavigate();

  const [sortCriteria, setSortCriteria] = useState("latest"); // 정렬 기준 (최신순 기본값)
  const [categoryFilter, setCategoryFilter] = useState("all"); // 카테고리 필터 (전체 기본값)

  // 정렬 및 필터 적용 함수
  const getFilteredAndSortedData = () => {
    let filteredData = [...data];

    // 카테고리 필터 적용 (전체일 경우 필터링 안함)
    if (categoryFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // 정렬 적용
    switch (sortCriteria) {
      case "latest":
        filteredData.sort(
          (a, b) => new Date(b.createdDate1) - new Date(a.createdDate1)
        );
        break;
      case "rating":
        filteredData.sort((a, b) => Number(b.rating) - Number(a.rating)); // 숫자로 변환 후 정렬
        break;
      default:
        break;
    }

    return filteredData;
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
          <option value={"rating"}>별점순</option>
        </select>
        <select
          name="category"
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value={"all"}>전체</option>
          <option value={"movie"}>영화</option>
          <option value={"book"}>도서</option>
        </select>
        <Button
          onClick={() => nav("/new")}
          text={"새 리뷰 작성"}
          type={"POSITIVE"}
        />
      </div>
      <div className="list_wrapper">
        {getFilteredAndSortedData().length > 0 &&
          getFilteredAndSortedData().map((item) => (
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
