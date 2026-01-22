import { UserProvider } from "./usercontext";

const AppProvider = ({ children }) => {
  return <UserProvider>
    {children}
  </UserProvider>
}


export default AppProvider;