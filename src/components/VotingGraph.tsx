import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { VoteModel } from '../models/vote.model';

interface VotingGraphProps {
    vote: VoteModel;
}

const VotingGraph = ({ vote }: VotingGraphProps) => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const labels = vote.lastUpdates.map((item) =>
            new Date(item.time).toLocaleTimeString()
        );
        const data = vote.lastUpdates.map((item) => item.amount);

        const initialChartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Votes Received',
                    backgroundColor: '#42A5F5',
                    data: data
                }
            ]
        };

        setChartData(initialChartData);
    }, [vote]);
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (
        <div>
            <div className="card">
                {chartData && (
                    <Chart type="bar" data={chartData} options={options} />
                )}
            </div>
        </div>
    );
};

export default VotingGraph;
