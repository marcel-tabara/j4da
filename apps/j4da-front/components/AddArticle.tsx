import * as React from 'react';
import { IArticle } from '../types';

type Props = {
  saveArticle: (e: React.FormEvent, formData: IArticle) => void;
};

const AddArticle: React.FC<Props> = ({ saveArticle }) => {
  const [formData, setFormData] = React.useState<IArticle>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => saveArticle(e, formData)}>
      <div>
        <div className="Form--field">
          <label htmlFor="name">Title</label>
          <input onChange={handleForm} type="text" id="title" />
        </div>
        <div className="Form--field">
          <label htmlFor="body">Description</label>
          <input onChange={handleForm} type="text" id="body" />
        </div>
      </div>
      <button
        className="Form__button"
        disabled={formData === undefined ? true : false}
      >
        Add Article
      </button>
    </form>
  );
};

export default AddArticle;
