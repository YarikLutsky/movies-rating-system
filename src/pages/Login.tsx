import { StoreState } from '../reducers';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { login } from '../actions';
import { AuthenticationModel } from '../models/user.model';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { classNames } from 'primereact/utils';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import '../scss/pages/login.scss';

interface LoginPageProps {
    login: Function;
    user: AuthenticationModel;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<StoreState, void, Action>
) => {
    return {
        login: (authData: AuthenticationModel, callBack: Function) => {
            dispatch(login(authData, callBack));
        }
    };
};

const mapStateToProps = ({ user }: StoreState) => {
    return {
        user  
    }
};

const _LoginPage = ({ login, user }: LoginPageProps): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setSubmitted(true);

        if (username && password) {
            login({
                username,
                password
            }, (isAuth: boolean) => {
                setLoginFailed(false);
                if (isAuth) {
                    navigate(`/main`);
                }
                else {
                    setLoginFailed(true); 
                }
            });
        }
        else {
            setLoginFailed(true);
        }
    };

    return (
        <div className="login-page">
            <div className="login-page__card">
                <div className="login-page__title-wrapper">
                    <h2 className="login-page__title">Login</h2>
                </div>
                <form className="login-page__form" onSubmit={handleSubmit}>
                    <div className="login-page__field">
                        <label htmlFor="username">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={classNames({
                                'p-invalid': submitted && !username
                            })}
                        />
                        {submitted && !username && (
                            <small className="p-error">
                                Username is required.
                            </small>
                        )}
                    </div>
                    <div className="login-page__field">
                        <label htmlFor="password">Password</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            className={classNames({
                                'p-invalid': submitted && !password
                            })}
                        />
                        {submitted && !password && (
                            <small className="p-error">
                                Password is required.
                            </small>
                        )}
                    </div>

                    {loginFailed && (
                        <Message
                            className="login-page__message"
                            severity="error"
                            text="Invalid username or password."
                        />
                    )}
                    <Button disabled={user.loading} className="login-page__button" label="Login" />
                </form>
            </div>
        </div>
    );
};

export const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_LoginPage);
