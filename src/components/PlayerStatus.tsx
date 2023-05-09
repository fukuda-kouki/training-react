import axios from "axios";
import { useState } from "react";
import { Player } from "../types/player";

const PlayerStatus = () => {
  const dummy: Player[] = [{ id: 1, name: "player1", hp: 100, mp: 100, money: 100 }];
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchData = async () => {
    const playerId = localStorage.getItem("playerId");
    try {
      //自分のapiサーバーにリクエストを送る
      const res = await axios.get(`http://localhost:3000/players/${playerId}`);
      const data = await res.data;
      console.log(data);
      return data;
      //TODO 取得したデータをstateに保存
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getAPI = async () => {
    const result = await fetchData();
    if (result == null) {
      setPlayers(dummy);
    } else {
      setPlayers([result]);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>PlayerStatus</h2>
      <button onClick={getAPI}>APIアクセス</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>名前</th>
            <th>hp</th>
            <th>mp</th>
            <th>money</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO 取得したデータ表示 */}
          {players.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.hp}</td>
              <td>{d.mp}</td>
              <td>{d.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatus;
