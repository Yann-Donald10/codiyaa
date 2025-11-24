import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AuthPage from "../pages/AuthPage";
import ProjectPageList from "../pages/ProjectListPage";
import JoinSession from "../pages/SessionPage";
import SignupPage from "../pages/SignupPage";
import Workspace from "../pages/Workpage";
import Work from "../pages/Workspace";
import { useAuth } from '../context/AuthContext'

const AppRouter = () => {
  const { user, loading } = useAuth()
  
  if (loading) return <p>Chargement...</p>

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/ProjectPageList" /> : <AuthPage/>
          } 
        />
        <Route 
          path="/signup" 
          element={
            user ? <Navigate to="/ProjectPageList"  /> : <SignupPage />
          } 
        />
        <Route 
          path="/ProjectPageList" 
          element={
            user ? <ProjectPageList /> : <Navigate to="/" />
          } 
        />
        <Route path="/session" element={<JoinSession />} />
        <Route path="/workspace/:studentId" element={<Workspace />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
