import React, {Component} from 'react';
import {Button, Container, Form, Header, Input, Message} from "semantic-ui-react";
import {Mutation} from 'react-apollo';
import {USER_REGISTER} from "../queries";
import {Link} from "react-router-dom";

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
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
};

class Register extends Component {
    state = {
        ...INITIAL_VALUE,
    };

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = async (event, register) => {
        event.preventDefault();
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: '',
        });
        await register().then(({data}) => {
            const {ok, errors} = data.register;
            if (ok) {
                this.props.history.push('/');
            } else {
                const err = {};
                errors.forEach(({path, message}) => {
                    err[`${path}Error`] = message;
                });
                this.setState(err);
            }
        });
    };

    validateForm = () => {
        const {username, email, password} = this.state;
        return !username || !email || !password;
    };

    clearState = () => {
        this.setState({...INITIAL_VALUE});
    };

    render() {
        const {email, emailError, username, usernameError, password, passwordError} = this.state;
        const errorList = [];
        if (usernameError) {
            errorList.push(usernameError);
        }

        if (emailError) {
            errorList.push(emailError);
        }

        if (passwordError) {
            errorList.push(passwordError);
        }
        return (
            <Mutation mutation={USER_REGISTER} variables={{username, email, password}}>
                {(register, {data, loading}) => {
                    return (
                        <Container text>
                            <Header as={'h2'} style={style.h3}>Register</Header>
                            <Form onSubmit={event => this.handleSubmit(event, register)}>
                                <Form.Field>
                                    <Form.Input error={!!usernameError} name={'username'}
                                                value={username}
                                                fluid
                                                placeholder={'Enter username'}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input error={!!emailError} name={'email'}
                                                type={'email'}

                                                fluid
                                                placeholder={'Enter email'}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input error={!!passwordError} name={'password'}
                                                type={'password'}

                                                value={password} fluid
                                                placeholder={'Enter password'}
                                                onChange={this.handleChange}/>
                                </Form.Field>
                                <Button color={'teal'} disabled={loading || this.validateForm()}
                                        type='submit'>Submit</Button>
                                    <Link to={'/login'}>Login Here!</Link>
                            </Form>
                            {errorList.length > 0 ? (
                                <Message
                                    error
                                    header={'There was some errors with your submission'}
                                    list={errorList}/>
                            ) : null}
                        </Container>
                    )
                }}
            </Mutation>
        )
    }
}

export default Register;
