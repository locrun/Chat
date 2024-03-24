import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TaskList } from './TaskList/TaskList';
import { taskFormRadioButtons } from 'data/ProfileUserData/taskFormRadioButtons';
import cn from 'classnames';
import s from './TaskForm.module.scss';

export interface ITaskList {
  taskType: string;
  taskName: string;
  describeTask: string;
  deferredDateValue: string;
  managerChoice: string;
  status: string;
}

export const TaskForm = () => {
  const [describeTask, setDescribeTask] = useState('');
  const [taskName, setTaskName] = useState('');
  const [deferredDateValue, setDeferredDateValue] = useState('');
  const [managerChoice, setManagerChoice] = useState('');
  const [chosenTasksButtons, setСhosenTasksButtons] =
    useState(taskFormRadioButtons);
  const [taskList, setTaskList] = useState<ITaskList[]>([
    {
      taskType: 'Позвонить',
      taskName: 'Задача по процессу «Новые заказы»',
      describeTask: 'Lorem ipsum',
      deferredDateValue: '05.08.2024',
      managerChoice: 'Менеджер не назначен',
      status: 'Выполнено'
    }
  ]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const selectedTasks = chosenTasksButtons.filter(button => button.checked);

    const object = {
      taskType: selectedTasks[0].value,
      taskName: taskName,
      describeTask: describeTask,
      deferredDateValue: deferredDateValue,
      managerChoice: managerChoice,
      status: 'Выполнено'
    };
    setTaskList([...taskList, object]);
  };

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setСhosenTasksButtons(prevButtons =>
      prevButtons.map(button => ({
        ...button,
        checked: button.value === e.target.value
      }))
    );
  };

  return (
    <>
      <form className={s.form} onSubmit={submitHandler}>
        <div className={s.flex}>
          <label className={s.taskLabel}>Добавить задачу</label>
          <button className={s.proccesBtn} onClick={() => console.log('click')}>
            Процессы
          </button>
        </div>

        <div className={s.taskButtonsWrapper}>
          {chosenTasksButtons.map(({ id, name, value, checked }) => {
            return (
              <label key={id} className={s.radio}>
                <input
                  name={name}
                  value={value}
                  className={s.inputRadio}
                  type="radio"
                  checked={checked}
                  onChange={e => handleChangeRadio(e)}
                />
                <span className={s.customRadio}></span>
                <span className={s.text}>{value}</span>
              </label>
            );
          })}
        </div>
        <input
          className={s.taskNameInput}
          name="task_name"
          onChange={e => setTaskName(e.target.value)}
          placeholder="Название задачи"
        />
        <TextareaAutosize
          minRows={1}
          maxRows={6}
          className={s.textarea}
          value={describeTask}
          placeholder="Описание задачи"
          onChange={({ target }) => setDescribeTask(target.value)}
        />
        <select
          defaultValue={1}
          className={s.select}
          onChange={({ target }) => setManagerChoice(target.value)}
        >
          <option value="Как есть">Как есть</option>
          <option value="Без менеджера">Без менеджера</option>
          <option value="C менеджера">C менеджера</option>
        </select>
        <div className={s.flex}>
          <input
            className={cn(s.backToInput, s.inputSmall)}
            name="back_to"
            onChange={e => setDeferredDateValue(e.target.value)}
            placeholder="Отложить до"
          />
          <button className={s.submitButton} type="submit">
            Добавить
          </button>
        </div>
      </form>
      <TaskList title="15 задач" taskListData={taskList} />
    </>
  );
};
