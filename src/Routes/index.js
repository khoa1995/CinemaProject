import MovieManagement from "../Containers/Admin/movies";
import UserManagement from "../Containers/Admin/users";
import HomePage from "../Containers/Home/HomePage";
// import MovieDetailComponent from "../Containers/Home/MovieDetail";

const routesHomePage = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  // {
  //   path: "/movie/:id",
  //   exact: false,
  //   component: MovieDetail,
  // },
  // {
  //   path: "/checkout/:scheduleId",
  //   exact: false,
  //   component: CheckOut,
  // },
];
const routesAdminPage = [
  {
    path: "/admin/users",
    exact: false,
    component: UserManagement,
  },
  {
    path: "/admin/movies",
    exact: false,
    component: MovieManagement,
  },
];

export { routesHomePage, routesAdminPage };
