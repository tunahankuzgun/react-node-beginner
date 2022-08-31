import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Table from "../components/Tables";

export default function Posts() {

  const [posts, setPosts] = useState([]);

  const [cancelSrc, setCancelSrc] = useState();
  const fetchPosts = useCallback((token) => {
    try {
      axios
        .get("http://localhost:3333/posts", {
          cancelToken: token,
        })
        .then(function (response) {
          setPosts(response.data);
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.error(error);
          }
        })
        .then(function () {});
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    let cancelTokenSrc = axios.CancelToken.source();
    fetchPosts(cancelTokenSrc.token);
    return () => {
      cancelTokenSrc.cancel("Component unmounted.");
      if (cancelSrc) {
        cancelSrc.cancel("Component unmounted.");
      }
    };
  }, [fetchPosts, cancelSrc]);

  return (
    <div>
      <div className="list">
        <Table
          dataSource={posts}
          onSuccess={() => {
            setCancelSrc(axios.CancelToken.source());
            setTimeout(fetchPosts(cancelSrc.token), 0);
          }}
        />
      </div>
      <Outlet />
    </div>
  );
}
