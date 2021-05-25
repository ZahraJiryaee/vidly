import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie, getMovie } from "../services/fakeMovieService";
// import { saveMovie, getMovie } from "../services/movieService";
import { getGenres } from "../services/fakeGenreService";
// import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Sock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount = () => {
    const genres = getGenres();

    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });

    /* 
    the restful apis on the server are general purpose. they are not build for a specific page. so their data 
    is used on several pages. each page needs a piece of that data and it's also possible the data we wanna 
    show on the page is a little bit different from the structure of that data
     */

    // await this.populateGenres();
    // await this.populateMovie();
    // **** decorate the function with async ****
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    /*
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && response.status === 404) {
        this.props.replace("/not-found");
      }
    }    
    */
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = () => {
    // call the server, save the changes, redirect the user to a different page
    saveMovie({ ...this.state.data });
    // await saveMovie({ ...this.state.data });
    // add async decorator to the function
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
