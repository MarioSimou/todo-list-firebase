import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { FirebaseOptions, initializeApp } from 'firebase/app'
import { Redirect, Route, Router, Switch, } from 'react-router-dom'
import Home from '../pages/Home'
import Photos from '../pages/Photos'
import Navbar from "../shared/Navbar"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import { AuthProvider, AuthRoute } from '../../hooks/providers'
import SendResetPassword from "../pages/SendResetPassword"
import {createBrowserHistory} from 'history'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

initializeApp(firebaseConfig, 'todo-list')

const history = createBrowserHistory()

const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Router history={history} >
        <Navbar/>
        <Switch>
          <Route path="/sign-in" component={SignIn} exact/>
          <Route path="/sign-up" component={SignUp} exact/>
          <Route path="/send-reset-password" component={SendResetPassword} exact/>
          <AuthRoute path="/" exact>
            <Home/>
          </AuthRoute>
          <AuthRoute path="/photos" exact>
            <Photos/>          
          </AuthRoute>
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  </ChakraProvider>
)

export default App