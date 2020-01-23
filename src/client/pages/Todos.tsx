import React from 'react';
import { Helmet } from 'react-helmet';

import TodoList from '../components/TodoList';

const Todos = () => (
    <div>
        <Helmet>
            <title>My App | Todo List Page</title>
            <meta name="description" content="Todo List Page" />
        </Helmet>
        <h1>TODO LIST</h1>
        <TodoList />
    </div>
);

export default Todos;
