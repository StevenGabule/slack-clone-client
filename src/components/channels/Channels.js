import React from 'react';
import {Image, List} from "semantic-ui-react";
import {Query} from 'react-apollo';
import {USER_TEAMS} from "../../queries";

const Channels = ({currentTeamId}) => (
    <Query query={USER_TEAMS}>
        {({data, loading, error}) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
                <>
                    {data.allTeams.map(({id, channels}) => {
                        if (currentTeamId && channels.length > 0) {
                            return (
                                <>
                                    {channels.filter(channel => channel.teamId === parseInt(currentTeamId)).map(({id, name}) => {
                                            return (
                                                <List.Item key={id}>
                                                    <Image avatar
                                                           src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'/>
                                                    <List.Content>
                                                        <List.Header style={{color: '#fff'}}>
                                                            <p>{name}</p>
                                                        </List.Header>
                                                    </List.Content>
                                                </List.Item>
                                            )
                                        }
                                    )}
                                </>
                            )
                        }

                    })}
                </>
            )
        }}
    </Query>
);

export default Channels;

