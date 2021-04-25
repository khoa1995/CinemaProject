import React, { Component } from "react";
import MovieSchedule from "./movieSchedule";
import MovieList from "./movieList";
import NewsComponent from "./news";
import MagazineComponent from "./magazine";
class HomePage extends Component {
  render() {
    return (
      <>
        <h1
          id="idPhimDangChieu"
          className="text-center"
          style={{
            color: "#fa5238",
            paddingTop: "100px",
          }}
        >
          Phim đang chiếu
        </h1>
        <MovieList />
        <MovieSchedule />
        <MagazineComponent />
        <NewsComponent />
      </>
    );
  }
}

export default HomePage;
