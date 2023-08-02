import { useSession, getSession } from "next-auth/client";
import Brands from "@/components/Brands";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import Head from "next/head";
import Header from "../components/Header";
import MoviesCollection from "@/components/MoviesCollection";
import ShowsCollection from "@/components/ShowsCollection";
import { Movie } from "../typings";
import { useEffect } from "react";

interface MovieProps {
  popularMovies: Movie[];
  popularShows: Movie[];
  top_ratedMovies: Movie[];
  top_ratedShows: Movie[];
}
export default function Home({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}: MovieProps) {
  const [session] = useSession();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>
          Disney Hotstar+ | The streaming home of Disney, Pixar, Marvel, Star
          Wars, Nat Geo and Star
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {!session ? (
        <Hero />
      ) : (
        <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
          <Slider />
          <Brands />
          <MoviesCollection results={popularMovies} title="Popular Movies" />
          <ShowsCollection results={popularShows} title="Popular Shows" />
          <MoviesCollection
            results={top_ratedMovies}
            title="Top Rated Movies"
          />
          <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
          <section></section>
        </main>
      )}
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
  ]);

  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
};
