import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data.data))
        .catch((error) => console.log(error));
    }
    fetchData();
  }, [url]);
  return [data];
};

export default useFetch;
