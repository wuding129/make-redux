// const appState = {
//   title: {
//     text: 'React.js',
//     color: 'blue'
//   },
//   content: {
//     text: 'angular4',
//     color: 'red'
//   }
// }


function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return
  console.log('render content')
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


function createStore(reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { getState, dispatch, subscribe}
}

function reducer(state, action) {
  if (!state){
    return {
      title: {
        text: 'react.js',
        color: 'red'
      },
      content: {
        text: 'angular',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      // 构建新的对象并且返回
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    case 'UPDATE_CONTENT_TEXT':
      // 构建新的对象并且返回
      return {
        ...state,
        content: {
          ...state.content,
          text: action.text
        }
      }
    case 'UPDATE_CONTENT_COLOR':
      return {
        ...state,
        content: {
          ...state.content,
          color: action.color
        }
      }
    default:
      return state
  }
}

const store = createStore(reducer)
let oldStore = store.getState()
store.subscribe(()=> {
  const newState = store.getState()
  renderApp(newState, oldStore)
  oldStore = newState
})

renderApp(store.getState()) // 首次渲染
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'React'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'green'})
store.dispatch({type: 'UPDATE_CONTENT_COLOR', color: 'green'})
// renderApp(store.getState())