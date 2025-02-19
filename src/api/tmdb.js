const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Vite 환경 변수 사용
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieList = async (query) => {
  if (!query) return [];

  try {
    //console.log(`TMDb API 호출 (자동완성): ${query}`);
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=ko-KR`
    );
    const data = await response.json();

    //console.log("TMDb API 응답 데이터 (자동완성):", data);

    if (data.results && Array.isArray(data.results)) {
      return data.results.map((movie) => ({
        title: movie.title,
        year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("자동완성 목록 가져오기 오류:", error);
    return [];
  }
};

/** 🎥 TMDb에서 특정 영화의 포스터 URL 가져오기 */
export const fetchMoviePoster = async (title) => {
  if (!title) return null;

  try {
    //console.log("fetchMoviePoster 호출:", title);
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        title
      )}&language=ko-KR`
    );
    const data = await response.json();

    //console.log("TMDb API 응답 데이터 (포스터):", data);

    if (
      data.results &&
      data.results.length > 0 &&
      data.results[0].poster_path
    ) {
      return `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`; // ✅ 단일 포스터 URL 반환
    } else {
      return null; // ✅ 포스터 없음
    }
  } catch (error) {
    console.error("영화 포스터 가져오기 오류:", error);
    return null;
  }
};
