import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

class NewCollectionModal extends Component {
    render() {
        const {open, toggle, submit, disabled} = this.props;

        return (
            <Modal isOpen={open} backdrop keyboard toggle={toggle}>
                <ModalHeader toggle={toggle}>New Collection</ModalHeader>
                <Form onSubmit={submit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="collection-name">Collection name:</Label>
                            <Input id="collection-name" name="name" required
                                placeholder="My collection" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" disabled={disabled}>Create</Button>
                        <Button onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default NewCollectionModal;
