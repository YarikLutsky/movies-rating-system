import { LoginPage } from './pages/Login';
import './scss/app.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { StoreState } from './reducers';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { AuthenticationModel } from './models/user.model';
import { MovieHash, MovieObj } from './models/movie.model';
import { VoteConnection } from './models/vote.model';
import BodyPage from './pages/Body';
import {MainPage} from './pages/Main';

interface AppProps {
    user: AuthenticationModel;
    movieObj: MovieObj;
    voteConnection: VoteConnection;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<StoreState, void, Action>
) => {
    return {};
};

const mapStateToProps = ({ user, voteConnection, movieObj }: StoreState) => {
    return {
        user,
        voteConnection,
        movieObj
    };
};

function _App({ user, movieObj, voteConnection }: AppProps) {
    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BodyPage />}>
                        <Route index element={<LoginPage />} />
                        <Route
                            path="main"
                            element={<MainPage voteConnection={voteConnection} movieObj={movieObj} token={user?.token || ''} />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
