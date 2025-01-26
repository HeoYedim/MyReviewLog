import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Editor.css";

const getStringedDate = (targetDate) => {
  if (!targetDate) return "";
  const dateObj =
    targetDate instanceof Date ? targetDate : new Date(targetDate);
  if (isNaN(dateObj.getTime())) return "";

  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;
};

const Editor = ({ initData, onSubmit }) => {
  const handleStarClick = (star) => {
    onChangeFormData({
      target: {
        name: "rating",
        value: star,
      },
    });
  };

  const [formData, setFormData] = useState({
    category: "movie",
    createdTitle: "",
    createdDate1: new Date(),
    createdDate2: new Date(),
    rating: 1,
    selectedGenres: ["", "", ""],
    reviewSummary: "",
    reviewDetails: "",
  }); // 사용자 입력 확인

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setFormData({
        ...initData,
        createdDate1: new Date(Number(initData.createdDate1)),
        createdDate2: new Date(Number(initData.createdDate2)),
      });
    }
  }, [initData]);

  const onChangeFormData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate1" || name === "createdDate2") {
      value = value ? new Date(value) : null;
    }

    if (name === "reviewSummary" && value.length > 30) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // console.log(`업데이트된 ${name}:`, value);
  };

  const movieGenres = [
    "액션",
    "어드벤처",
    "코미디",
    "드라마",
    "판타지",
    "공포",
    "로맨스",
    "SF(공상과학)",
    "스릴러",
    "미스터리",
    "애니메이션",
    "다큐멘터리",
    "범죄",
    "가족",
    "음악",
    "역사",
    "전쟁",
    "서부",
    "스포츠",
  ];

  const bookGenres = [
    "소설",
    "역사",
    "철학",
    "자기계발",
    "과학",
    "예술",
    "시",
    "에세이",
    "경제/경영",
    "판타지",
    "미스터리",
    "로맨스",
    "공포",
    "과학 소설(SF)",
    "어린이/청소년",
    "전기",
    "논픽션",
    "종교/영성",
  ];

  const handleGenreChange = (index, value) => {
    setFormData((prev) => {
      const updatedGenres = [...prev.selectedGenres];
      updatedGenres[index] = value;
      return { ...prev, selectedGenres: updatedGenres };
    });
  }; // 장르 변경 핸들러

  const getAvailableGenres = (index) => {
    const allGenres = formData.category === "movie" ? movieGenres : bookGenres;
    return allGenres.filter(
      (genre) =>
        !formData.selectedGenres.includes(genre) ||
        formData.selectedGenres[index] === genre
    );
  }; // 선택된 장르 제외

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category: category,
      selectedGenres: ["", "", ""], // 카테고리 변경 시 장르 초기화
    }));
  };

  const onClickSubmitButton = () => {
    onSubmit(formData);
  };

  return (
    <div className="Editor">
      <section className="category_section">
        <h5>유형</h5>
        <button
          className={`category_button movie ${
            formData.category === "movie" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("movie")}
        >
          영화
        </button>
        <button
          className={`category_button book ${
            formData.category === "book" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("book")}
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
          min={getStringedDate(formData.createdDate1)}
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
        <div className="genre_group">
          {[0, 1, 2].map((index) => (
            <div className="select_wrapper" key={index}>
              <select
                value={formData.selectedGenres[index]}
                onChange={(e) => handleGenreChange(index, e.target.value)}
                className="custom_select"
              >
                <option value="">장르 선택</option>
                {getAvailableGenres(index).map((genre, i) => (
                  <option key={i} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="reviewSummary_section">
        <h5>한 줄 리뷰</h5>
        <div className="textareaWrapper" style={{ position: "relative" }}>
          <textarea
            className="reviewSumary"
            name="reviewSummary"
            value={formData.reviewSummary}
            onChange={onChangeFormData}
            placeholder="한 줄 리뷰를 작성해 보세요!"
            rows={1}
            cols={40}
          ></textarea>
          <div className="charCount">{formData.reviewSummary.length} / 30</div>
        </div>
      </section>

      <section className="reviewDetails_section">
        <h5>전체 리뷰</h5>
        <textarea
          className="reviewDetails"
          name="reviewDetails"
          value={formData.reviewDetails}
          onChange={onChangeFormData}
          placeholder="전체 리뷰를 작성해 보세요!"
          rows={5}
        ></textarea>
      </section>

      <section className="button_section">
        <Button
          onClick={() => {
            nav(-1);
          }}
          text={"취소하기"}
        />
        <Button
          onClick={onClickSubmitButton}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
