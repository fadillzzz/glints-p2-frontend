import React, {Component} from 'react';
import {Row, Button} from 'reactstrap';

const buttonStyle = {
    width: '100%',
    borderRadius: 0
};

class Logout extends Component {
    logOut = e => {
        this.props.logOut();
    }

    render() {
        return (
            <Row>
                <Button style={buttonStyle} color="danger" onClick={this.logOut}>
                    Logout
                </Button>
            </Row>
        );
    }
}

export default Logout;
