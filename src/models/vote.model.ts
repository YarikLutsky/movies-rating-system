export interface VoteResponseModel {
    generatedTime: Date;
    itemId: number;
    itemCount: number;
}

export enum PositionChange {
    Up = 'up',
    Down = 'down',
    Same = 'same'
}

export interface LastUpdate {
    time: Date,
    amount: number
}

export interface VoteHash {
    [key: number]: {
        totalVotes: number;
        lastUpdated: Date;
        positionChange: PositionChange;
        lastUpdates: LastUpdate[]
    };
}
export interface VoteConnection {
    voteHash: VoteHash;
    lastUpdateDate: Date | undefined;
    isConnected: boolean;
}

export interface VoteModel {
    id?: string;
    movieDescriptions?: string;
    totalVotes: number;
    lastUpdated: Date;
    positionChange: PositionChange;
    lastUpdates: LastUpdate[];
}
