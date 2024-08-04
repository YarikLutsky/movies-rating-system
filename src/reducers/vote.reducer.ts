import { voteActionTypes, VoteAction } from '../actions';
import {
    LastUpdate,
    PositionChange,
    VoteConnection,
    VoteHash,
    VoteModel,
    VoteResponseModel
} from '../models/vote.model';

const initialState: VoteConnection = {
    isConnected: false,
    lastUpdateDate: undefined,
    voteHash: {}
};

export function voteConnectionReducer(
    state: VoteConnection = initialState,
    action: VoteAction
) {
    switch (action.type) {
        case voteActionTypes.FETCH_VOTES: {
            const newState: VoteConnection = { ...state };
            const voteHash = { ...newState.voteHash };

            action.payload.forEach((voteResponse: VoteResponseModel) => {
                updateVoteHash(voteHash, voteResponse);
            });

            const prevRanks = getSortedRanks(state.voteHash);
            const newRanks = getSortedRanks(voteHash);

            updatePositionChanges(voteHash, prevRanks, newRanks);

            newState.voteHash = voteHash;
            newState.lastUpdateDate = new Date();

            return newState;
        }
        case voteActionTypes.TOGGLE_CONNECTION_STATUS: {
            return {
                ...state,
                isConnected: action.payload,
                lastUpdateDate: undefined
            };
        }

        default:
            return state;
    }
}

function manageLastUpdates(lastUpdates: any, newUpdate: any) {
    const updatedLastUpdates = [...(lastUpdates || []), newUpdate];

    return updatedLastUpdates.slice(-20);
}

function updateVoteHash(
    voteHash: { [key: number]: VoteModel },
    voteResponse: VoteResponseModel
) {
    const currentItem = voteHash[voteResponse.itemId];
    const newUpdate: LastUpdate = {
        time: new Date(voteResponse.generatedTime),
        amount: voteResponse.itemCount
    };

    if (currentItem) {
        if (
            new Date(voteResponse.generatedTime) >
            new Date(currentItem.lastUpdated)
        ) {
            voteHash[voteResponse.itemId] = {
                ...currentItem,
                totalVotes: currentItem.totalVotes + voteResponse.itemCount,
                lastUpdated: new Date(voteResponse.generatedTime),
                lastUpdates: manageLastUpdates(
                    currentItem.lastUpdates,
                    newUpdate
                )
            };
        } else {
            voteHash[voteResponse.itemId] = {
                ...currentItem,
                totalVotes: currentItem.totalVotes + voteResponse.itemCount,
                lastUpdates: manageLastUpdates(
                    currentItem.lastUpdates,
                    newUpdate
                )
            };
        }
    } else {
        voteHash[voteResponse.itemId] = {
            totalVotes: voteResponse.itemCount,
            lastUpdated: new Date(voteResponse.generatedTime),
            positionChange: PositionChange.Same,
            lastUpdates: [newUpdate]
        };
    }
}

function getSortedRanks(voteHash: { [key: number]: VoteModel }): number[] {
    return Object.entries(voteHash)
        .sort(([, a], [, b]) => b.totalVotes - a.totalVotes)
        .map(([key]) => parseInt(key));
}

function updatePositionChanges(
    voteHash: { [key: number]: VoteModel },
    prevRanks: number[],
    newRanks: number[]
) {
    newRanks.forEach((itemId, index) => {
        const prevIndex = prevRanks.indexOf(itemId);
        if (prevIndex > index) {
            voteHash[itemId].positionChange = PositionChange.Up;
        } else if (prevIndex < index) {
            voteHash[itemId].positionChange = PositionChange.Down;
        } else {
            voteHash[itemId].positionChange = PositionChange.Same;
        }
    });
}
