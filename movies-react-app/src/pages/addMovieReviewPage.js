import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchMovie } from "../api/movie-api";
import Spinner from '../components/spinner';
const PageTemplate = lazy(() => import("../components/templateMoviePage"));
const ReviewForm = lazy(() => import("../components/reviewForm"));

const WriteReviewPage = (props) => {
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    fetchMovie
  );

  if (isLoading) {
    return (
      <Spinner />
    );
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <Suspense fallback={<h1>Building Review Form Page</h1>}>
      <PageTemplate movie={movie}>
          <ReviewForm movie={movie} />
      </PageTemplate>
    </Suspense>
  );
};

export default WriteReviewPage;