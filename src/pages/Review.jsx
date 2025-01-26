import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useReview from "../hooks/useReview";
import { getStringedDate } from "../util/get-stringed-date";

const Review = () => {
  const params = useParams();
  const nav = useNavigate();

  const curReviewItem = useReview(params.id);

  if (!curReviewItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const {
    createdDate1,
    createdDate2,
    category,
    createdTitle,
    rating,
    selectedGenres,
    reviewSummary,
    reviewDetails,
  } = curReviewItem;

  const formattedDate1 = getStringedDate(new Date(createdDate1));
  const formattedDate2 = getStringedDate(new Date(createdDate2));

  const title =
    formattedDate1 === formattedDate2
      ? formattedDate1
      : `${formattedDate1} ~ ${formattedDate2}`;

  return (
    <div className="Review">
      <Header
        title={title}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />
        }
      />
      <Viewer
        data={{
          ...curReviewItem,
          reviewSummary:
            curReviewItem.reviewSummary === "한 줄 리뷰 미입력"
              ? ""
              : curReviewItem.reviewSummary,
        }}
      />
    </div>
  );
};

export default Review;
