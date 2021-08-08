import { Label } from './types';

export const Priority = {
  NO_PRIORITY: 'no_priority',
  URGENT: 'urgent',
  HIGH: 'high',
  LOW: 'low',
  MEDIUM: 'medium'
};

export const Status = {
  BACKLOG: 'backlog',
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELED: 'canceled',
};

// export const Labels = {
//   BUG: 'Bug',
//   FEATURE: 'FEATURE',
//   IMPROVEMENT: 'IMPROVEMENT',
//   NO_LABEL: 'NO_LABEL'
// };

export const DEFAULT_LABLES: Array<Label> = [
  { id: '1', name: 'Bug', color: '#eb5757' },
  { id: '2', name: 'Feature', color: '#bb87fc' },
  { id: '3', name: 'Improvement', color: '#4ea7fc' },
  { id: '4', name: 'No Label', color: '#999999' },
];

// export const DropdownMenus = {
//   PRIORITY: 'priority',
//   STATUS: 'status',
//   LABEL: 'label',
//   ASSIGNEE: 'assignee'
// };

// export const PriorityOptions = [
//   [NoPriorityIcon, 'No priority', Priority.NO_PRIORITY],
//   [UrgentPriorityIcon, 'Urgent', Priority.URGENT],
//   [HighPriorityIcon, 'High', Priority.HIGH],
//   [MediumPriorityIcon, 'Medium', Priority.MEDIUM],
//   [LowPriorityIcon, 'Low', Priority.LOW]
// ];
// export const StatusOptions = [
//   [BacklogIcon, 'Backlog', Status.BACKLOG],
//   [TodoIcon, 'Todo', Status.TODO],
//   [InProgressIcon, 'In Progress', Status.IN_PROGRESS],
//   [DoneIcon, 'Done', Status.DONE],
//   [CancelIcon, 'Canceled', Status.CANCELED]
// ];

// export const LabelOptions = [
//   { id: '1', name: 'Bug', color: '#eb5757' },
//   { id: '2', name: 'Feature', color: '#bb87fc' },
//   { id: '3', name: 'Improvement', color: '#4ea7fc' }
// ];