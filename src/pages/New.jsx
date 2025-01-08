import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

const New = () => {
  return (
    <div>
      <Header
        title={"새 리뷰 작성"}
        leftChild={<Button text={"< 뒤로 가기"} />}
      />
      <Editor />
    </div>
  );
};

export default New;
