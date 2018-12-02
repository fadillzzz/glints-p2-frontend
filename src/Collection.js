import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'reactstrap';
import {getCollections} from './actions/Collection';
import {Link} from 'react-router-dom';

class Collection extends Component {
    componentDidMount() {
        this.props.getCollections();
    }

    render() {
        const {match} = this.props;
        const {collections} = this.props.data;

        return (
            <div>
                {collections.map((collection, index) => (
                    <Row key={index} className="collection-list-item">
                        <Col>
                            <Link to={`${match.url}/${collection.id}`}>
                                <Button color="primary">
                                    {collection.name}
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({data: state.collection});
const mapDispatchToProps = dispatch => ({
    getCollections: () => dispatch(getCollections())
});

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
