import React from "react";
import { useState } from "react";
import axios from "axios";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [displayItem, setDisplayItem] = useState(true);
  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updateDate: Date.now(),
    };

    axios.get("http://localhost:3004/articles/" + article.id, data);
    setIsEditing(false);
  };

  const handleDelete = () => {
    axios.delete("http://localhost:3004/articles/" + article.id);
    setDisplayItem(false);
  };
  return displayItem ? (
    <div
      className="article"
      style={{ background: isEditing ? "#f3eff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <br />
        <em>Posté le {dateFormater(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : article.content}
          autoFocus
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button
          onClick={() => {
            if (
              window.confirm("Voulez vous vraiment supprimer cet article ?")
            ) {
              handleDelete();
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Article;
