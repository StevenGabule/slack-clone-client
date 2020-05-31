import React from 'react';
import { Header, Icon, List, Menu, Segment, Sidebar} from "semantic-ui-react";
import PropTypes from 'prop-types';

import Teams from "../components/teams/Teams";
import Messages from "../components/messages/Messages";
import Private from "../components/private/Private";
import Channels from "../components/channels/Channels";
import {withRouter} from "react-router-dom";


const VerticalSidebar = ({animation, direction, visible, currentTeamId}) => (
    <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        style={{backgroundColor: '#3700B3'}}
        inverted
        vertical
        visible={visible}
    >
        <Menu.Item name='inbox'>
            <Menu.Header>
                <Header as={'h3'} style={{color: 'white', paddingTop: '15px'}}><Icon name='braille' /> MeetBook</Header>
            </Menu.Header>
        </Menu.Item>

        <Menu.Item name='spam'>
            <Menu.Header>CHANNELS  <Icon name='add' style={{fontSize: '11px', color: 'white', float: 'right'}} /></Menu.Header>
            <List selection verticalAlign='middle'>
                <Channels currentTeamId={currentTeamId}/>
            </List>
        </Menu.Item>

        <Menu.Item name='spam'>
            <Menu.Header>TEAMS  <Icon name='add' style={{fontSize: '11px', color: 'white', float: 'right'}} /></Menu.Header>
            <List selection verticalAlign='middle'>
                <Teams/>
            </List>
        </Menu.Item>

        <Menu.Item name='updates'>
            <Menu.Header>DIRECT MESSAGES  <Icon name='add' style={{fontSize: '11px', color: 'white', float: 'right'}} /></Menu.Header>
            <List selection verticalAlign='middle'>
                <Messages messages={["Mike Ross", "Jane Doe", 'Mice Pro']} />
            </List>
        </Menu.Item>
        <Menu.Item name='private_groups'>
            <Menu.Header>PRIVATE GROUPS  <Icon name='add' style={{fontSize: '11px', color: 'white', float: 'right'}} /></Menu.Header>
            <List selection verticalAlign='middle'>
               <Private groups={["Joshua Gabule", "Gilberto Gabule", "Sheila Mae Gabule" ]} />
            </List>
        </Menu.Item>
    </Sidebar>
);

VerticalSidebar.propTypes = {
    animation: PropTypes.string,
    direction: PropTypes.string,
    visible: PropTypes.bool,
};


 const ViewTeam =  ({ match: {params} }) => (
     <div style={{height: '100vh'}}>
         <Sidebar.Pushable as={Segment}>
             <VerticalSidebar
                 animation={"slide along"}
                 direction={"left"}
                 visible={true}
                 currentTeamId={params.teamId}
             />
             <Sidebar.Pusher>
                 <Segment basic>
                     <Header as='h3'>What's going on?</Header>
                 </Segment>
             </Sidebar.Pusher>
         </Sidebar.Pushable>
     </div>
 );
export default withRouter(ViewTeam)

