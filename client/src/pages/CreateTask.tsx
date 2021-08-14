import { useAuth0 } from '@auth0/auth0-react';
import { ReactComponent as AttachmentIcon } from 'assets/icons/attachment.svg';
import { ReactComponent as OwnerIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as GitIssueIcon } from 'assets/icons/git-issue.svg';
import { ReactComponent as LabelIcon } from 'assets/icons/label.svg';
import axios from 'axios';
import { LeftSideBar } from 'components/LeftSideBar';
import { LabelMenu } from 'components/menus/LabelMenu';
import { PriorityMenu } from 'components/menus/PriorityMenu';
import { StatusMenu } from 'components/menus/StatusMenu';
import { PriorityIcon } from 'components/PriorityIcon';
import { StatusIcon } from 'components/StatusIcon';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import Editor from "rich-markdown-editor";
import { Label } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import { RootState } from 'store/store';
import { MarkdownStyles } from 'styled/Markdown';
import { showInfo, showWarning } from '../components/Notification';
// import { AppDispatch } from 'store';
// import { createIssue } from 'store/actions/issueActions';
import { DEFAULT_LABLES, Priority, Status } from '../shared/constants';

interface RouteParams { id: string; }
interface Props extends RouteComponentProps<RouteParams> {

}

const getPriorityString = (priority: string) => {
  switch (priority) {
    case Priority.NO_PRIORITY:
      return 'Priority';
    case Priority.HIGH:
      return 'High';
    case Priority.MEDIUM:
      return 'Medium';
    case Priority.LOW:
      return 'Low';
    case Priority.URGENT:
      return 'Urgent';
    default:
      return 'Priority';
  }
};

export const CreateTask: React.FC<Props> = ({ match, history }) => {
  const [showMenu, setShowMenu] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(Priority.NO_PRIORITY);
  const [status, setStatus] = useState(Status.BACKLOG);
  const [label, setLabel] = useState(DEFAULT_LABLES[3]);
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDate] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const { projectData } = useSelector((state: RootState) => state.currentProject);

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async () => {
    if (title === "") {
      showWarning('Please enter a title before submiting', 'Title required');
      return;
    }
    const body = {
      title,
      priority,
      status,
      label: label.name,
      description,
      startDate,
      dueDate
    };
    const token = await getAccessTokenSilently();

    const { data } = await axios({
      url: `${baseURL}${endpoints.projects}/${match.params.id}${endpoints.tasks}`,
      method: 'POST',
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTitle('');
    setDescription('');
    setPriority(Priority.NO_PRIORITY);
    setStatus(Status.BACKLOG);
    showInfo('You created new issue.', 'Issue created');
    history.push(`/projects/${projectData.project._id}/tasks`);
  };

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <div className='flex flex-col w-full py-4 flex-1'>
          {/* header */}
          <div className='flex items-center justify-between flex-shrink-0 px-4'>
            <div className='flex items-center'>
              <span className="inline-flex items-center p-1 text-gray-400 bg-gray-100 rounded">
                <GitIssueIcon className='w-3 mr-1' />
                <span>{projectData.project.title}</span>
              </span>
              <span className='ml-2 font-normal text-gray-700'>› New Task</span>
            </div>
            <div className='flex items-center'>
              <Link to='/'
                className='inline-flex items-center justify-center ml-2 text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700'
              ><CloseIcon className='w-4' /></Link>
            </div>
          </div>
          <div className='flex flex-col flex-1 pb-3.5 overflow-y-auto'>

            {/* Task title */}
            <div className='flex items-center w-full mt-1.5 px-4'>
              <StatusMenu
                id='status-menu'
                button={<button className='flex items-center justify-center w-6 h-6 border-none rounded focus:outline-none hover:bg-gray-100'><StatusIcon status={status} /></button>}
                onSelect={(st) => {
                  setStatus(st);
                }}
              />
              <input
                className="w-full ml-1.5 text-lg font-semibold placeholder-gray-400 border-none h-7 focus:outline-none"
                placeholder='Task title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Task description editor */}
            <div className='flex w-full px-4'>
              <MarkdownStyles>
                <Editor
                  autoFocus
                  id='editor'
                  defaultValue={description}
                  onChange={(value) => setDescription(value())}
                  className='w-full mt-4 ml-5 font-normal border-none appearance-none min-h-12 text-md focus:outline-none'
                  placeholder='Add description...'
                />
              </MarkdownStyles>
            </div>

          </div>

          {/* Task labels & priority */}
          <div className='flex items-center px-4 pb-3 mt-1 border-b border-gray-200'>
            <PriorityMenu
              // id='priority-menu'
              button={<button
                className='inline-flex items-center h-6 px-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'
              >
                <PriorityIcon priority={priority} className='mr-2' />
                <span>{getPriorityString(priority)}</span>
              </button>}
              onSelect={(val) => setPriority(val)}
            />
            <button className='inline-flex items-center h-6 px-2 ml-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
              <OwnerIcon className='w-3.5 h-3.5 mr-2' />
              <span>Assignee</span>
            </button>
            <LabelMenu
              id='label-menu'
              onSelect={(label: Label) => setLabel(label)}
              button={<button className='inline-flex items-center h-6 px-2 ml-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                {label.name === 'No Label' ? <><LabelIcon className='w-3.5 h-3.5  mr-2' /> <span>No Label</span> </> : <><div className="w-2.5 h-2.5 rounded-full mr-2" style={{ background: label.color }}></div> <span>{label.name}</span> </>}
              </button>} />
          </div>
          {/* Footer */}
          <div className='flex items-center justify-between flex-shrink-0 px-4 pt-3 w-full'>
            <div className='flex items-center w-full'>
              <button
                className='px-3 ml-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 h-7 focus:outline-none ml-auto'
                onClick={handleSubmit}
              >Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
