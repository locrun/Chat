import React, { FormEvent, useEffect, useContext, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { createCommnets, getCommnets } from 'api/routes/curatorChat';
import { ChatContext } from 'context/Context';
import { CommentList } from './CommentList/CommentList';
import s from './CommentForm.module.scss';

export const CommentForm = () => {
  const { currentThread } = useContext(ChatContext);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const {
        data: { results }
      } = await getCommnets(currentThread.id);
      setCommentList(results);
    };
    fetchComments();
  }, [currentThread]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (comment) {
        await createCommnets({
          chat: currentThread.id,
          text: comment
        });
        setComment('');
      }
    } catch (error) {
      console.error(error);
    }
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
      <CommentList data={commentList} />
    </>
  );
};
