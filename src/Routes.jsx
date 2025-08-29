import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostListContainer from "./components/containers/PostListContainer";
import PostDetailContainer from "./components/containers/PostDetailContainer";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostListContainer />} />
        <Route path="/posts/:id" element={<PostDetailContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
