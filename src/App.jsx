import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Review from "./pages/Review";
import Notfound from "./pages/Notfound";
import Edit from "./pages/Edit";
import { useReducer, useRef, createContext } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [
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
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const ReviewStateContext = createContext();
export const ReviewDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);

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
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate1: createdDate1 || new Date(),
        createdDate2: createdDate2 || new Date(),
        category: category || "movie",
        createdTitle: createdTitle || "제목 미입력",
        rating: rating || 1,
        selectedGenres: selectedGenres.length > 0 ? selectedGenres : ["미지정"],
        reviewSummary: reviewSummary || "한 줄 리뷰 미입력",
        reviewDetails: reviewDetails || "전체 리뷰 미입력",
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
