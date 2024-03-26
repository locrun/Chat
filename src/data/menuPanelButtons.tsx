import { Profile } from 'assets/img/icons/ProfileIcon';
import { History } from 'assets/img/icons/HistoryIcon';
import { Payment } from 'assets/img/icons/PaymentIcon';
import { TaskCheck } from 'assets/img/icons/TaskCheckIcon';
import { Calls } from 'assets/img/icons/CallsProfileIcon';
import { Comment } from 'assets/img/icons/CommentIcon';
import React from 'react';

export const buttons = [
  { id: 0, name: 'profile', icon: <Profile /> },
  { id: 1, name: 'history', icon: <History /> },
  { id: 2, name: 'payment', icon: <Payment /> },
  { id: 3, name: 'tasks', icon: <TaskCheck /> },
  { id: 4, name: 'comment', icon: <Comment /> },
  { id: 5, name: 'calls', icon: <Calls /> }
];
