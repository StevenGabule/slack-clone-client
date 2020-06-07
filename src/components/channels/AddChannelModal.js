import React, {Component} from 'react';
import {Button, Form,  Modal} from "semantic-ui-react";
import {NEW_CHANNEL, USER_TEAMS} from "../../queries";
import {Mutation} from "react-apollo";

const INITIAL_STATE = {
    name: '',
}

class AddChannelModal extends Component {
    state = {
        ...INITIAL_STATE
    };

    handleChange = e => {
        this.setState({name: e.target.value})
    };

     handleSubmit = async (event, createChannel) => {
        event.preventDefault();
           await createChannel().then(({data}) => {
               console.log(data);
               this.setState({...INITIAL_STATE});
               this.props.close();
           }).catch(err => console.log(err))
    };

    updateCache = (cache, {data: {createChannel}}) => {
        try {
            const {channel} = createChannel;
            const {teamId} = this.props;
            const data = cache.readQuery({query: USER_TEAMS});
            const teamIdx = data.allTeams.findIndex(x => x.id === parseInt(teamId));
            data.allTeams[teamIdx].channels.push(channel);
            cache.writeQuery({
                query: USER_TEAMS,
                data
            })
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const {open, close, teamId } = this.props;
        const {name} = this.state;
        return (
            <Mutation
                mutation={NEW_CHANNEL}
                variables={{ teamId: parseInt(teamId), name }}
                update={this.updateCache}
                refetchQueries={() => [{ query: USER_TEAMS, variables: { teamId}}]}
            >
                {(createChannel, {data, loading}) => {
                    return (
                        <Modal open={open} onClose={close}>
                            <Modal.Header>New Channel</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Form onSubmit={event => this.handleSubmit(event, createChannel)}>
                                        <Form.Field>
                                            <Form.Input
                                                value={name}
                                                name={'name'}
                                                onChange={this.handleChange}
                                                fluid
                                                label={'Channel Name'}/>
                                        </Form.Field>
                                        <Button color='black' onClick={close}>
                                            Nope
                                        </Button>
                                        <Button
                                            positive
                                            icon='checkmark'
                                            labelPosition='right'
                                            content="Save"
                                            type='submit'
                                        />
                                    </Form>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                            </Modal.Actions>
                        </Modal>

                    )
                }}
            </Mutation>

        );
    }
}

export default AddChannelModal;
