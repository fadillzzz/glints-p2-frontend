import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import Collection from './Collection';

class AddRestaurantModal extends Component {
    render() {
        const {open, toggle, restaurant, add} = this.props;

        return (
            <Modal isOpen={open} backdrop keyboard toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add {restaurant && restaurant.name} to a Collection
                </ModalHeader>
                <ModalBody>
                    <Collection renderItem={collection => (
                        <Button color="success" size="block" onClick={() => add(collection)}>
                            {collection.name}
                        </Button>
                    )} />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default AddRestaurantModal;
