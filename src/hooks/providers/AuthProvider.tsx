import React from 'react'
import { User } from 'firebase/auth'
import { signInWithEmailAndPassword, getAuth, signOut as signOutFirebase } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { Route, Redirect, RouteProps} from 'react-router-dom'

export type Props = {
    user: User | undefined,
    setUser: (user: User) => void
    resetUser: () => void
}

const AuthProvider = React.createContext<Props>({} as Props)

export const useAuth = () => {
    const {user, setUser, resetUser} = React.useContext(AuthProvider)
    const app = React.useMemo(() => getApp('todo-list'), [])
    const auth = React.useMemo(() => getAuth(app), [app])

    const signIn = React.useCallback(async (email: string, password: string): Promise<[Error | undefined, User | undefined ]> => {
        try {
            const {user} = await signInWithEmailAndPassword(auth, email,password)
            setUser(user)
            return [undefined, user]
        }catch(e){
            return [e, undefined]
        }
    }, [auth, setUser])

    const signOut = React.useCallback(() => {
        signOutFirebase(auth)
        return resetUser()
    }, [auth, resetUser])

    return {
        user,
        setUser,
        signIn,
        signOut,
    }
}

const Auth: React.FC<{children: React.ReactElement}> = ({children}) => {    
    const [user, setCurrentUser] = React.useState<User | undefined>(undefined)
    const setUser = React.useCallback((user: User): void => {
        return setCurrentUser(() => user)
    }, [setCurrentUser])
    const resetUser = React.useCallback(() => {
        return setCurrentUser(undefined)
    },[setCurrentUser])

    return (
        <AuthProvider.Provider value={{user, setUser, resetUser}}>
            {children}
        </AuthProvider.Provider>
    )
}

export const AuthRoute: React.FC<RouteProps & {children: React.ReactElement}> = ({children, ...rest}) => {
    const {user} = useAuth()

    return <Route {...rest} render={({location}) => {
      if(!user){
        const to = `/sign-in?redirectTo=${location.pathname}`
        return <Redirect to={to}/>
      }
  
      return children
    }}/>
  }

export default Auth