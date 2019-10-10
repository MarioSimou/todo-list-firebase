import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from './utils/theme'

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>, document.getElementById('app'))