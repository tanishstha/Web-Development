import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/login.tsx";
import Registration from "./Pages/Registration.tsx";
import About from "./Pages/about.tsx";
import ForgotPassword from "./Pages/forgotPassword.tsx";
import ContactUs from "./Pages/contactUs.tsx";
import { ToastContainer } from "react-toastify";
import MenPage from "./Pages/MenPage.tsx";
import WomenPage from "./Pages/WomenPage.tsx";
import KidsPage from "./Pages/KidsPage.tsx";
import AdminPanel from "./Pages/adminpanel.tsx";
import NewPage from "./Pages/Newpage.tsx";
import SalesPage from "./Pages/sales.tsx";
import AdminDashboard from "./components/admindashboard.tsx";
import Whishlist from "./components/wishlist.tsx";
import Sizechart from "./Pages/sizechart.tsx";
import AddToCart from "./components/addtocart.tsx";
import Location from "./components/location.tsx";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Editproducttable from "./components/Editproducttable.tsx";
import ProductAddTable from "./components/productaddtable.tsx";
import ProductListTable from "./components/productlisttable.tsx";
import Home from "./Pages/home.tsx";
import CheckOut from "./components/CheckOut.tsx";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/new",
    element: <NewPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword email={""} otp={""} password={""} />,
  },
  {
    path: "/men",
    element: <MenPage />,
  },
  {
    path: "/women",
    element: <WomenPage />,
  },
  {
    path: "/kids",
    element: <KidsPage />,
  },

  {
    path: "/sales",
    element: <SalesPage />,
  },

  {
    path: "/contact",
    element: <ContactUs />,
  },

  {
    path: "/location",
    element: <Location />,
  },

  {
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/edit/product/:id",
    element: <Editproducttable />,
  },
  {
    path: "/addproduct",
    element: <ProductAddTable />,
  },
  {
    path: "/updateproduct",
    element: <ProductListTable />,
  },
  {
    path: "/wishlist",
    element: <Whishlist />,
  },

  {
    path: "/sizechart",
    element: <Sizechart />,
  },
  {
    path: "/addtocart",
    element: <AddToCart />,
  },

  {
    path: "/checkout",
    element: <CheckOut />,
  },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
