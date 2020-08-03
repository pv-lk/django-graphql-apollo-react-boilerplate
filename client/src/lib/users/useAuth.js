import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import TOKEN_AUTH from '../graphql/mutations/TokenAuth.graphql'

const authContext = createContext()

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={ auth }>
           { children }
         </authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)

  const signin = useMutation(TOKEN_AUTH, {
    onCompleted: data => {
      Cookies.set({}, 'JWT', data.tokenAuth.token)
    },
  })

  const signup = () => {
    return
  }

  const signout = () => {
    return
  }

  const sendPasswordResetEmail = email => {
    return
  }

  const confirmPasswordReset = (code, password) => {
    return
  }

  useEffect(() => {
    const unsubscribe = () => { // onAuthStateChanged
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    }
  })

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  }
}
