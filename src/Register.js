import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {REGISTER_FAILURE, register} from './actions/Register';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: false
        };
    }

    submitForm = async e => {
        e.preventDefault();
        this.setState({submitDisabled: true});

        const {email, password} = e.target;

        const action = await this.props.register(email.value, password.value);

        if (action.type === REGISTER_FAILURE) {
            // Only restore the button in case of a failure, because we're gonna
            // redirect the user otherwise.
            this.setState({submitDisabled: false});
        }
    }

    render() {
        const {error} = this.props.data;

        if (localStorage.authToken) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div>
                <Form onSubmit={this.submitForm}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" required
                            placeholder="user@email.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" required
                            placeholder="********" />
                    </FormGroup>
                    <Alert color="danger" isOpen={!!error}>
                        {error}
                    </Alert>
                    <Button disabled={this.state.submitDisabled}>Sign in / Register</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({data: state.register});
const mapDispatchToProps = dispatch => ({
    register: (...args) => dispatch(register(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
