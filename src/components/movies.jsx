import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "./../utils/paginate";
import _, { filter } from "lodash"; // to implement sorting on client

class Movies extends Component {
  state = {
    movies: [],
    // we should initialize it to an empty array. bc it's gonna take some time until we get the data from the server. during this time, we wanna make sure "movies" is not undefined otherwise we get a runtime error
    pageSize: 4,
    currentPage: 1,

    genres: [],

    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movie };
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    // whenever we select a genre we should reset the page to 1
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;

    /* filter - sort - paginate */
    // 1
    // if the genre is selected and that genre has an id (empty string is also falsy) we filter it otherwise we return allMovies
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    // 2
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // 3
    // instead of rendering this.state.movies.map, we render the below array
    // const movies = paginate(allMovies, currentPage, pageSize);  =>   allMovies => filtered , count => filtered.length
    // const movies = paginate(filtered, currentPage, pageSize);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>there are no movies!!</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>there are {totalCount} movies in the database!</p>
          {count === 0 && "there are no movies!!"}
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            // itemsCount={count}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  renderMovies() {
    console.log(this.state.movies);
    // if(this.state.movies.length === 0) return <p>there are no movies</p>
  }
}

export default Movies;
