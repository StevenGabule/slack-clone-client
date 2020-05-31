import React from 'react';
import {Image, List} from "semantic-ui-react";

function Messages({messages}) {
    return (
        <>
            {messages.map((msg) => (
                <List.Item key={msg}>
                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg'/>
                    <List.Content>
                        <List.Header style={{color: '#fff'}}>{msg}</List.Header>
                    </List.Content>
                </List.Item>
            ))}
        </>
    );
}

export default Messages;
