import axios from "axios";
import { useState } from "react";
import { GachaItem } from "../types/gacha-item";

const GachaPage = () => {
  const [gachaResult, setResult] = useState<GachaItem[]>([]);
  const [gachaCount, setCount] = useState(1);
  const setEventCount = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value))
  })

  const postGacha = async () => {
    const playerId = localStorage.getItem("playerId");
    try {
      const body = {count:gachaCount};
      //自分のapiサーバーにリクエストを送る
      const res = await axios.post(`http://localhost:3000/players/${playerId}/useGacha`, body);
      console.log(res.data);

      const gachaData: GachaItem[] = res.data.gachaResult.map((it: GachaItem) => {
        return {
          itemId: it.itemId,
          name:   it.name,
          count:   it.count,
          total:  it.total
        }
      })

      console.log(gachaData);
      return gachaData;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const gachaAPI = async () => {
    const resultData = await postGacha();
    if (resultData == null) {
      throw new Error("failed to API accese.");
    } else {
      setResult(resultData);
      console.log(resultData);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Gacha 1回 10money</h2>
      <input type="number" min="1" max="10" placeholder="回数" onChange={setEventCount}></input>
      <br></br>
      <button onClick={gachaAPI}>ガチャる</button>
      <table>
        <thead>
          <tr>
            <th>ItemId</th>
            <th>Name</th>
            <th>Drop</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {gachaResult!.map((it:GachaItem) => (
            <tr key={it.itemId}>
              <td>{it.itemId}</td>
              <td>{it.name}</td>
              <td>{it.count}</td>
              <td>{it.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GachaPage;
