import React, {Component} from 'react';
import {Row, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faSearch, faList, faPlusSquare} from '@fortawesome/free-solid-svg-icons';

class NavButtons extends Component {
    render() {
        const {logOut, searchUrl, collectionUrl, newColModal} = this.props;

        return (
            <div>
                <Row>
                    <Button className="nav-buttons" color="danger" onClick={logOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Button>
                </Row>
                <Row>
                    <Link className="nav-buttons" to={searchUrl}>
                        <Button className="nav-buttons">
                            <FontAwesomeIcon icon={faSearch} /> Search
                        </Button>
                    </Link>
                </Row>
                <Row>
                    <Link className="nav-buttons" to={collectionUrl}>
                        <Button className="nav-buttons">
                            <FontAwesomeIcon icon={faList} /> Collections
                        </Button>
                    </Link>
                </Row>
                <Row>
                    <Button className="nav-buttons" color="success" onClick={newColModal}>
                        <FontAwesomeIcon icon={faPlusSquare} /> New Collection
                    </Button>
                </Row>
            </div>
        );
    }
}

export default NavButtons;
