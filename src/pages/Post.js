import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  let { postId } = useParams();

  const [data, setData] = useState({
    title: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3333/posts/" + postId)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      })
      .then(function () {});
  }, [postId]);

  return (
    <div>
      <h3>current title is {data.title}</h3>
    </div>
  );
}
