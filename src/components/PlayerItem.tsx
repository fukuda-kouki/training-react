import axios from "axios";
import { useState } from "react";
import { PlayerItemWithItem } from "../types/player-item-with-item";

const PlayerStatus = () => {
  const [itemsData, setItems] = useState<PlayerItemWithItem[]>([]);

  const fetchData = async () => {
    const playerId = localStorage.getItem("playerId");
    try {
      //自分のapiサーバーにリクエストを送る
      const res = await axios.get(`http://localhost:3000/players/${playerId}/getWithItemData`);
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
      throw new Error("failed to API accese.");
    } else {
      setItems(result);
    }
  };

  //XXX useItemだとreactに怒られる
  const Item = async (id:number) => {
    const playerId = localStorage.getItem("playerId");
    try {

      const element = document.getElementById("useCount" + id)! as HTMLInputElement;
      const body = {
        itemId: id,
        count: parseInt(element.value)
      }
      console.log(body);

      //自分のapiサーバーにリクエストを送る
      const res = await axios.post(`http://localhost:3000/players/${playerId}/useItem`,
      body
      );
      const data = await res.data;
      console.log(data);
      return data;
      //TODO 取得したデータをstateに保存
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>PlayerItem</h2>
      <button onClick={getAPI}>APIアクセス</button>
      <table>
        <thead>
          <tr>
            <th>ItemId</th>
            <th>Name</th>
            <th>Heal</th>
            <th>Price</th>
            <th>Percent</th>
            <th>Count</th>
            <th>UseCount</th>
            <th>UseItem</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO 取得したデータ表示 */}
          {itemsData.map((it) => (
            <tr key={it.itemId}>
              <td>{it.itemId}</td>
              <td>{it.name}</td>
              <td>{it.heal}</td>
              <td>{it.price}</td>
              <td>{it.percent}</td>
              <td>{it.count}</td>
              <td><input type="number" id={"useCount" + it.itemId} name="useCount" min="1" max={it.count}></input></td>
              <td><button onClick={() => Item(it.itemId)} id={"useButton" + it.itemId} data-item_id={it.itemId}>Use</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatus;
