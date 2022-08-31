import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Post from "./Post";
import Posts from "./Posts";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Dashboard</Link>
          <br />
          <Link to="/posts">Posts</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
