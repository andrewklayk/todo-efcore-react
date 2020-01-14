import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            todos: [], loading: true, newTodo: '', sorting: 'all', };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    handleTodoDelete = todoId => {
        fetch('todo/' + todoId, { method: 'delete' }).then(data => {
            this.setState(
                {
                    todos: this.state.todos.filter((todo) => todo.id !== todoId)
                });
        });
    }

    handleEnterPress = event => {
        if (event.key !== 'Enter') {
            return;
        }
        const todoToAdd = {
            value: this.state.newTodo
        };
        fetch('todo', { method: 'post', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(todoToAdd), }).then(
            this.setState({
                todos: [
                    ...this.state.todos,
                    todoToAdd
                ],
                newTodo: '',
            })
        );
    };

    handleInputChange = event => {
        this.setState({
            newTodo: event.target.value
        });
        console.log(this.state.newTodo);
    };

    static renderTodosTable(todos, deleteBtnHandler) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{todo.value}</td>
                            <td><button className="btn btn-primary btn-delete"
                                onClick={
                                    () => deleteBtnHandler(todo.id)
                                }
                            >
                            </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderTodosTable(this.state.todos, this.handleTodoDelete);

        return (
            <div>
                <textarea className="todo-input"
                    //ref={this.inputRef}
                    onChange={this.handleInputChange}
                    value={this.state.newTodo}
                    onKeyPress={this.handleEnterPress}
                    placeholder="Thine deeds of utmost importance..."
                />
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('todo');
        const data = await response.json();
        this.setState({ todos: data, loading: false });
    }
}
