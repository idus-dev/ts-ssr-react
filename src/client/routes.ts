import Main from './pages/Main';
import Todos from './pages/Todos';

const routes = [
    { path: '/', name: 'main', exact: true, component: Main },
    { path: '/todos', name: 'todos list', exact: true, component: Todos }
];

export default routes;
