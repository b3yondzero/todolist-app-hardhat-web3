import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { web3, todoContract } from '../web3';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const fetchTodos = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      setAccounts(accounts);

      const todos = await todoContract.methods.getAllTodos().call({ from: accounts[0] });
      setTodos(todos.filter(todo => todo.id !== 0n));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    try {
      const fromAddress = accounts[0];
      await todoContract.methods.addTodo(todo.text).send({ from: fromAddress });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      const fromAddress = accounts[0];
      await todoContract.methods.deleteTodo(id).send({ from: fromAddress });
      fetchTodos();
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    try {
      const fromAddress = accounts[0];
      await todoContract.methods.editMyTodo(todoId, newValue.text).send({ from: fromAddress });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const fromAddress = accounts[0];
      await todoContract.methods.complete(id).send({ from: fromAddress });
      console.log('Toggled completion for todo id:', id);
      fetchTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <div>
      <h1>Write your todo</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default TodoList;
