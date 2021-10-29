import { FC, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';

// add a prop for date to show in row todo
interface Todo {
  id: string;
  task: string;
  date: string;
  isCompleted: boolean;
}

interface TodoProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string) => void;
}

const Row: FC<TodoProps> = ({
  todo: { task, isCompleted, id, date },
  deleteTodo,
  checkTodo,
}) => {
  const d = new Date();
  const t = new Date(date);
  let dateTheme;
  if (t > d) {
    dateTheme = 'text-green-500';
  } else {
    dateTheme = 'text-red-500';
  }
 

  return (
    <div
      className={`flex items-center w-full mt-10 lg:w-1/2 ${
        isCompleted ? 'line-through' : ''
      }`}
    >
      <div className='flex items-center'>
        <button
          aria-label='delete todo'
          onClick={() => deleteTodo(id)}
        >
          <MdDelete className='w-8 h-8 text-gr-100 hover:text-gray-700'></MdDelete>
        </button>
        <input
          className='w-6 h-6 ml-4 border-2 border-gray-100 rounded-lg form-checked'
          type='checkbox'
          checked={isCompleted}
          onChange={() => checkTodo(id)}
        />
      </div>
      <p className='ml-5 text-2xl'>{task}</p>
      <span className={dateTheme}>{date}</span>
    </div>
  );
};

export default Row;
