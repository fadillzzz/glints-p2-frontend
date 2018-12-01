import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import Logout from './Logout';

class Dashboard extends Component {
    render() {
        return (
            <Row className="h-100">
                <Col md="3" style={{backgroundColor: '#20232a'}}>
                    <Logout />
                </Col>
                <Col md="9">
                    // Main content
                </Col>
            </Row>
        );
    }
}

export default Dashboard;
