import Row from './Row';
// import { data } from '../todo';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import AddTodo from './AddTodo';
import { v4 as uuidv4 } from 'uuid';

//add date prop
interface Todo {
  id: string;
  task: string;
  date: string;
  isCompleted: boolean;
}

const getTodos = () => {
  const todoList =
    localStorage.getItem('todoList');
  if (todoList) {
    return JSON.parse(todoList);
  } else {
    return [];
  }
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(
    getTodos()
  );
  // add state to store date
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const todosLength = todos.length;
  const hasTodos = todosLength > 0;
  const remainingTodos = todos.filter(
    (todo) => !todo.isCompleted
  ).length;

  // add function to handle date

  const handleAddTodo = (todo: Todo) => {
    const updateTodos = [...todos, todo];
    setTodos(updateTodos);
    setTask('');
    setDate('');
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } =
      e.target as HTMLInputElement;
    setTask(value);
  };

  const handleDate = (e: ChangeEvent) => {
    const { value } =
      e.target as HTMLInputElement;
    setDate(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      id: uuidv4(),
      task: task,
      date: date,
      isCompleted: false,
    };

    task && handleAddTodo(todo);
  };

  const handleDelete = (id: string) => {
    const updateTodos = todos.filter(
      (todo) => todo.id !== id
    );
    setTodos(updateTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleCheckAll = () => {
    const updateTodos = todos.map((todo) => {
      if (todo.isCompleted) {
        return {
          ...todo,
        };
      } else {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
    });
    setTodos(updateTodos);
  };

  const handleCheck = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem(
      'todoList',
      JSON.stringify(todos)
    );
  }, [todos]);

  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      {!hasTodos && (
        <p className='text-2xl font-semibold tracking-wider text-gr-100'>
          Add a New Task
        </p>
      )}
      {hasTodos && (
        <p className='text-xl font-medium tracking-wider text-gr-100'>
          <span className='text-rd-100'>
            {remainingTodos}
          </span>{' '}
          task pending
        </p>
      )}
      {/* passing date in add todo */}
      <AddTodo
        task={task}
        date={date}
        changeDate={handleDate}
        submitTodo={handleSubmit}
        changeTodo={handleChange}
      />
      {todos.map((todo) => (
        <Row
          key={todo.id}
          todo={todo}
          deleteTodo={handleDelete}
          checkTodo={handleCheck}
        />
      ))}
      {/* add mark all todos and delete all todos */}
      {hasTodos && (
        <div className='mt-10'>
          <button
            className='px-6 py-3 text-2xl text-white bg-blue-500 rounded-md'
            onClick={handleCheckAll}
          >
            Mark all
          </button>
          <button
            className='px-6 py-3 ml-4 text-2xl text-white bg-red-500 rounded-md'
            onClick={handleDeleteAll}
          >
            Delete all
          </button>
        </div>
      )}
    </div>
  );
};

export default Todos;
