import * as React from "react"
import { ChakraProvider, theme } from "@chakra-ui/react"
import { FirebaseOptions, initializeApp } from 'firebase/app'
import { HashRouter, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from "../shared/Navbar"

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

const App = () => (
  <ChakraProvider theme={theme}>
    <HashRouter>
      <Navbar/>
      <Route path="/home" component={Home} exact/>
    </HashRouter>
  </ChakraProvider>
)

export default App