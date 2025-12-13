import AppRouter from "./routes/AppRouter";
import { AuthProvider } from './context/AuthContext'
import { EducatorProvider } from "./context/EducatorContext";
import useAutoLogout from "./hooks/AutoLogOut";

function App() {
   useAutoLogout(2 * 60 * 60 * 1000);
  return(
    <AuthProvider>
    <EducatorProvider>
      
        <AppRouter />
        </EducatorProvider>
      </AuthProvider>
      
  );
}

export default App;
