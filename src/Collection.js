import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'reactstrap';
import {getCollections, editSuccess} from './actions/Collection';
import {Link} from 'react-router-dom';

class Collection extends Component {
    constructor(props) {
        super(props);

        if (props.socket) {
            props.socket.on('edit-collection', collection => {
                props.editSuccess(collection.name, collection.id);
            });
        }
    }

    componentDidMount() {
        this.props.getCollections();
    }

    componentWillUnmount() {
        const {socket} = this.props;

        if (socket) {
            socket.removeAllListeners('edit-collection');
        }
    }

    renderItem = collection => {
        const {match} = this.props;

        return (
            <Link to={`${match.url}/${collection.id}`}>
                <Button color="primary" size="block">
                    {collection.name}
                </Button>
            </Link>
        );
    }

    render() {
        const {data: collections} = this.props;
        const itemRenderer = this.props.renderItem || this.renderItem;

        return (
            <div>
                {collections.map((collection, index) => (
                    <Row key={index} className="collection-list-item">
                        <Col>
                            {itemRenderer(collection)}
                        </Col>
                    </Row>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.collection.collections,
    socket: state.socket.socket
});
const mapDispatchToProps = dispatch => ({
    getCollections: () => dispatch(getCollections()),
    editSuccess: (name, id) => dispatch(editSuccess(name, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
