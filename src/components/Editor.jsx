import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Editor.css";

import { getStringedDate } from "../util/get-stringed-date";
import { fetchMovieList } from "../api/tmdb";
import { fetchBookList } from "../api/googleBooks";

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

  const [errors, setErrors] = useState({});

  // movie poster - tmdb api 관련
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    if (initData) {
      setFormData({
        ...initData,
        createdDate1: new Date(Number(initData.createdDate1)),
        createdDate2: new Date(Number(initData.createdDate2)),
      });
    }
  }, [initData]);

  // tmdb api 관련 useEffect - 디바운싱 + api 호출 최적화
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(formData.createdTitle);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [formData.createdTitle]);

  useEffect(() => {
    if (isSelecting) return; // 선택 중이면 실행 안 함

    // console.log("디바운싱된 검색어:", debouncedTitle);

    if (debouncedTitle && debouncedTitle.trim() !== "") {
      const fetchList =
        formData.category === "movie" ? fetchMovieList : fetchBookList;

      fetchList(debouncedTitle).then((results) => {
        // console.log("자동완성 목록 업데이트:", results);

        if (Array.isArray(results) && results.length > 0) {
          setSuggestions(results);
        } else {
          setSuggestions([]);
        }
      });
    }
  }, [debouncedTitle, formData.category, isSelecting]); // isSelecting을 의존성에 포함

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

    setErrors({ ...errors, [name]: "" }); // 입력 시 오류 초기화
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

    // 선택 시 오류 메시지 제거
    setErrors((prevErrors) => ({
      ...prevErrors,
      Genre: formData.selectedGenres.some((genre) => genre.trim() !== "")
        ? ""
        : prevErrors.Genre,
    }));
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
    setSuggestions([]);
  };

  const handleTitleSelect = (title) => {
    if (formData.createdTitle !== title) {
      setIsSelecting(true); // 선택 중 상태로 설정
      setFormData((prev) => ({
        ...prev,
        createdTitle: title,
      }));
      setDebouncedTitle(""); // 선택 후 디바운싱 검색어 초기화
    }

    setTimeout(() => {
      setSuggestions([]);
      setIsSelecting(false); // 선택이 끝난 후 false로 변경
    }, 300); // 🔹 일정 시간 후 재검색 가능하도록 설정
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.createdTitle.trim()) {
      newErrors.createdTitle = "제목을 입력해주세요.";
    }

    if (formData.selectedGenres.every((genre) => genre.trim() === "")) {
      newErrors.Genre = "최소 하나의 장르를 선택해주세요.";
    }

    if (!formData.reviewSummary.trim()) {
      newErrors.reviewSummary = "한 줄 리뷰를 입력해주세요.";
    }

    if (!formData.reviewDetails.trim()) {
      newErrors.reviewDetails = "전체 리뷰를 입력해주세요.";
    }

    setErrors(newErrors);

    // 오류가 있을 경우 false 반환
    return Object.keys(newErrors).length === 0;
  };

  const onClickSubmitButton = () => {
    if (!validateForm()) {
      return; // 유효성 검사 실패 시 여기서 함수 실행 중단
    }

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
        <div className="title_wrapper">
          <input
            name="createdTitle"
            value={formData.createdTitle}
            onChange={onChangeFormData}
            type="text"
            placeholder="제목을 입력하세요"
            className={errors.createdTitle ? "input-error" : ""}
          />

          {errors.createdTitle && (
            <div className="error-message">{errors.createdTitle}</div>
          )}

          {suggestions.length > 0 && (
            <ul className="autocomplete-list">
              {suggestions.map((item, index) => (
                <li key={index} onClick={() => handleTitleSelect(item.title)}>
                  {formData.category === "movie"
                    ? `${item.title} (${item.year})`
                    : `${item.title} (${item.authors}, ${item.year})`}
                </li>
              ))}
            </ul>
          )}
        </div>
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
                className={`custom_select ${errors.Genre ? "input-error" : ""}`}
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
        {errors.Genre && <div className="error-message">{errors.Genre}</div>}
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
        {errors.reviewSummary && (
          <div className="error-message">{errors.reviewSummary}</div>
        )}
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
        {errors.reviewDetails && (
          <div className="error-message">{errors.reviewDetails}</div>
        )}
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
