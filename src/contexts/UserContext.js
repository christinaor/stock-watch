import { createContext } from 'react'

export const UserContext = createContext({
  username: null,
  isLoggedIn: false,
});