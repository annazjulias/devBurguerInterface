import { CardProvider } from "./cartcontext";
import { UserProvider } from "./usercontext";

const AppProvider = ({ children }) => {
  return <UserProvider>
    <CardProvider>{children}</CardProvider>
  </UserProvider>

}


export default AppProvider;