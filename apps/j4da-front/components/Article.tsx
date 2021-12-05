import * as React from 'react';
import { IArticle } from '../types';

type Props = {
  article: IArticle;
  deleteArticle: (id: string) => void;
};

const Article = ({ article, deleteArticle }: Props) => {
  return (
    <div className="Card">
      <div className="Card--body">
        <h1 className="Card--body-title">{article.title}</h1>
        <p className="Card--description-text">{article.description}</p>
        <p className="Card--body-text">{article.body}</p>
      </div>
      <button
        className="Card__button"
        onClick={() => deleteArticle(article.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Article;
