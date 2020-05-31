import React from 'react';
import {Image, List} from "semantic-ui-react";

function Private({groups}) {
    return (
        <>
            {groups.map((grp) => (
                <List.Item key={grp}>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'/>
                    <List.Content>
                        <List.Header style={{color: '#fff'}}>{grp}</List.Header>
                    </List.Content>
                </List.Item>
            ))}
        </>
    );
}

export default Private;
