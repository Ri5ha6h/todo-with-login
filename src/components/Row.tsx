import { FC } from 'react';
import { MdDelete } from 'react-icons/md';

interface Todo {
  id: string;
  task: string;
  isCompleted: boolean;
}

interface TodoProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string) => void;
}

const Row: FC<TodoProps> = ({
  todo: { task, isCompleted, id },
  deleteTodo,
  checkTodo,
}) => {
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
    </div>
  );
};

export default Row;
