import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import "./styles/App.css";

const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
const LogInPage = lazy(() => import("./pages/LogInPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.jsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <LogInPage /> },
  { path: "/password/forgot", element: <ForgotPasswordPage /> },
  { path: "/password/reset/:token", element: <ResetPasswordPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);


function App() {

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
       </Suspense>
    </>
  )
}

export default App
