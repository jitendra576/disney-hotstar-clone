export interface Element {
    type:
     | "Bloopers"
     | "Featurette"
     | "Behind the Scenes"
     | "Clip"
     | "Trailer"
     | "Teaser";
}

export interface Genre {
    id: number;
    name: string;
}
    
export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    media_type?: string;
    release_date?: string;
    first_air_date: string;
    genre_ids: number[];
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}
    
export interface Result {
    // Existing properties...
    // result: {
        id?: number;
        title?: string;
        backdrop_path?: string;
        media_type?: string;
        release_date?: string;
        first_air_date?: string;
        genre_ids?: number[];
        name?: string;
        origin_country?: string[];
        original_language?: string;
        original_name?: string;
        overview?: string;
        popularity?: number;
        poster_path?: string;
        vote_average?: number;
        vote_count?: number;
        number_of_seasons?:number;
        runtime:number;
        genres: {
            id?: number;
            name?: string;
        }[],
        videos: {
            results: {
                type?: string;
                key?: string;
            }[];
        };
    // };
}

interface ApiResponse {
    id: number;
    result: Result;
}
  
interface Results {
    results :{
        id:number
        result:Result;
    }[],
    title:string
}

interface Artists {
    adult:boolean,
    gender:number,
    id:number,
    known_for:[],
    known_for_department:string,
    name:string,
    popularity:string,
    profile_path:string,
}