export interface CheckBoxData {
  id: number;
  name: string;
  title: string;
  value: string;
  isChecked: boolean;
}

export const checkboxData: CheckBoxData[] = [
  { id: 0, name: 'sort', title: 'Мои', value: 'my', isChecked: false },
  { id: 1, name: 'sort', title: 'Ничьи', value: 'others', isChecked: false },
  {
    id: 2,
    name: 'sort',
    title: 'Чужие',
    value: 'not_curator',
    isChecked: false
  }
];
