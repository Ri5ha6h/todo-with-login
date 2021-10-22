import {
  ChangeEvent,
  FC,
  FormEvent,
} from 'react';

interface AddTodoProps {
  task: string;
  changeTodo: (e: ChangeEvent) => void;
  submitTodo: (e: FormEvent) => void;
}

const AddTodo: FC<AddTodoProps> = ({
  task,
  changeTodo,
  submitTodo,
}) => {
  return (
    <div className='w-full mt-10 lg:w-1/2'>
      <form
        onSubmit={submitTodo}
        className='flex items-center justify-center'
      >
        <input
          className='w-2/3 py-3 pl-3 text-2xl border-2 border-gray-200 outline-none rounded-xl'
          type='text'
          name='task'
          value={task}
          onChange={changeTodo}
        />
        <button
          className='py-3 ml-3 tracking-wide text-white px-7 rounded-xl lg:text-3xl bg-purp-100'
          type='submit'
          aria-label='add todo'
        >
          +
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
