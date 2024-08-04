import { combineReducers } from 'redux';
import { AuthenticationModel } from '../models/user.model';
import { MovieHash, MovieObj } from '../models/movie.model';
import { authReducer } from './auth.reducer';
import { movieReducer } from './movie.reducer';
import { VoteConnection } from '../models/vote.model';
import { voteConnectionReducer } from './vote.reducer';


export interface StoreState {
    user: AuthenticationModel;
    movieObj: MovieObj;
    voteConnection: VoteConnection;
}

export const reducers = combineReducers<StoreState>({
    user: authReducer,
    movieObj: movieReducer,
    voteConnection: voteConnectionReducer
});
