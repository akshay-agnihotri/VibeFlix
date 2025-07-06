import { useEffect, useState } from "react";
import Search from "./component/Search";
import Spinner from "./component/Spinner";
import MovieCard from "./component/MovieCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async (searchTerm) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies?searchTerm=${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setMovieList([]);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.Response === "False") {
          setMovieList([]);
          setErrorMessage(data.Error || "Error fetching movies");
          setIsLoading(false);
          return;
        }

        setMovieList(data.results || []);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching movies", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="movie-list">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
