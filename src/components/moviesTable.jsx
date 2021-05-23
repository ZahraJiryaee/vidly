// this is not a reusable component. it's just set to have symmetry and consistenct in movies.jsx (the return is not mixture of high and low level components anymore)

import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, ondelete, onLike } = props;

  return (
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
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like liked={movie.liked} onLikeToggle={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => ondelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
