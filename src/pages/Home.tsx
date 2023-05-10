import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (!playerId) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("playerId");
    navigate("/login");
  };
  return (
    <>
      <h1>
        Home <button onClick={logout}>Logout</button>
      </h1>

      {/* link */}
      <Link to="/">home</Link>
      <br />
      <Link to="player-status">player status</Link>
      <br />
      <Link to="player-items">player item</Link>
      <br />
      <Link to="gacha">gacha page</Link>

      <Outlet />
    </>
  );
};
export default Home;
