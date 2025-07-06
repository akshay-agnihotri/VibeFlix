import { useEffect, useState } from "react";
import Search from "./component/Search";
import Spinner from "./component/Spinner";
import MovieCard from "./component/MovieCard";
import { useDebounce } from "use-debounce";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching movies", error.message);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchMovies = async (debouncedSearchTerm) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies?searchTerm=${debouncedSearchTerm}`,
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

        if (debouncedSearchTerm && data.results.length > 0) {
          await updateSearchCount(debouncedSearchTerm, data.results[0]);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching movies", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul className="movie-list">
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

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
