// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Todo List Management
 * @author Mohit Kumar
 * @dev A simple contract to manage a personal todo list
 */
contract Todo{

    struct  todo {
        uint id;
        string text;
        bool isCompleted;
    }

    mapping (address=> mapping (uint=>todo) ) private todoList; 
    mapping (address => uint) private todoCount; 

    /// @notice Adds a new todo
    /// @param value The description of the todo
    function addTodo (string memory value) external{
        require(bytes(value).length > 0, "Value cannot be empty");
        uint currentId = todoCount[msg.sender]+1;
        todo memory newTodo = todo(currentId,value,false);
        todoList[msg.sender][currentId] = newTodo;
        todoCount[msg.sender]= currentId;
    }

    /// @notice Retrieves all todo for the caller
    /// @return An array of all Todo structs
    function getAllTodos () external view returns (todo[] memory){
        uint count = todoCount[msg.sender];
        todo[] memory allTodos = new todo[](count);
        for(uint i =0 ; i< count; i++){
            allTodos[i]=todoList[msg.sender][i+1];
        }
        return allTodos;
    }



    /// @notice Edits an existing todo
    /// @param _id The id of the todo to edit
    /// @param newValue The new value of the todo
    /// @return A boolean indicating success
    function editMyTodo (uint _id, string memory newValue) external returns (bool) {
        require(_id != 0 && _id <= todoCount[msg.sender],"This function only allows edit not add new todos");
        require(keccak256(bytes(newValue)) != keccak256(bytes(todoList[msg.sender][_id].text)), "New value must not be the same as the old value");
        require(bytes(newValue).length > 0, "New value cannot be empty");
        todoList[msg.sender][_id].text= newValue;
        todoList[msg.sender][_id].isCompleted= false;
        return true;
        }
    /// @notice Deletes a todo
    /// @param _id The id of the todo to delete
    function deleteTodo (uint _id) external {
        require(_id != 0 && _id <= todoCount[msg.sender], "This function only works with existing todos");
        delete todoList[msg.sender][_id];
        
    }
    
    /// @notice Toggles the completion status of a todo
    /// @param _id The id of the todo to toggle
    /// @return The new completion status of the todo
    function complete(uint _id) external  returns (bool){
        require(_id != 0 && _id <= todoCount[msg.sender],"This function only works with existing todos");
        todoList[msg.sender][_id].isCompleted= !todoList[msg.sender][_id].isCompleted;
        return todoList[msg.sender][_id].isCompleted;
    }
    
}