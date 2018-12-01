import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Logout from './Logout';
import {logOut} from './actions/Register';

class Dashboard extends Component {
    render() {
        if (! this.props.token) {
            return <Redirect to="/" />;
        }

        return (
            <Row className="h-100">
                <Col md="3" style={{backgroundColor: '#20232a'}}>
                    <Logout logOut={this.props.logOut} />
                </Col>
                <Col md="9">
                    // Main content
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({token: state.register.token});
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
