// this is not a reusable component. it's just set to have symmetry and consistenct in movies.jsx (the return is not mixture of high and low level components anymore)

import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLike(movie)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.ondelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  // doesn't have to be part of the state bc it's not gonna change through the lifecycle of the component
  // <like></Like> => this is also a plain js obj. and we can pass any objs to functions and use them a values of propertie.

  render() {
    const { movies, sortColumn, ondelete, onLike, onSort } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
