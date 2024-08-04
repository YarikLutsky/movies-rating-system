import { movieActionTypes, MovieAction } from '../actions';
import { MovieHash, MovieModel, MovieObj } from '../models/movie.model';

const initialState: MovieObj = {
    movieHash: {},
    error: '',
    loading: false
};

export function movieReducer(
    state: MovieObj = initialState,
    action: MovieAction
) {
    switch (action.type) {
        case movieActionTypes.FETCH_MOVIES:
            const movieHash: MovieHash = {};
            action.payload.forEach((movie: MovieModel) => {
                movieHash[movie.id] = movie;
            });
            return {
                ...state,
                movieHash
            };
        case movieActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case movieActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
}
