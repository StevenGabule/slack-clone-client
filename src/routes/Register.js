import React, {Component} from 'react';
import {Button, Container, Form, Header, Input} from "semantic-ui-react";
import {Mutation} from 'react-apollo';
import {USER_REGISTER} from "../queries";

const style = {
    h1: {
        marginTop: '3em',
    },
    h2: {
        margin: '4em 0em 2em',
    },
    h3: {
        marginTop: '2em',
    },
    last: {
        marginBottom: '300px',
    },
};

const INITIAL_VALUE = {
    username: '',
    email: '',
    password: '',
};

class Register extends Component {
    state = {
        ...INITIAL_VALUE
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = (event, register) => {
        event.preventDefault();
        register().then(({data}) => {
            // this.clearState();
            console.log(data);
        })
    };

    clearState = () => {
        this.setState(...INITIAL_VALUE);
    };

    render() {
        const {email, username, password} = this.state;
        return (
            <Mutation mutation={USER_REGISTER} variables={{username, email, password }}>
                {(register, {data}) => {
                    return (
                        <Container text>
                            <Header as={'h2'} style={style.h3}>Register</Header>
                            <Form onSubmit={event => this.handleSubmit(event, register)}>
                                <Form.Field>
                                    <Input name={'username'}
                                           value={username}
                                           fluid
                                           placeholder={'Enter username'}
                                           onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Input name={'email'}
                                           type={'email'}
                                           value={email}
                                           fluid
                                           placeholder={'Enter email'}
                                           onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Input name={'password'}
                                           type={'password'}
                                           value={password} fluid
                                           placeholder={'Enter password'}
                                           onChange={this.handleChange}/>
                                </Form.Field>
                                <Button primary type='submit'>Submit</Button>
                            </Form>
                        </Container>
                    )
                }}
            </Mutation>
        )
    }
}

export default Register;
