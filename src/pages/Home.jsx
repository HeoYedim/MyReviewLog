import Header from "../components/Header";
import ReviewList from "../components/ReviewList";

const Home = () => {
  return (
    <div className="Home">
      <Header title={"My Review Log"}></Header>
      <ReviewList />
    </div>
  );
};

export default Home;
