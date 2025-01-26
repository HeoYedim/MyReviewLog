import { useContext, useState, useEffect } from "react";
import { ReviewStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useReview = (id) => {
  const data = useContext(ReviewStateContext);
  const [curReviewItem, setCurReviewItem] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const currentReviewItem = data.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentReviewItem) {
      window.alert("존재하지 않는 리뷰입니다.");
      nav("/", { replace: true });
    }

    setCurReviewItem(currentReviewItem);
  }, [id, data]); // v7 일 땐 [params.id, data]에서 data 지우고 params.id만 남겨야 함

  return curReviewItem;
};

export default useReview;
