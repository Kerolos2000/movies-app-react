import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import EditProfileDataLayout from "./components/EditProfileDataLayout/EditProfileDataLayout";
import EditProfileDataPassword from "./components/EditProfileDataPassword/EditProfileDataPassword";
import Forgotpassword from "./components/Forgotpassword/Forgotpassword";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Movies from "./components/Movies/Movies";
import NotFound from "./components/NotFound/NotFound";
import People from "./components/People/People";
import PeopleDetails from "./components/PeopleDetails/PeopleDetails";
import Register from "./components/Register/Register";
import Resetpassword from "./components/Resetpassword/Resetpassword";
import Search from "./components/Search/Search";
import TvShow from "./components/TvShow/TvShow";
import TvShowDetails from "./components/TvShowDetails/TvShowDetails";
import Updatepassword from "./components/Updatepassword/Updatepassword";
import GetMoviesContextProvider from "./context/GetMoviesContext";

export default function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  function IsUserNotLogin(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to={"/login"} />;
    } else {
      return props.children;
    }
  }

  function IsUserLogin(props) {
    if (localStorage.getItem("userToken") !== null) {
      return <Navigate to={"/"} />;
    } else {
      return props.children;
    }
  }

  function IsVerify(props) {
    if (localStorage.getItem("userVerify")) {
      return props.children;
    } else {
      return <Navigate to={"/"} />;
    }
  }

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          index: true,
          element: (
            <IsUserNotLogin>
              <Home />
            </IsUserNotLogin>
          ),
        },
        {
          path: "movies",
          element: (
            <IsUserNotLogin>
              <Movies />
            </IsUserNotLogin>
          ),
        },
        {
          path: "tvShow",
          element: (
            <IsUserNotLogin>
              <TvShow />
            </IsUserNotLogin>
          ),
        },
        {
          path: "people",
          element: (
            <IsUserNotLogin>
              <People />
            </IsUserNotLogin>
          ),
        },
        {
          path: "search/:id",
          element: (
            <IsUserNotLogin>
              <Search />
            </IsUserNotLogin>
          ),
        },
        {
          path: "forgot",
          element: (
            <IsUserLogin>
              <Forgotpassword />
            </IsUserLogin>
          ),
        },
        {
          path: "reset",
          element: (
            <IsUserLogin>
              <Resetpassword />
            </IsUserLogin>
          ),
        },

        {
          path: "update",
          element: (
            <IsVerify>
              <Updatepassword />
            </IsVerify>
          ),
        },

        {
          path: "movieDetails/:id",
          element: (
            <IsUserNotLogin>
              <MovieDetails />
            </IsUserNotLogin>
          ),
        },
        {
          path: "peopleDetails/:id",
          element: (
            <IsUserNotLogin>
              <PeopleDetails />
            </IsUserNotLogin>
          ),
        },
        {
          path: "tvDetails/:id",
          element: (
            <IsUserNotLogin>
              <TvShowDetails />
            </IsUserNotLogin>
          ),
        },
        {
          path: "editData",
          element: (
            <IsUserNotLogin>
              <EditProfileDataLayout setUserData={setUserData} userData={userData}/>
            </IsUserNotLogin>
          ),
          children: [
            { path: "", element: <IsUserNotLogin><EditProfileDataPassword setUserData={setUserData} userData={userData}/></IsUserNotLogin> },
          ],
        },

        {
          path: "login",
          element: (
            <IsUserLogin>
              <Login saveUserData={saveUserData} />
            </IsUserLogin>
          ),
        },
        {
          path: "register",
          element: (
            <IsUserLogin>
              <Register />
            </IsUserLogin>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <GetMoviesContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </GetMoviesContextProvider>
  );
}
