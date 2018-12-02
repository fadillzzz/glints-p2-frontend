import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'reactstrap';
import {getCollections} from './actions/Collection';
import {Link} from 'react-router-dom';

class Collection extends Component {
    componentDidMount() {
        this.props.getCollections();
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

const mapStateToProps = state => ({data: state.collection.collections});
const mapDispatchToProps = dispatch => ({
    getCollections: () => dispatch(getCollections())
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
