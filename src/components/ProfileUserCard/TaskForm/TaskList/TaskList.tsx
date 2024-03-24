import React from 'react';
import { CgCheck } from 'react-icons/cg';
import { ITaskList } from '../TaskForm';
import cn from 'classnames';
import s from './TaskList.module.scss';

interface TasktListProps {
  taskListData: ITaskList[];
  title: string;
}

export const TaskList = ({ title, taskListData }: TasktListProps) => {
  return (
    <div className={s.taskListWrapper}>
      <label className={cn(s.taskLabel, s.header)}>{title}</label>
      <ul className={s.taskList}>
        {taskListData.map(item => {
          return (
            <li key={item.taskName} className={s.taskItem}>
              <div className={s.flex}>
                <span className={s.taskName}>{item.taskName}</span>
                <span className={s.notification}>
                  <CgCheck color="ffffff" className={s.check} />
                  <span>{item.status}</span>
                </span>
              </div>
              <span className={s.describeTask}>{item.describeTask}</span>
              <span className={s.taskType}>{item.taskType}</span>
              <span className={s.unassigned}>{item.managerChoice}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
