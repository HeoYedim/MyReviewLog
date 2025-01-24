import { useContext } from "react";
import Header from "../components/Header";
import ReviewList from "../components/ReviewList";
import { ReviewStateContext } from "../App";

const Home = () => {
  const reviewData = useContext(ReviewStateContext);

  // console.log("현재 리뷰 데이터:", reviewData); // 디버깅 용도

  return (
    <div className="Home">
      <Header title={"My Review Log"}></Header>
      <ReviewList data={reviewData} />
    </div>
  );
};

export default Home;
