import { Dispatch } from 'redux';
import moviesApi from '../apis/movies';
import { movieActionTypes } from './types';
import { MovieModel } from '../models/movie.model';

export interface FetchMoviesAction {
    type: movieActionTypes.FETCH_MOVIES;
    payload: MovieModel[];
}

interface setError {
    type: movieActionTypes.SET_ERROR;
    payload: string;
}

interface setloading {
    type: movieActionTypes.SET_LOADING;
    payload: boolean;
}

const setMovieError = (error: string) => {
    return {
        type: movieActionTypes.SET_ERROR,
        payload: error
    };
};

const setMovieLoading = (isLoading: boolean) => {
    return {
        type: movieActionTypes.SET_LOADING,
        payload: isLoading
    };
};

export type MovieAction = FetchMoviesAction | setError | setloading;

export const fetchMovies = () => {
    return async (dispatch: Dispatch) => {
        try {
            setMovieLoading(true);
            const response = await moviesApi.get('/');
            setMovieLoading(false);
            if (response.status === 200) {
                dispatch(fetchCurrentMovies(response.data));
            }
        } catch (error) {
            setMovieError(JSON.stringify(error));
            setMovieLoading(false);
        }
    };
};

const fetchCurrentMovies = (movies: MovieModel[]) => {
    return {
        type: movieActionTypes.FETCH_MOVIES,
        payload: movies
    };
};
