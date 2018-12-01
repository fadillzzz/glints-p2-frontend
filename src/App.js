import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'reactstrap';
import Register from './Register';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Container className="h-100">
          <Route exact path="/" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Container>
      </Router>
    );
  }
}

export default App;
