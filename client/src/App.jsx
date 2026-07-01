
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import SavedJobs from './components/SavedJobs'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import JobApplicants from './components/admin/JobApplicants'
import PrivateRoute from './components/shared/PrivateRoute'

const appRouter = createBrowserRouter([

  // for student role


  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <PrivateRoute><Profile /></PrivateRoute>
  },
  {
    path: "/saved-jobs",
    element: <PrivateRoute allowedRoles={["student"]}><SavedJobs /></PrivateRoute>
  },


  // for admin role
  {
    path: "/admin/companies",
    element: <PrivateRoute allowedRoles={["recruiter"]}><Companies /></PrivateRoute>
  },
  {
    path: "/admin/companies/create",
    element: <PrivateRoute allowedRoles={["recruiter"]}><CompanyCreate /></PrivateRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <PrivateRoute allowedRoles={["recruiter"]}><CompanySetup /></PrivateRoute>
  },
  {
    path: "/admin/jobs",
    element: <PrivateRoute allowedRoles={["recruiter"]}><AdminJobs /></PrivateRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <PrivateRoute allowedRoles={["recruiter"]}><PostJob /></PrivateRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <PrivateRoute allowedRoles={["recruiter"]}><JobApplicants /></PrivateRoute>
  },



])

function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
