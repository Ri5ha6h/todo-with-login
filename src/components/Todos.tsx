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

interface Todo {
  id: string;
  task: string;
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
  const [task, setTask] = useState('');
  const todosLength = todos.length;
  const hasTodos = todosLength > 0;
  const remainingTodos = todos.filter(
    (todo) => !todo.isCompleted
  ).length;

  const handleAddTodo = (todo: Todo) => {
    const updateTodos = [...todos, todo];
    setTodos(updateTodos);
    setTask('');
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } =
      e.target as HTMLInputElement;
    setTask(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todo = {
      id: uuidv4(),
      task: task,
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
      <AddTodo
        task={task}
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
    </div>
  );
};

export default Todos;
