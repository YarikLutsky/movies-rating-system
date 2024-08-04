import { MovieHash, MovieObj } from '../models/movie.model';
import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Votings from '../components/Votings';
import { VoteConnection, VoteResponseModel } from '../models/vote.model';
import useSignalR from '../hooks/signalR';
import Header from '../components/Header';
import '../scss/pages/main.scss';
import { fetchMovies, fetchVotes, toggleConnectionStatus } from '../actions';
import { useEffect } from 'react';
import { interceptor } from '../apis/apiMiddleware';

interface MainPageProps {
    movieObj: MovieObj;
    token: string;
    voteConnection: VoteConnection;
    toggleConnectionStatus: Function;
    fetchVotes: Function;
    fetchMovies: Function;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<StoreState, void, Action>
) => {
    return {
        toggleConnectionStatus: (isConnected: boolean) => {
            dispatch(toggleConnectionStatus(isConnected));
        },
        fetchVotes: (votes: VoteResponseModel[]) => {
            dispatch(fetchVotes(votes));
        },
        fetchMovies: () => {
            dispatch(fetchMovies());
        }
    };
};

const mapStateToProps = ({ user }: StoreState) => {
    return {
        user  
    }
};

const _MainPage = ({
    movieObj,
    token,
    voteConnection,
    toggleConnectionStatus,
    fetchVotes,
    fetchMovies
}: MainPageProps): JSX.Element => {
    useSignalR(token, toggleConnectionStatus, fetchVotes);

    useEffect(() => {
        if (token) {
            interceptor();
            fetchMovies();
        }
    }, [token]);

    return (
        <div className="main-page">
            <div className="main-page__top">
                <Header isConnected={voteConnection.isConnected} lastUpdateDate={voteConnection.lastUpdateDate} />
            </div>
            <div className="main-page__bottom">
                <Votings movieObj={movieObj} votes={voteConnection.voteHash} />
            </div>
        </div>
    );
};

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(_MainPage);
