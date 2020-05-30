import {observer} from "mobx-react";
import React, {Component} from "react";
import {extendObservable} from "mobx";
import {Mutation} from "react-apollo";
import {Button, Container, Form, Header, Message} from "semantic-ui-react";
import {NEW_TEAM} from "../queries";

class CreateTeam extends Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            name: 'New Team Name',
            userErrors: {},
        });
    }

    handleChange = e => {
        const {name, value} = e.target;
        this[name] = value;
    };

    handleSubmit = (event, createTeam) => {
        event.preventDefault();
        createTeam().then(({data}) => {
            console.log(data);
            const {ok, errors = {}} = data.createTeam;
            if (ok) {
                this.props.history.push('/');
            } else {
                const err = {};
                errors.forEach(({path, message}) => {
                    err[`${path}Error`] = message;
                });
                this.userErrors = err;
            }
        });
    };

    render() {
        const {name, userErrors: {nameError}} = this;
        const errorList = [];

        if (nameError) {
            errorList.push(nameError)
        }

        return (
            <Container text>
                <Header as={'h2'} style={{marginTop: '5%'}}>Create Team </Header>
                <Mutation mutation={NEW_TEAM} variables={{name}}>
                    {(createTeam, {data, loading, error}) => {
                        return (
                            <>
                                <Form onSubmit={event => this.handleSubmit(event, createTeam)}>
                                    <Form.Field>
                                        <Form.Input name={'name'}
                                                    value={name}
                                                    error={!!nameError}
                                                    fluid
                                                    placeholder={'Type new team'}
                                                    onChange={this.handleChange}/>
                                    </Form.Field>

                                    <Button color={'blue'} type='submit'>Create Team</Button>
                                </Form>
                                {errorList.length > 0 ? (
                                    <Message
                                        error
                                        list={errorList}/>
                                ) : null}
                            </>
                        )
                    }}
                </Mutation>
            </Container>
        )
    }
}

export default observer(CreateTeam);
