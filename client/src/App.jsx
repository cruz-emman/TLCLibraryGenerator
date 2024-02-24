import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Sidebar from "./components/Sidebar";
import Users from "./page/Users";
import { Toaster } from "./components/ui/toaster";
import TLCLibrary from "./page/TLCLibrary";
import Dashboard from "./page/Dashboard";
import Sample from "./page/Sample";

const queryClient = new QueryClient();

const App = () => {
  const Layout = ({ children }) => (
    <div className="flex max-w-full mx-auto">
      <Sidebar />
      <div className="flex-1 w-full px-8 pt-4">{children}</div>
      <Toaster />
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
      
    },
    {
      path: "/users",
      element: (
        <Layout>
          <Users />
        </Layout>
      ),
    },
    {
      path: "/tlc",
      element: (
        <Layout>
          <TLCLibrary />
        </Layout>
      ),
    },
    {
      path:'/sample',
      element: <Layout>
        <Sample />
      </Layout>
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
