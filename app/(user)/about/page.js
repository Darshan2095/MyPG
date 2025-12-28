"use client";

import { useState,useEffect } from "react";

export default function Home() {
  const [fdata, fset] = useState([]);
  const [loading,setLoding] = useState(true)
  const fetchDt = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";

    const res = await fetch(url);
    const data = await res.json(); 
    fset(data);
    setLoding(false);
    console.log(data);
  };

  useEffect(() =>{
    fetchDt()
  },[])

  return (
    <>
      <div>
        <button className="bg-gray-600 text-white rounded-2xl p-2" onClick={fetchDt}>Fetch Data</button>
      </div>

      <div className="grid grid-cols-3 p-4 gap-2">
        {loading ? (
          <div className="">
            Loading...
          </div>
        ):(
          <div className="hidden"></div>
        )}
        {fdata.map((dt, indx) => (
          <div key={indx} className="bg-gray-400 mx-auto p-2">
            {dt.body}
          </div>
        ))}
      </div>
    </>
  );
}
