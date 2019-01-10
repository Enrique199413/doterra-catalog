const initial = {
  app: {}
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_APP_TITLE':
      return Object.assign({}, state, {
        app: {
          title: action.title
        }
      })

    default:
      return state
  }
};
