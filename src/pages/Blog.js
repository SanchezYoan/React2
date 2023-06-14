import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Article from "../components/Article";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");
  //   const [formData, setFormData] = [{ author: "", content: "", date: "" }];
  const [error, setError] = useState(false);

  const getData = () =>
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));

  useEffect(() => getData(), []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formContent.length < 100) {
      setError(true);
    } else {
      axios.post("http://localhost:3004/articles", {
        author,
        content,
        date: Date.now(),
      });
      setError(false);
    }
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Blog</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Nom"
          id="subAuthor"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          // style conditionnel
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setFormContent(e.target.value)}
        ></textarea>
        {/* if error = true */}
        {error && <p>Veuillez écrire un minimum de 100 carcatères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {blogData.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default Blog;
