import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Review from "./pages/Review";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import { useReducer, useRef, createContext, useEffect, useState } from "react";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [
        {
          ...action.data,
          createdDate1: action.data.createdDate1
            ? new Date(action.data.createdDate1)
            : new Date(),
          createdDate2: action.data.createdDate2
            ? new Date(action.data.createdDate2)
            : new Date(),
        },
        ...state,
      ];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("review", JSON.stringify(nextState));
  return nextState;
}

export const ReviewStateContext = createContext();
export const ReviewDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("review");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 새로운 리뷰 추가
  const onCreate = (
    createdDate1,
    createdDate2,
    category,
    createdTitle,
    rating,
    selectedGenres,
    reviewSummary,
    reviewDetails
  ) => {
    if (!createdTitle.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (selectedGenres.every((genre) => !genre.trim())) {
      alert("최소 하나의 장르를 선택해주세요.");
      return;
    }

    if (!reviewSummary.trim()) {
      alert("한 줄 리뷰를 입력해주세요.");
      return;
    }

    if (!reviewDetails.trim()) {
      alert("전체 리뷰를 입력해주세요.");
      return;
    }

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate1: createdDate1 || new Date(),
        createdDate2: createdDate2 || new Date(),
        category: category || "movie",
        createdTitle,
        rating: rating || 1,
        selectedGenres,
        reviewSummary,
        reviewDetails,
      },
    });
  };

  // 기존 리뷰 수정
  const onUpdate = (
    id,
    createdDate1,
    createdDate2,
    category,
    createdTitle,
    rating,
    selectedGenres,
    reviewSummary,
    reviewDetails
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate1,
        createdDate2,
        category,
        createdTitle,
        rating,
        selectedGenres,
        reviewSummary,
        reviewDetails,
      },
    });
  };

  // 기존 리뷰 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      <ReviewStateContext.Provider value={data}>
        <ReviewDispatchContext.Provider
          value={{ onCreate, onUpdate, onDelete }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/review/:id" element={<Review />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </ReviewDispatchContext.Provider>
      </ReviewStateContext.Provider>
    </>
  );
}

export default App;
