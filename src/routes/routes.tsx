import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import PlayerStatus from "../components/PlayerStatus";
import PlayerItem from "../components/PlayerItem";
import GachaPage from "../components/Gacha";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "player-status",
        element: <PlayerStatus />,
      },
      {
        path: "player-items",
        element: <PlayerItem />,
      },
      {
        path: "gacha",
        element: <GachaPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/" />,
  },
];
export default routes;
