import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { todos: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    handleTodoDelete = todoId => {
        fetch('todo/' + todoId, { method: 'delete' }).then(data => {
            this.setState(
                {
                    todos: this.state.todos.filter((todo) => todo.id != todoId)
                });
        });
    }

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
                            <td>{todo.id}</td>
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
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
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
