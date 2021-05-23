import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    // movies: [],
    pageSize: 4,
    currentPage: 1,
  };

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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    if (count === 0) return <p>there are no movies!!</p>;
    return (
      <React.Fragment>
        <p>there are {count} movies in the database!</p>
        {count === 0 && "there are no movies!!"}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.title}</td>
                <td>{movie.title}</td>
                <td>{movie.title}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onLikeToggle={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  renderMovies() {
    console.log(this.state.movies);
    // if(this.state.movies.length === 0) return <p>there are no movies</p>
  }
}

export default Movies;
