export default function todos(state = [], action = {}) {
    switch (action.type) {
        case 'FETCH_TODOS':
            return action.payload;
        case 'POST_TODOS':
            return [...state, action.payload];
        default:
            return state;
    }
}
