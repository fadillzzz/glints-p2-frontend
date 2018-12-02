import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Input, Button, ButtonGroup} from 'reactstrap';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {
    getDetails,
    edit,
    removeFrom as remove,
    addUser,
    addSuccess,
    removeSuccess,
    editSuccess,
    ADD_USER_FAILURE
} from './actions/Collection';
import AddUserModal from './AddUserModal';

class CollectionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editDisabled: false,
            userModalOpen: false,
            addUserDisabled: false
        };

        if (props.socket) {
            props.socket.on('restaurant-added', restaurant => {
                props.addSuccess(restaurant);
            });

            props.socket.on('restaurant-removed', restaurant => {
                props.removeSuccess(restaurant);
            });

            props.socket.on('edit-collection', collection => {
                props.editSuccess(collection.name, collection.id);
            });
        }
    }

    componentDidMount() {
        const {match} = this.props;
        this.props.getDetails(match.params.id);
    }

    componentWillUnmount() {
        const {socket} = this.props;

        if (socket) {
            ['restaurant-added', 'restaurant-removed', 'edit-collection'].forEach(name => {
                socket.removeAllListeners(name);
            });
        }
    }

    toggleUserModal = e => {
        e.preventDefault();
        this.setState({userModalOpen: ! this.state.userModalOpen});
    };

    updateName = async e => {
        e.preventDefault();
        this.setState({editDisabled: true});
        await this.props.edit(this.props.collection.id, e.target.name.value);
        this.setState({editDisabled: false});
    };

    removeRestaurant = (e, restaurant) => {
        e.preventDefault();

        const {remove, collection} = this.props;
        remove(collection.id, restaurant.id);
    };

    addUser = async e => {
        e.preventDefault();
        if (! this.state.addUserDisabled) {
            this.setState({addUserDisabled: true});
            const {collection, addUser} = this.props;
            const action = await addUser(collection.id, e.target.email.value);

            if (action.type !== ADD_USER_FAILURE) {
                this.setState({userModalOpen: false});
            }

            this.setState({addUserDisabled: false});
        }
    };

    render() {
        const {collection, match, addUserError} = this.props;

        if (! collection || collection.id !== match.params.id) {
            return <div />;
        }

        return (
            <div>
                <Form onSubmit={this.updateName}>
                    <Row>
                        <Col>
                            <h1>{collection.name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="10">
                            <FormGroup>
                                <Input name="name" required placeholder="New collection name" />
                            </FormGroup>
                        </Col>
                        <Col md="2">
                            <ButtonGroup>
                                <Button color="success" disabled={this.state.editDisabled}>Edit</Button>
                                <Button color="success" onClick={this.toggleUserModal}>Add Users</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Collaborators: {collection.users.map(u => u.email).join(', ')}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {collection.restaurants.map((restaurant, index) => (
                                <Row key={index}>
                                    <Col>
                                        <Button className="remove-from-collection" onClick={e => this.removeRestaurant(e, restaurant)}>
                                            <FontAwesomeIcon icon={faTimes} color="red" />
                                            <span className="name">{restaurant.name}</span>
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </Form>
                <AddUserModal open={this.state.userModalOpen} toggle={this.toggleUserModal}
                    add={this.addUser} disabled={this.state.addUserDisabled} error={addUserError} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    collection: state.collection.selected,
    error: state.collection.editError,
    addUserError: state.collection.addUserError,
    socket: state.socket.socket
});
const mapDispatchToProps = dispatch => ({
    getDetails: (id) => dispatch(getDetails(id)),
    edit: (id, name) => dispatch(edit(id, name)),
    remove: (id, restaurant) => dispatch(remove(restaurant, id)),
    addUser: (id, email) => dispatch(addUser(id, email)),
    addSuccess: restaurant => dispatch(addSuccess(restaurant)),
    removeSuccess: restaurant => dispatch(removeSuccess(restaurant)),
    editSuccess: (name, id) => dispatch(editSuccess(name, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
