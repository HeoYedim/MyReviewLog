import "./Viewer.css";
import Category from "./Category";

const Viewer = ({ data }) => {
  return (
    <div className="Viewer">
      <section className="img_info_section">
        <div className="img_rectangle"></div>
        <div className="detail_info">
          <div className="viewer_title">
            <Category type={data.category} /> {data.createdTitle}
          </div>

          <div className="viewer_rating_section">
            별점 <p>{"★ ".repeat(data.rating)}</p>
          </div>
          <div className="viewer_genres_section">
            <p>장르</p>{" "}
            {data.selectedGenres
              .filter((genre) => genre) // 빈 값 제거
              .map((genre, index) => (
                <span key={index}>#{genre}</span>
              ))}
          </div>
        </div>
      </section>
      <section className="contents_section">
        <h4>한 줄 리뷰</h4>
        <div className="summary_wraper">
          <p>{data.reviewSummary || "한 줄 리뷰 미입력"}</p>
        </div>
        <h4>전체 리뷰</h4>
        <div className="details_wraper">
          <p>{data.reviewDetails ? data.reviewDetails : "전체 리뷰 미입력"}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
