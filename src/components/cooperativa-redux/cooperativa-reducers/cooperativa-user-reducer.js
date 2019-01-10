const initial = {
  user: {}
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.user
      })

    case 'DELETE_USER': {
      delete state.user

      return state.user
    }

    default:
      return state
  }
};
