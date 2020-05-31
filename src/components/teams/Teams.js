import React from 'react';
import {Image, List} from "semantic-ui-react";
import {Query} from 'react-apollo';
import {USER_TEAMS} from "../../queries";
import {Link} from "react-router-dom";

const Teams = () => (
    <Query query={USER_TEAMS}>
        {({data, loading, error}) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
                <>
                    {data.allTeams.map(({id, name}) => (
                        <List.Item key={id}>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'/>
                            <List.Content>
                                <List.Header style={{color: '#fff'}}>
                                    <Link to={`/view-team/${id}`}>{name}</Link>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    ))}
                </>
            )
        }}
    </Query>
);

export default Teams;
