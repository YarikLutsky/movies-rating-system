export interface MovieModel {
    id: string;
    description: string;
}

export interface MovieHash {
    [id: string]: MovieModel;
}

export interface MovieObj {
    movieHash: MovieHash;
    loading?: boolean;
    error?: string;
}
