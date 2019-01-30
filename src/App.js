import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
//import uuid from "uuid";
import About from "./components/pages/About";

class App extends Component {

  state = {
    todos: []
  }

  //Toggle complete
  markComplete = (todoId) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  }

  componentDidMount() {
    Axios.get("https://my-json-server.typicode.com/lachlanpremier/lunch-db/posts")
      .then(response => {
        this.setState({ todos: response.data })
      });
  }

  //Delete todo
  delTodo = (todoId) => {
    Axios.delete(`https://my-json-server.typicode.com/lachlanpremier/lunch-db/posts/${todoId}`)
      .then(response => {
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== todoId)
        });
      })
  }

  //Add new todo
  addTodo = (newTodoTitle) => {
    Axios.post("https://my-json-server.typicode.com/lachlanpremier/lunch-db/posts",
      {
        title: newTodoTitle,
        completed: false
      })
      .then(response => {
        this.setState({
          todos: [...this.state.todos, response.data]
        })
      })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
