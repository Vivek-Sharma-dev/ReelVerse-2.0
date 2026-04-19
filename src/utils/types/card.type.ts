export type MovieProps = {
    id: number,
    release_date: string,
    poster_path: string,
    vote_average: number,
    backdrop_path: string,
    overview: string,
    genre_ids: number[],
    popularity: number,
    vote_count: number,
    original_language: string,
    video: boolean,
    adult: boolean,
    original_title: string
    media_type: string
}

export type MovieCardProps = {
    id: number,
    release_date: string,
    vote_average: number,
    overview: string,
    popularity: number,
    vote_count: number,
    original_language: string,
    adult: boolean,
    original_title: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[]
}
