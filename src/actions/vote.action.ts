import { Dispatch } from "redux";
import { voteActionTypes } from "./types";
import { MovieModel } from "../models/movie.model";
import { VoteResponseModel } from "../models/vote.model";

export interface FetchVoteAction {
    type: voteActionTypes.FETCH_VOTES;
    payload: VoteResponseModel[];
}

export interface ToggleConnectionStatusAction {
    type: voteActionTypes.TOGGLE_CONNECTION_STATUS;
    payload: boolean;
}

export type VoteAction = FetchVoteAction | ToggleConnectionStatusAction;

export const fetchVotes = (Votes: VoteResponseModel[]) => {
    return {
        type: voteActionTypes.FETCH_VOTES,
        payload: Votes
    }
};

export const toggleConnectionStatus = (isConnected: boolean) => {
    return {
        type: voteActionTypes.TOGGLE_CONNECTION_STATUS,
        payload: isConnected
    }
};
