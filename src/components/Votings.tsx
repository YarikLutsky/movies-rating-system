import { MovieObj } from '../models/movie.model';
import { PositionChange, VoteHash, VoteModel } from '../models/vote.model';
import { DataTable, DataTableSelectEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Moment from 'react-moment';
import { useEffect, useMemo, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { convertVoteHashToArray } from '../utils';
import '../scss/components/voting.scss';
import VotingGraph from './VotingGraph';
import { Dialog } from 'primereact/dialog';

interface VotingsProps {
    movieObj: MovieObj;
    votes: VoteHash;
}

const Votings = ({ movieObj, votes }: VotingsProps) => {
    const votesArray = movieObj.movieHash
        ? convertVoteHashToArray(votes, movieObj?.movieHash)
        : [];

    const [filters, setFilters] = useState({
        movieDescriptions: {
            value: null,
            matchMode: FilterMatchMode.STARTS_WITH
        }
    });

    const [selectedVote, setSelectedVote] = useState(null);

    const [displayGraph, setDisplayGraph] = useState(false);

    useEffect(() => {
        if (selectedVote) {
            setDisplayGraph(true);
        }
    }, [selectedVote]);

    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['movieDescriptions'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const dateTemplate = (rowData: VoteModel) => {
        return (
            <Moment format="DD/MM/yyyy HH:mm:ss">{rowData.lastUpdated}</Moment>
        );
    };

    const positionTemplate = (rowData: VoteModel) => {
        switch (rowData.positionChange) {
            case PositionChange.Up:
                return <i className="pi pi-arrow-up" style={{ fontSize: '1.5rem' }}></i>
            case PositionChange.Down:
                return <i className="pi pi-arrow-down" style={{ fontSize: '1.5rem' }}></i>
            default:
                return "Same"
        }
    };

    const onRowSelect = (event: DataTableSelectEvent) => {
        const currentVote = {...event.data};
        setSelectedVote(currentVote);
    };

    const memoizedVotingGraph = useMemo(() => {
        return selectedVote ? <VotingGraph vote={selectedVote} /> : null;
    }, [selectedVote]);

    return (
        <div className="voting">
            <div className="voting__table">
                <div className="voting__field">
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search Movie"
                    />
                </div>
                <div className="card">
                    <DataTable
                        value={votesArray}
                        tableStyle={{ minWidth: '30rem' }}
                        globalFilter={globalFilterValue}
                        globalFilterFields={['movieDescriptions']}
                        emptyMessage="No Movie Found"
                        loading={movieObj?.loading}
                        filters={filters}
                        onRowSelect={onRowSelect}
                        selectionMode="single"
                        selection={selectedVote}
                        filterDelay={0}
                    >
                        <Column
                            field="id"
                            header="ID"
                            sortable
                            style={{ width: '20%' }}
                        ></Column>
                        <Column
                            field="movieDescriptions"
                            header="Movie description"
                            sortable
                            style={{ width: '20%' }}
                            filter
                        ></Column>
                        <Column
                            field="totalVotes"
                            header="Total Votes"
                            sortable
                            style={{ width: '20%' }}
                        ></Column>
                        <Column
                            field="lastUpdated"
                            header="Last Updated"
                            body={dateTemplate}
                            sortable
                            style={{ width: '30%' }}
                        ></Column>
                        <Column
                            field="positionChange"
                            header=""
                            sortable
                            body={positionTemplate}
                            style={{ width: '10%' }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog
                header="Votes"
                style={{ width: '50vw' }}
                visible={displayGraph}
                className='custom-dialog'
                onHide={() => setDisplayGraph(false)}
            >
                {memoizedVotingGraph}
            </Dialog>
        </div>
    );
};

export default Votings;
