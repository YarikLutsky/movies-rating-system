import { MovieHash } from './models/movie.model';
import { VoteHash, VoteModel } from './models/vote.model';

export function convertVoteHashToArray(voteHash: VoteHash, movieHash: MovieHash): VoteModel[] {
    return Object.entries(voteHash).map(([key, value]) => ({
        id: Number(key),
        movieDescriptions: movieHash[Number(key)]?.description,
        ...value
    }));
}
