import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/action";
import Image from "../../assets/img/tranding.svg";
import TabsContainer from "./TabsContainer";
import apiKey from "../../utility/apiKey";
import tmdbUrl from "../../utility/tmdbUrl";
// import ModalTrailer from "./Cards/ModalTrailer";

const MoviesTabs = (props) => {
  const dispatch = useDispatch();
 
  const movies = useSelector((state) => {
    return state.movies.popular.movies;
  });

  const tvs = useSelector((state) => {
    return state.movies.popular.tvs;
  });

  const dayTrand = useSelector((state) => {
    return state.movies.tranding.day;
  });
  const weekTrand = useSelector((state) => {
    return state.movies.tranding.week;
  });

  const nowPlaying = useSelector((state) => {
    return state.movies.nowPlaying.movies;
  });
  const latestTv = useSelector((state) => {
    return state.movies.nowPlaying.tvs;
  });

  const onFetchPopularMovies = useCallback(
    () => dispatch(actions.fetchPopularMovies()),
    [dispatch]
  );
  const onFetchPopularTvs = useCallback(
    () => dispatch(actions.fetchPopularTvs()),
    [dispatch]
  );

  const onFetchTrandingPerDay = useCallback(
    () => dispatch(actions.fetchTrandingPerDay()),
    [dispatch]
  );
  const onFetchTrandingPerWeek = useCallback(
    () => dispatch(actions.fetchTrandingPerWeek()),
    [dispatch]
  );
  const onFetchNowPlayingMovies = useCallback(
    () => dispatch(actions.fetchNowPlayingMovies()),
    [dispatch]
  );
  const onFetchLatestTvs = useCallback(
    () => dispatch(actions.fetchLatestTv()),
    [dispatch]
  );

  useEffect(() => {
    onFetchPopularMovies();
    onFetchPopularTvs();
    onFetchTrandingPerDay();
    onFetchTrandingPerWeek();
    onFetchNowPlayingMovies();
    onFetchLatestTvs();
  }, [
    onFetchPopularMovies,
    onFetchPopularTvs,
    onFetchTrandingPerDay,
    onFetchTrandingPerWeek,
    onFetchNowPlayingMovies,
    onFetchLatestTvs,
  ]);

  const [bg, setBg] = useState("");
  // const [scale, setScale] = useState("");
  // const [open, setOpen] = useState(false);
  // const [idMovies, setIdMovies] = useState("");
  // const [typeTab, setTypeTab] = useState("");

  const handleNowPlayingId = (bg, id, typeTab) => {
    setBg(bg);
    // setIdMovies(id);
    // setTypeTab(typeTab)
  };
  // const toggleModal = () => {
  //   setOpen(!open);
  // };

  useEffect(() => {
    let isSubscribed = true;
    tmdbUrl
      .get(`movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) =>
        isSubscribed ? setBg(response.data.results[0].backdrop_path) : null
      );
    return () => (isSubscribed = false);
  }, []);

  // useEffect(async() => {
  //   const response = await tmdbUrl.get(
  //     `movie/${idTrailers}/videos?api_key=${apiKey}&language=en-US`
  //   );
  //   const results =  response.data.results
  //   setTrailers(results)
  // }, [idTrailers]);
  
  return (
    <div className="Wrapper">
      <TabsContainer 
        title={"What's Popular"}
        tabLabelOne={"Movies"}
        tabLabelTwo={"On Tv"}
        tabOne={movies}
        tabTwo={tvs}
        moviesType={"movie"}
        tvsType={"tv"}
      />
      <TabsContainer
        title={"Latest Trailers"}
        tabLabelOne={"In Theaters"}
        tabLabelTwo={"On TV"}
        tabOne={nowPlaying}
        tabTwo={latestTv}
        trailerCard={true}
        handleNowPlayingId={handleNowPlayingId}
        bgImage={
          bg
            ? `url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/${bg}')`
            : "linear-gradient(to left, #032541 0%, #01b4e4 100%)"
        }
        // bgImage={
        //   bg === ""
        //     ? "linear-gradient(to left, #032541 0%, #01b4e4 100%)"
        //     : `url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/${bg}')`
        // }
        //gradient={`linear-gradient(rgba(3, 37, 65, 0.5) 0%, rgba(1, 180, 228, 0.5)100%)`}
        //bgImage={`linear-gradient(rgba(3, 37, 65, 0.5) 0%, rgba(1, 180, 228, 0.5)100%),url(https://image.tmdb.org/t/p/original/${bg})`}
        color={"white"}
        bsize={"cover"}
        bpos={"50%"}
        // scale={scale}
        // toggleModal={toggleModal}
      />
      <TabsContainer
        bgImage={`url(${Image})`}
        title={"Tranding"}
        tabLabelOne={"days"}
        tabLabelTwo={"weeks"}
        tabOne={dayTrand}
        tabTwo={weekTrand}
        bpos={"50% 200px"}
      />
    </div>
  );
};

export default MoviesTabs;
