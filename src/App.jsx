import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import ScrollContainer from "react-indiana-drag-scroll";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); // 선호작 영화

  console.log("API Key:", import.meta.env.VITE_OMDB_API_KEY);
  //서버에서 영화들 데이터를 가져옴
  const getMovieRequest = async (search) => {
    // const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    // const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;
    const url = `https://www.omdbapi.com/?apikey=${
      import.meta.env.VITE_OMDB_API_KEY
    }&s=${search}`;
    const response = await fetch(url); // omdb 서버에서 데이터를 제이슨으로 받는다.
    const jsonData = await response.json(); // JSON문자열을 자바스크립트 객체로 변환
    console.log(jsonData);
    // 검색 결과 없을 경우에는 영화를 업데이트 하지 않음
    if (jsonData.Search !== undefined && jsonData.Search.length > 0) {
      setMovies(jsonData.Search);
    }
  };

  // 앱 실행시 처음 한번만 실행 [], 검색어가 바뀔때마다 실행됨
  useEffect(() => {
    if (searchValue.length >= 3) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);
  useEffect(() => {
    const movieLikes = JSON.parse(localStorage.getItem("favorites"));
    if (movieLikes) {
      setFavorites(movieLikes);
    }
  }, []);
  // 로컬에 저장하는 함수
  function saveToLocalStorage(items) {
    localStorage.setItem("favorites", JSON.stringify(items));
  }
  // 선호작 추가 함수
  function addFavoriteMovie(movie) {
    if (favorites.some((m) => m.imdbID === movie.imdbID)) {
      // 이미 선호작에 해당 key가 존재한다면 함수를 실행시키지 마라
      alert("이미 추가된 영화입니다.");
      return;
    }
    const newList = [...favorites, movie];
    setFavorites(newList); // 스테이트 업데이트
    saveToLocalStorage(newList); // 저장소에 저장
  }
  // 선호작 삭제 함수
  const removeMovie = (movie) => {
    // 필터를 써서 id가 같은 영화가 있으면 제거됨
    const newList = favorites.filter(
      (favorites) => favorites.imdbID !== movie.imdbID
    );
    setFavorites(newList);
    saveToLocalStorage(newList);
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row align-items-center my-4">
        <MovieListHeading heading="영화 검색과 선호작  등록" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={movies}
          handleClick={addFavoriteMovie}
          addMovie={true}
        />
      </ScrollContainer>
      <div className="row align-items-center my-4">
        <MovieListHeading heading="내 선호작" />
      </div>
      <ScrollContainer className="row scroll-container">
        <MovieList
          movies={favorites}
          handleClick={removeMovie}
          addMovie={false}
        />
      </ScrollContainer>
    </div>
  );
}

export default App;
