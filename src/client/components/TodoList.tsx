import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../action/todos';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinput: ''
        };
    }

    componentDidMount() {
        const { fetchTodos } = this.props;
        fetchTodos();
    }

    handleSubmit = event => {
        const { postTodos } = this.props;
        const { userinput } = this.state;
        event.preventDefault();
        postTodos(userinput);

        this.setState({ userinput: '' });
    };

    handleInputChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    render() {
        const { todos } = this.props;
        const { userinput } = this.state;

        return (
            <div>
                <ul>
                    {todos.map(({ id, text }) => (
                        <li key={id}>{text}</li>
                    ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="userinput"
                        autoComplete="off"
                        onChange={this.handleInputChange}
                        value={userinput}
                    />
                    <button type="submit">submit</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    fetchTodos: PropTypes.func.isRequired,
    postTodos: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    fetchTodos: action.fetchTodos,
    postTodos: action.postTodos
})(TodoList);
