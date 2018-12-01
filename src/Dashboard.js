import React, {Component} from 'react';
import {Button, Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faList, faSignOutAlt, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Redirect, Route, Link} from 'react-router-dom';
import {logOut} from './actions/Register';
import Search from './Search';

class Dashboard extends Component {
    render() {
        const {match, token, logOut} = this.props;

        if (! token) {
            return <Redirect to="/" />;
        }

        return (
            <Row className="h-100">
                <Col md="3" style={{backgroundColor: '#20232a'}}>
                    <Row>
                        <Button className="nav-buttons" color="danger" onClick={logOut}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Button>
                    </Row>
                    <Row>
                        <Link className="nav-buttons" to={match.url}>
                            <Button className="nav-buttons">
                                <FontAwesomeIcon icon={faSearch} /> Search
                            </Button>
                        </Link>
                    </Row>
                    <Row>
                        <Link className="nav-buttons" to={`${match.url}/collections`}>
                            <Button className="nav-buttons">
                                <FontAwesomeIcon icon={faList} /> Collections
                            </Button>
                        </Link>
                    </Row>
                    <Row>
                        <Button className="nav-buttons" color="success">
                            <FontAwesomeIcon icon={faPlusSquare} /> New Collection
                        </Button>
                    </Row>
                </Col>
                <Col md="9" style={{overflowY: 'scroll'}}>
                    <Route exact path={match.path} component={Search} />
                    <Route path={`${match.path}/collections`} render={() => <div>Collections here</div>} />
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
