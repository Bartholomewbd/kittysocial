import * as constantsJs from "./constants.js";

export const setSearchField = text => ({
  type: constantsJs.CHANGE_SEARCHFIELD,
  payload: text
});

export const requestKittys = () => dispatch => {
  dispatch({ type: constantsJs.REQUEST_KITTYS_PENDING });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data =>
      dispatch({ type: constantsJs.REQUEST_KITTYS_SUCCESS, payload: data })
    )
    .catch(error =>
      dispatch({ type: constantsJs.REQUEST_KITTYS_FAILED, payload: error })
    );
};
