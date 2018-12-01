import React, {Component} from 'react';
import {Row, Button} from 'reactstrap';

const buttonStyle = {
    width: '100%',
    borderRadius: 0
};

class Logout extends Component {
    logout = e => {
        console.log('logging out');
    }

    render() {
        return (
            <Row>
                <Button style={buttonStyle} color="danger" onClick={this.logout}>
                    Logout
                </Button>
            </Row>
        );
    }
}

export default Logout;
