import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import AddArticle from '../components/AddArticle';
import Article from '../components/Article';
import { IArticle } from '../types';

const BASE_URL = 'http://localhost:3333/api/article/articles';

export default function IndexPage({
  articles = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [articleList, setArticleList] = React.useState(articles);

  const addArticle = async (e: React.FormEvent, formData: IArticle) => {
    e.preventDefault();
    const article: IArticle = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      author: 'test',
      date_posted: new Date().toISOString(),
    };
    setArticleList([article, ...articleList]);
  };

  const deleteArticle = async (id: string) => {
    const articles: IArticle[] = articleList.filter(
      (article: IArticle) => article.id !== id
    );
    console.log(articles);
    setArticleList(articles);
  };

  if (!articleList) return <h1>Loading...</h1>;

  return (
    <main className="container">
      <AddArticle saveArticle={addArticle} />
      {articleList.map((article: IArticle) => (
        <Article
          key={article.id}
          deleteArticle={deleteArticle}
          article={article}
        />
      ))}
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch(BASE_URL);
  const articles: IArticle[] = await res.json();

  return {
    props: {
      articles,
    },
  };
}
