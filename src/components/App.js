import React from 'react'
import firebase from 'firebase'
const App = props => {

  React.useEffect(() => {
    firebase.firestore().collection('tasks').get().then(snapshot => {
      console.log(snapshot.docs.map(doc => ({ id:doc.id, ...doc.data()})))
    })
  }, [])
  return (
    <div>
      hello world
    </div>
  )
}

export default App