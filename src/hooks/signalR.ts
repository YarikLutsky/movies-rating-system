import {
    HubConnectionBuilder,
    HubConnection,
    HttpTransportType
} from '@microsoft/signalr';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../globals';

const SIGNAL_URL: string = `${BASE_URL}/ClientHub`;

const useSignalR = (token: string, setConnectionStatus: Function, fetchVotes: Function) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        if (token) {
            const newConnection = new HubConnectionBuilder()
                .withUrl(SIGNAL_URL, {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets,
                    accessTokenFactory: () => token
                })
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }
    }, [token]);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log('Connected!');
                    setConnectionStatus(true);
                    connection.on('DataReceived', (data: string) => {
                        fetchVotes(data);
                    });
                })
                .catch((e) => console.log('Connection failed: ', e));

                connection.onclose((error) => {
                    if (error) {
                        console.error('On close error:', error);
                    } else {
                        console.log('Connection closed');
                    }
                    setConnectionStatus(false);
                    setConnection(null);
                });
        }

        return () => {
            if (connection) {
                connection.off('DataReceived');
                connection.stop().catch((error: Error) => console.error('Close connection error: ', error));
            }
        }
    }, [connection]);

    return {};
};

export default useSignalR;
