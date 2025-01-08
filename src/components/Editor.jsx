import { useState } from "react";
import Button from "./Button";
import "./Editor.css";

const Editor = () => {
  const [selected, setSelected] = useState(""); // 선택된 버튼 상태

  const [rating, setRating] = useState(0);
  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <div className="Editor">
      <section className="category_section">
        <h5>유형</h5>
        <button
          className={`category_button movie ${
            selected === "movie" ? "active" : ""
          }`}
          onClick={() => setSelected("movie")}
        >
          영화
        </button>
        <button
          className={`category_button book ${
            selected === "book" ? "active" : ""
          }`}
          onClick={() => setSelected("book")}
        >
          도서
        </button>
      </section>
      <section className="title_section">
        <h5>제목</h5>
        <input type="text" placeholder="제목을 입력하세요" />
      </section>
      <section className="date_section">
        <h5>날짜</h5>
        <input type="date" />
        <h5>~</h5>
        <input type="date" name="" id="" />
      </section>
      <section className="star_section">
        <h5>별점</h5>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-button ${star <= rating ? "filled" : ""}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </button>
        ))}
      </section>
      <section className="genre_section">
        <h5>장르</h5>
        <div className="genre_grop">
          <div className="select_wrapper">
            <select id="select1" className="custom_select">
              <option value="1">옵션 1-1</option>
              <option value="1">옵션 1-2</option>
              <option value="1">옵션 1-3</option>
            </select>
          </div>
          <div className="select_wrapper">
            <select id="select2" className="custom_select">
              <option value="1">옵션 2-1</option>
              <option value="1">옵션 2-2</option>
              <option value="1">옵션 2-3</option>
            </select>
          </div>
          <div className="select_wrapper">
            <select id="select3" className="custom_select">
              <option value="1">옵션 3-1</option>
              <option value="1">옵션 3-2</option>
              <option value="1">옵션 3-3</option>
            </select>
          </div>
        </div>
      </section>
      <section className="reviewSummary_section">
        <h5>한 줄 리뷰</h5>
        <textarea
          name="reviewSummary"
          id=""
          placeholder="한 줄 리뷰를 작성해 보세요!"
        ></textarea>
      </section>
      <section className="reviewDetails_section">
        <h5>전체 리뷰</h5>
        <textarea
          name="reviewDetails"
          id=""
          placeholder="전체 리뷰를 작성해 보세요!"
        ></textarea>
      </section>
      <section className="button_section">
        <Button text={"취소하기"} />
        <Button text={"작성완료"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
