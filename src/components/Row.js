import axios from "../api/axios";
import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper";

export default function Row({ isLargeRow, title, fetchUrl, id }) {
  const modalRef = useRef();
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useOnClickOutside(modalRef, () => setModalOpen(false));

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("reauest", request);

    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  SwiperCore.use([Navigation]);

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 7,
          },
        }}
        className="slider"
      >
        <div id={id}>
          {movies.map((movie) => (
            <SwiperSlide className="row__posters">
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal
          {...movieSelected}
          setModalOpen={setModalOpen}
          modalRef={modalRef}
        />
      )}
    </section>
  );
}
