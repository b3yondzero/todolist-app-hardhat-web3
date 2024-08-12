const { expect } = require("chai");

describe("TodoList Contract", function () {
  let TodoList, todoList, owner, addr1;

  beforeEach(async function () {
    TodoList = await ethers.getContractFactory("Todo");
    [owner, addr1] = await ethers.getSigners();
    todoList = await TodoList.deploy();
    await todoList.deployed();
  });


  describe("Adding Todos", function () {
    it("Should add a new todo", async function () {
      await todoList.addTodo("First Todo");
      const todos = await todoList.getAllTodos();
      expect(todos.length).to.equal(1);
      expect(todos[0].text).to.equal("First Todo");
      expect(todos[0].isCompleted).to.be.false;
    });

    it("Should not add an empty todo", async function () {
      await expect(todoList.addTodo("")).to.be.revertedWith("Value cannot be empty");
    });
  });

  describe("Editing Todos", function () {
    beforeEach(async function () {
      await todoList.addTodo("First Todo");
    });

    it("Should edit an existing todo", async function () {
      await todoList.editMyTodo(1, "Updated Todo");
      const todos = await todoList.getAllTodos();
      expect(todos[0].text).to.equal("Updated Todo");
      expect(todos[0].isCompleted).to.be.false;
    });

    it("Should not edit a non-existent todo", async function () {
      await expect(todoList.editMyTodo(2, "Updated Todo")).to.be.revertedWith("This function only allows edit not add new todos");
    });

    it("Should not edit with the same value", async function () {
      await expect(todoList.editMyTodo(1, "First Todo")).to.be.revertedWith("New value must not be the same as the old value");
    });

    it("Should not edit with an empty value", async function () {
      await expect(todoList.editMyTodo(1, "")).to.be.revertedWith("New value cannot be empty");
    });
  });

  describe("Deleting Todos", function () {
    beforeEach(async function () {
      await todoList.addTodo("First Todo");
    });

    it("Should delete an existing todo", async function () {
      await todoList.deleteTodo(1);
      const todos = await todoList.getAllTodos();
      expect(todos[0].id).to.equal(0);
      expect(todos[0].text.length).to.equal(0);
    });

    it("Should not delete a non-existent todo", async function () {
      await expect(todoList.deleteTodo(2)).to.be.revertedWith("This function only works with existing todos");
    });
  });

  describe("Completing Todos", function () {
    beforeEach(async function () {
      await todoList.addTodo("First Todo");
    });

    it("Should toggle completion status", async function () {
      await todoList.complete(1);
      let todos = await todoList.getAllTodos();
      expect(todos[0].isCompleted).to.be.true;

      await todoList.complete(1);
      todos = await todoList.getAllTodos();
      expect(todos[0].isCompleted).to.be.false;
    });

    it("Should not complete a non-existent todo", async function () {
      await expect(todoList.complete(2)).to.be.revertedWith("This function only works with existing todos");
    });
  });
});
