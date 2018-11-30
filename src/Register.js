import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {register} from './actions/Register';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    submitForm = e => {
        e.preventDefault();
        this.props.register(this.state.email, this.state.password);
    }

    updateForm = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <Form onSubmit={this.submitForm}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" required
                            placeholder="user@email.com" value={this.state.email}
                            onChange={this.updateForm} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" required
                            placeholder="********" value={this.state.password}
                            onChange={this.updateForm} />
                    </FormGroup>
                    <Button>Submit</Button>
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
