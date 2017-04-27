const appState = {
  title: {
    text: 'React.js',
    color: 'blue'
  },
  content: {
    text: 'angular4',
    color: 'red'
  }
}


function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  renderTitle(newAppState.title)
  renderContent(newAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}
// // 首次渲染
// renderApp(appState)

// function dispatch(action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       appState.title.text = action.text
//       break
//     case 'UPDATE_TITLE_COLOR':
//       appState.title.color = action.color
//       break
//     default:
//       break
//   }
// }
//
// dispatch({type: 'UPDATE_TITLE_TEXT', text: 'React+Redux'})
// dispatch({type: 'UPDATE_TITLE_COLOR', color: 'green'})

// // dispatch后渲染
// renderApp(appState)


function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe}
}

function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

const store = createStore(appState, stateChanger)
let oldStore = store.getState()
store.subscribe(()=> {
  const newState = store.getState()
  renderApp(newState, oldStore)
  oldStore = newState
})

renderApp(store.getState()) // 首次渲染
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'React+Redux'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'green'})
// renderApp(store.getState())