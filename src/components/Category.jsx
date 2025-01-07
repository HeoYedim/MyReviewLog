import "./Category.css";

const Category = ({ type }) => {
  const label = type === "movie" ? "영화" : "도서";
  const categoryClass = `category ${type === "movie" ? "movie" : "book"}`;

  return <span className={categoryClass}>{label}</span>;
};

export default Category;
