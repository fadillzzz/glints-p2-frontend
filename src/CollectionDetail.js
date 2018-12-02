import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Input, Button, ButtonGroup} from 'reactstrap';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {getDetails, edit, removeFrom as remove} from './actions/Collection';

class CollectionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editDisabled: false
        };
    }

    componentDidMount() {
        const {match} = this.props;
        this.props.getDetails(match.params.id);
    }

    toggleUserModal = e => {
        e.preventDefault();
        console.log('toggle modal');
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

    render() {
        const {collection, match} = this.props;

        if (! collection || collection.id !== match.params.id) {
            return <div />;
        }

        return (
            <Form onSubmit={this.updateName}>
                <Row>
                    <Col>
                        <h1>{collection.name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md="10">
                        <FormGroup>
                            <Input name="name" placeholder="New collection name" />
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
        );
    }
}

const mapStateToProps = state => ({
    collection: state.collection.selected,
    error: state.collection.editError
});
const mapDispatchToProps = dispatch => ({
    getDetails: (id) => dispatch(getDetails(id)),
    edit: (id, name) => dispatch(edit(id, name)),
    remove: (id, restaurant) => dispatch(remove(restaurant, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
