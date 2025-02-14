const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/** 🔍 Google Books API에서 자동완성 목록 가져오기 */
export const fetchBookList = async (query) => {
  if (!query) return [];

  try {
    //console.log(`Google Books API 호출 (자동완성): ${query}`);
    const response = await fetch(
      `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(
        query
      )}&maxResults=5&printType=books`
    );
    const data = await response.json();

    //console.log("Google Books API 응답 데이터 (자동완성):", data);

    if (data.items && Array.isArray(data.items)) {
      return data.items.map((book) => ({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "저자 정보 없음",
        year: book.volumeInfo.publishedDate
          ? book.volumeInfo.publishedDate.split("-")[0]
          : "연도 정보 없음",
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("도서 자동완성 목록 가져오기 오류:", error);
    return [];
  }
};

/** 📚 Google Books API에서 특정 도서의 표지 이미지 가져오기 */
export const fetchBookCover = async (title) => {
  if (!title) return null;

  // 1️. localStorage에 저장된 이미지 확인
  const cachedCover = localStorage.getItem(`cover_${title}`);
  if (cachedCover) {
    return cachedCover; // ✅ 캐시된 이미지 반환
  }

  try {
    //console.log("fetchBookCover 호출:", title);
    const response = await fetch(
      `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(
        title
      )}&maxResults=1&printType=books`
    );
    const data = await response.json();

    //console.log("Google Books API 응답 데이터 (표지):", data);

    if (
      data.items &&
      data.items.length > 0 &&
      data.items[0].volumeInfo.imageLinks
    ) {
      const coverUrl = data.items[0].volumeInfo.imageLinks.thumbnail;

      // 2️. 가져온 표지를 localStorage에 저장
      localStorage.setItem(`cover_${title}`, coverUrl);

      return coverUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error("도서 표지 가져오기 오류:", error);
    return null;
  }
};
