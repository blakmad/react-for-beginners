import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [currMovie, setCurrMovie] = useState("");
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setCurrMovie(json);
    setLoading(false);
  };
  console.log(currMovie);
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading,,,</h1> // if it is still on loading,,
      ) : (
        // if loading finished,,,
        <div>
          <img src={currMovie.data.movie.medium_cover_image}></img>
          <h3> Title : {currMovie.data.movie.title}</h3>
          <h3> Genres : {currMovie.data.movie.genres[0]}</h3>
          <h3> Year : {currMovie.data.movie.year}</h3>
          <h3> Languages : {currMovie.data.movie.language}</h3>
          <h3>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Go back
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
}

export default Detail;
