import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import {Row, Col, Form, Button, Input} from 'reactstrap';
import {search} from './actions/Search';
import {addTo} from './actions/Collection';
import AddRestaurantModal from './AddRestaurantModal';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: null,
            searchDisabled: false,
            selected: null,
            addModalOpen: false
        };
    }

    updateFilter = date => {
        this.setState({dateTime: date});
    };

    search = async e => {
        e.preventDefault();

        if (! this.state.searchDisabled) {
            this.setState({searchDisabled: true});

            let dateTime = this.state.dateTime;

            if (dateTime) {
                dateTime = moment(dateTime).format('ddd H:mm A');
            } else {
                dateTime = '';
            }

            await this.props.search(dateTime);

            this.setState({searchDisabled: false});
        }
    };

    toggleModal = restaurant => {
        this.setState({addModalOpen: ! this.state.addModalOpen, selected: restaurant});
    };

    /**
     * Adds the selected restaurant to a collection
     *
     * @param {Object} collection
     */
    addTo = collection => {
        const {selected} = this.state;
        this.props.addTo(selected.id, collection.id);
        this.toggleModal();
    };

    render() {
        const {restaurants} = this.props.data;
        const {selected} = this.state;

        return (
            <div>
                <Form onSubmit={this.search}>
                    <h1>Search Restaurants</h1>
                    <Row>
                        <Col md="10">
                            <DatePicker
                                selected={this.state.dateTime}
                                onChange={this.updateFilter}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="Time"
                                placeholderText="Select a date and time to filter restaurants"
                                customInput={<Input />}
                            />
                        </Col>
                        <Col md="2">
                            <Button disabled={this.state.searchDisabled}>Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <div id="search-result" style={{display: restaurants.length === 0 ? 'none' : 'block'}}>
                    {restaurants.map((restaurant, index) => (
                        <Row key={index}>
                            <Col>
                                <Button className="add-to-collection" size="block" color="success" onClick={() => this.toggleModal(restaurant)}>
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                    <span className="name">{restaurant.name}</span>
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </div>
                <AddRestaurantModal open={this.state.addModalOpen} toggle={this.toggleModal}
                    restaurant={selected} add={this.addTo} />
            </div>
        );
    }
}

const mapStateToProps = state => ({data: state.search});
const mapDispatchToProps = dispatch => ({
    search: dateTime => dispatch(search(dateTime)),
    addTo: (restaurantId, collectionId) => dispatch(addTo(restaurantId, collectionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
