import { useState } from "react";
import Button from "./Button";
import "./Editor.css";

const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = () => {
  const handleStarClick = (star) => {
    onChangeFormData({
      target: {
        name: "rating",
        value: star,
      },
    });
  };

  const [formData, setFormData] = useState({
    category: "",
    createdTitle: "",
    createdDate1: new Date(),
    createdDate2: new Date(),
    rating: 0,
    reviewSummary: "",
    reviewDetails: "",
  }); // 사용자 입력 확인

  const onChangeFormData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate1" || name === "createdDate2") {
      value = new Date(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="Editor">
      <section className="category_section">
        <h5>유형</h5>
        <button
          className={`category_button movie ${
            formData.category === "movie" ? "active" : ""
          }`}
          onClick={() =>
            setFormData((prev) => ({ ...prev, category: "movie" }))
          }
        >
          영화
        </button>
        <button
          className={`category_button book ${
            formData.category === "book" ? "active" : ""
          }`}
          onClick={() => setFormData((prev) => ({ ...prev, category: "book" }))}
        >
          도서
        </button>
      </section>

      <section className="title_section">
        <h5>제목</h5>
        <input
          name="createdTitle"
          value={formData.createdTitle}
          onChange={onChangeFormData}
          type="text"
          placeholder="제목을 입력하세요"
        />
      </section>

      <section className="date_section">
        <h5>날짜</h5>
        <input
          name="createdDate1"
          onChange={onChangeFormData}
          value={getStringedDate(formData.createdDate1)}
          type="date"
        />
        <h5>~</h5>
        <input
          name="createdDate2"
          onChange={onChangeFormData}
          value={getStringedDate(formData.createdDate2)}
          type="date"
        />
      </section>

      <section className="star_section">
        <h5>별점</h5>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-button ${star <= formData.rating ? "filled" : ""}`}
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
          value={formData.reviewSummary}
          onChange={onChangeFormData}
          placeholder="한 줄 리뷰를 작성해 보세요!"
        ></textarea>
      </section>

      <section className="reviewDetails_section">
        <h5>전체 리뷰</h5>
        <textarea
          name="reviewDetails"
          value={formData.reviewDetails}
          onChange={onChangeFormData}
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
