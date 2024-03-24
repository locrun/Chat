export interface IComments {
  id: number;
  userName: string;
  time: string;
  moveDB: string;
}

export const commentList: IComments[] = [
  {
    id: 0,
    userName: 'Евгений Свешников',
    time: '09.10.23 22:22',
    moveDB: 'Перенести в другую базу'
  },
  {
    id: 1,
    userName: 'Евгений Свешников',
    time: '09.10.23 22:22',
    moveDB: 'Перенести в другую базу'
  },
  {
    id: 2,
    userName: 'Евгений Свешников',
    time: '09.10.23 22:22',
    moveDB: 'Перенести в другую базу'
  }
];
