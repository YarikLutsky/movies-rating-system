export enum AuthActionTypes {
    AUTHENTICATED="AuthenticationActionTypes.AUTHENTICATED",
    NOT_AUTHENTICATED="AuthenticationActionTypes.NOT_AUTHENTICATED",
    UPDATE_CONNECTION="AuthenticationActionTypes.UPDATE_CONNECTION",
    SET_LOADING="AuthenticationActionTypes.SET_LOADING",
    SET_ERROR="AuthenticationActionTypes.SET_ERROR"
}

export enum movieActionTypes {
    FETCH_MOVIES = "movieActionTypes.FETCH_MOVIES",
    SET_LOADING="movieActionTypes.SET_LOADING",
    SET_ERROR="movieActionTypes.SET_ERROR"
}

export enum voteActionTypes {
    FETCH_VOTES = "voteActionTypes.FETCH_VOTES",
    TOGGLE_CONNECTION_STATUS= "voteActionTypes.TOGGLE_CONNECTION_STATUS"
}
