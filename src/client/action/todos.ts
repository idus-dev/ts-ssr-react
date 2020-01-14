import api from "../api";

export const fetchTodosAction = payload => ({
  type: "FETCH_TODOS",
  payload
});

export const postTodosAction = payload => ({
  type: "POST_TODOS",
  payload
});

export const fetchTodos = () => dispatch => {
  api.todos
    .list()
    .then(res => {
      dispatch(fetchTodosAction(res));
    })
    .catch(err => {
      throw new Error(err);
    });
};

export const postTodos = payload => dispatch => {
  api.todos
    .post(payload)
    .then(res => {
      dispatch(postTodosAction(res));
    })
    .catch(err => {
      throw new Error(err);
    });
};
