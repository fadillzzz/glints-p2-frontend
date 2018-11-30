import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'reactstrap';
import Register from './Register';

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Route path="/register" component={Register} />
        </Router>
      </Container>
    );
  }
}

export default App;
