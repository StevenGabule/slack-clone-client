import {observer} from "mobx-react";
import React, {Component} from "react";
import {extendObservable} from "mobx";
import {Mutation} from "react-apollo";
import {Button, Container, Form, Header, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {USER_LOGIN} from "../queries";
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            email: 'emailsomes21@gmail.com',
            password: 'password',
            userErrors: {},
        });
    }

    componentDidMount() {
        const {getCurrentUser} = this.props.session;
        if (getCurrentUser !== null) {
            this.props.history.push('/');
        }
    }

    handleChange = e => {
      const {name, value} = e.target;
      this[name] = value;
    };

    handleSubmit = (event, login) => {
        event.preventDefault();
        login().then(async ({data}) => {
           console.log(data);
           const {ok, token, refreshToken, errors} = data.login;
           if (ok) {
               localStorage.setItem('token', token);
               localStorage.setItem('refreshToken', refreshToken);
               await this.props.refetch();
               this.props.history.push('/');
           } else {
               const err = {};
               errors.forEach(({path, message}) => {
                   err[`${path}Error`] = message;
               });
               this.userErrors =  err;
           }
        });
    };

    render() {
        const {email, password, userErrors: { emailError, passwordError}} = this;
        const errorList = [];

        if (emailError) errorList.push(emailError);
        if (passwordError) errorList.push(passwordError);

        return (
            <Container text>
                <Header as={'h2'}>Login </Header>
                <Mutation mutation={USER_LOGIN} variables={{email, password}}>
                    {(login,{data, loading, error}) => {
                        return (
                            <>
                                <Form onSubmit={event => this.handleSubmit(event, login)}>
                                    <Form.Field>
                                        <Form.Input name={'email'}
                                                    type={'email'}
                                                    value={email}
                                                    fluid
                                                    placeholder={'Enter email'}
                                                    onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input  name={'password'}
                                                     type={'password'}
                                                     value={password}
                                                     fluid
                                                     placeholder={'Enter password'}
                                                     onChange={this.handleChange}/>
                                    </Form.Field>
                                    <Button color={'red'} type='submit'>Login</Button>
                                    <Link to={'/register'}>Register Here!</Link>
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

export default withRouter(observer(Login));
