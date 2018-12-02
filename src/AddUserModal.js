import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Button,
    Alert
} from 'reactstrap';

class AddUserModal extends Component {
    render() {
        const {open, toggle, add, disabled, error} = this.props;

        return (
            <Modal isOpen={open} backdrop keyboard toggle={toggle}>
                <Form onSubmit={add}>
                    <ModalHeader toggle={toggle}>
                        Add Collaborators
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input name="email" type="email" required placeholder="email@address.com" />
                        </FormGroup>
                        <Alert color="danger" isOpen={!!error}>
                            {error}
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button disabled={disabled}>Add</Button>
                        <Button onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default AddUserModal;
