import React, { FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { CommentList } from './CommentList/CommentList';
import { commentList } from 'data/comments/commnets';
import s from './CommentForm.module.scss';

export const CommentForm = () => {
  const [comment, setComment] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(comment);
  };

  return (
    <>
      <form className={s.form} onSubmit={submitHandler}>
        <label className={s.label}>Добавить комментарий</label>
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          className={s.textarea}
          value={comment}
          placeholder="Текст комментария"
          onChange={({ target }) => setComment(target.value)}
        />
        <button className={s.submitButton} type="submit">
          Добавить
        </button>
      </form>
      <CommentList data={commentList} title={'комментарии'} />
    </>
  );
};
