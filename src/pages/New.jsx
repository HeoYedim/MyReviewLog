import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ReviewDispatchContext } from "../App";

const New = () => {
  const { onCreate } = useContext(ReviewDispatchContext);
  const nav = useNavigate();

  const onSubmit = (formData) => {
    // console.log("createdDate1:", formData.createdDate1);
    // console.log("createdDate2:", formData.createdDate2);

    onCreate(
      new Date(formData.createdDate1).toISOString(), // ISO 문자열 변환
      new Date(formData.createdDate2).toISOString(),
      formData.category, // 카테고리를 올바른 위치로 이동
      formData.createdTitle,
      formData.rating,
      formData.selectedGenres,
      formData.reviewSummary
    );
    nav(`/`, { replace: true });
  };
  return (
    <div>
      <Header
        title={"새 리뷰 작성"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
