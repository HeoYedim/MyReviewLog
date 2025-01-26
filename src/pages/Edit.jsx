import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ReviewDispatchContext, ReviewStateContext } from "../App";

import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import useReview from "../hooks/useReview";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(ReviewDispatchContext);

  const curReviewItem = useReview(params.id);

  const onClickDelete = () => {
    if (window.confirm("리뷰를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (formData) => {
    if (window.confirm("리뷰를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        formData.createdDate1.getTime(), // 숫자로 변환
        formData.createdDate2.getTime(),
        formData.category,
        formData.createdTitle,
        formData.rating,
        formData.selectedGenres,
        formData.reviewSummary,
        formData.reviewDetails
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div className="Edit">
      <Header
        title={"리뷰 수정"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curReviewItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
