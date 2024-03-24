export enum CallType {
  incoming,
  outcoming,
  telephone,
  skype,
  held
}

export const taskFormRadioButtons = [
  { id: 0, name: 'actionType', value: CallType.outcoming, checked: false },
  { id: 1, name: 'actionType', value: CallType.incoming, checked: false },
  { id: 2, name: 'actionType', value: CallType.telephone, checked: false },
  { id: 3, name: 'actionType', value: CallType.skype, checked: true },
  { id: 4, name: 'actionType', value: CallType.held, checked: false }
];
