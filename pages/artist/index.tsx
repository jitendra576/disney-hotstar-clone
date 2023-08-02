import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Artists } from "@/typings";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

interface resultProps {
  result: Artists[];
}

const Artist = ({ result }: resultProps) => {
  const [session] = useSession();
  const [search, setSearch] = useState<string>("");
  const [artists, setArtists] = useState<Artists[]>(result);
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const handleSearch = async () => {
    if (search) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=997a5fa3cf0d5b3cf827304fb23539e7&query=${search}&include_adult=false&language=en-US&page=1`
      );
      const data = await res.json();
      setArtists(data?.results);
    }
  };

  useEffect(() => {
    if (!search) {
      setArtists(result);
    } else {
      handleSearch();
    }
  }, [search]);

  return (
    <div className="relative">
      <Head>
        <title>Artist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="flex items-center">
            <div className="bg-white p-4 rounded-lg shadow-md flex">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 text-black px-2 py-1 rounded-l focus:outline-none focus:ring focus:border-blue-300"
                onChange={(event) => setSearch(event.target.value)}
              />
              {/* <button
                className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleSearch}
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="relative min-h-[calc(100vh-72px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 p-8">
              {artists?.map((artist) => (
                <div
                  className="bg-white rounded-lg items-center shadow-md overflow-hidden"
                  key={artist.id}
                >
                  <div className="flex justify-center">
                    <Image
                      src={`${BASE_URL}${artist.profile_path}`}
                      alt="Artist"
                      className="w-full h-auto items-center"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-black font-semibold mb-2">
                      {artist.name}
                    </h3>
                    <p className="text-gray-600">
                      {artist.known_for_department}
                    </p>
                    <p className="text-gray-600">
                      {artist.gender === 1 ? "Female" : "Male"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Artist;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  const request = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());

  return {
    props: {
      session,
      result: request.results,
    },
  };
};
