import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  /**
   * 이제 then이라는 용법은 잘 쓰지 않는다
   * 아래 의 1~2단계 용법으로 수정 필요..
   */
  //  useEffect(() => {
  // fetch(
  //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
  // )
  //   .then((response) => response.json())
  //   .then((json) => {
  //     setMovies(json.data.movies);
  //     //setMovies해주고 나서는 loadgin을 초기화해야지? 없애줘야
  //     setLoading(false);
  //   });
  // }, []);

  /**
   * async-await 용법을 더 사용한다. (1단계)
   * 이용법을 쓰기위에 변수 하나 생성한다
   */
  const getMovies = async () => {
    //그냥 fetch를 사용하는 대신에 아래와 같다 (1단계방법)
    // const response = await fetch(
    //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    // );
    // const json = await response.json();

    // (2단계 방법) 더줄여주기
    // await을 감싸는 또다른 await이 있는 형태이다.. 이게 가능하다..
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []); //[]빈array이므로 처음 한번만 실행해서 영화 API 를 가져오지

  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={movie.medium_cover_image} />
              <h2>{movie.title}</h2>
              <p>{movie.summary}</p>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre}>{genre}</li> //map는 key가 있어야 한다.
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
