import axios from 'axios';

export default {
    todos: {
        list: () => axios.get('/api/todos').then(res => res.data),
        post: text => axios.post('/api/todos', { text }).then(res => res.data)
    }
};
