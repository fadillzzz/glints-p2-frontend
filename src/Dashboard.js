import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {logOut} from './actions/Register';
import {create as createCollection, CREATE_SUCCESS} from './actions/Collection';
import Search from './Search';
import Collection from './Collection';
import NavButtons from './NavButtons';
import NewCollectionModal from './NewCollectionModal';
import CollectionDetail from './CollectionDetail';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            createDisabled: false
        };
    }

    toggleModal = () => {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    createCollection = async e => {
        e.preventDefault();

        if (! this.state.createDisabled) {
            this.setState({createDisabled: true});

            const action = await this.props.createCollection(e.target.name.value);

            if (action.type === CREATE_SUCCESS) {
                this.setState({createDisabled: false, modalOpen: false});
            }
        }
    }

    render() {
        const {email, match, token, logOut} = this.props;

        if (! token) {
            return <Redirect to="/" />;
        }

        return (
            <Row className="h-100">
                <Col md="3" id="sidebar">
                    <NavButtons email={email} logOut={logOut} searchUrl={match.url}
                        collectionUrl={`${match.url}/collections`}
                        newColModal={this.toggleModal} />
                </Col>
                <Col md="9" id="main-content">
                    <Route exact path={match.path} component={Search} />
                    <Route exact path={`${match.path}/collections`} component={Collection} />
                    <Route path={`${match.path}/collections/:id`} component={CollectionDetail} />
                </Col>
                <NewCollectionModal open={this.state.modalOpen} toggle={this.toggleModal}
                    submit={this.createCollection} disabled={this.state.createDisabled} />
            </Row>
        );
    }
}

const mapStateToProps = state => ({token: state.register.token, email: state.register.email});
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
    createCollection: (name) => dispatch(createCollection(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
