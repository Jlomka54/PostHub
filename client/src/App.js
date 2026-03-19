import { Layout } from "./components/Layout.jsx";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage.jsx";
import { PostsPage } from "./pages/PostsPage.jsx";
import { PostPage } from "./pages/PostPage.jsx";
import { AddPostsPage } from "./pages/AddPostsPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { EditPostPage } from "./pages/EditPostPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
        <Route path="new" element={<AddPostsPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </Layout>
  );
}

export default App;
