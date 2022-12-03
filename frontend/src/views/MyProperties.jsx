import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

function MyProperties() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const [listings, setlistings] = useState([]);
  const [data, setdata] = useState({});
  const [fetchTrigger, setfetchTrigger] = useState(0);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      let res = await axios.delete(`http://localhost:5005/listings/${id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (res.status == 200) {
        setfetchTrigger(fetchTrigger + 1);
      }
    } catch (err) {
      console.error(err);
      alert(JSON.stringify(err));
    }
  };

  useEffect(() => {
    const fn = async () => {
      let resp = await axios.get(`http://localhost:5005/listings`);
      if (resp.status === 200) {
        let ls = [];
        console.log(name);
        for (let i = 0; i < resp.data.listings.length; i++) {
          if (resp.data.listings[i].owner === name) {
            ls.push(resp.data.listings[i]);
          }
        }
        console.log(resp.data.listings);
        console.log(ls);
        setlistings([...ls]);
      }
    };
    fn();
  }, [fetchTrigger]);

  useEffect(() => {
    const fn = async () => {
      let dd = {};
      await Promise.all(
        listings.map(async (e, i) => {
          let res = await axios.get(`http://localhost:5005/listings/${e.id}`);
          if (res.status === 200) {
            dd[e.id] = res.data.listing;
          }
        })
      );
      setdata({ ...dd });
    };
    fn();
  }, [listings]);

  return (
    <div className="mt-16 px-48 grid grid-cols-2 gap-9">
      {listings.map((e, i) => {
        return (
          <Card
            key={i}
            data={{ ...e, control: true }}
            handleDelete={handleDelete}
            ob={data}
            fetchTrigger={fetchTrigger}
            setfetchTrigger={setfetchTrigger}
          />
        );
      })}
    </div>
  );
}

export default MyProperties;
