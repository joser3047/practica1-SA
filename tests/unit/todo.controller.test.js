const todoController = require('../../controllers/todo.controller');
const todoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');
const allTodos = require('../mock-data/all-todos.json');

// The mock can be done this way
/*
todoModel.create = jest.fn();
todoModel.find = jest.fn();
todoModel.findById = jest.fn();
todoModel.findByIdAndUpdate = jest.fn();
*/
// or this way to get every function mocked
jest.mock('../../model/todo.model');

let req, res, next;
const todoId = "5fae00a3e9d00c60dbaea06d";

beforeEach(() => {    
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('todoController.delete', () => {
    it('should have a delete function', ()=>{
        expect(typeof todoController.deleteTodo).toBe('function');
    });

    it('should delete with todoModel.delete', async ()=> {
        req.params.todoId = todoId;
        await todoController.deleteTodo(req, res, next);        
        expect(todoModel.findByIdAndDelete).toHaveBeenCalledWith(todoId);
    });

    it('should return 200 response code and json object', async () => {
        req.params.todoId = todoId;
        todoModel.findByIdAndDelete.mockReturnValue(newTodo);
        await todoController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it('should handle errors', async()=> {                
        const errorMessage = { message: "Error updating by Id"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await todoController.deleteTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it('should return 404 when item does not exist', async()=> {        
        req.params.todoId = todoId;
        todoModel.findByIdAndDelete.mockReturnValue(null);
        await todoController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});


describe('todoController.update', () => {
    it('should have a update function', ()=>{
        expect(typeof todoController.updateTodo).toBe('function');
    });

    it('should update with todoModel.findByIdAndUpdate', async ()=> {
        req.params.todoId = todoId;
        req.body = newTodo;
        await todoController.updateTodo(req, res, next);        
        expect(todoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {new: true, useFindAndModify: false});
    });

    it('should return 200 response code and json object', async () => {
        req.params.todoId = todoId;
        req.body = newTodo;
        todoModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await todoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it('should handle errors', async()=> {                
        const errorMessage = { message: "Error updating by Id"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await todoController.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it('should return 404 when item does not exist', async()=> {        
        req.params.todoId = todoId;
        req.body = newTodo;
        todoModel.findByIdAndUpdate.mockReturnValue(null);
        await todoController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});
describe('todoController.getTodoById', () => {
    it('should have a getTodoById function', ()=>{
        expect(typeof todoController.getTodoById).toBe('function');
    });

    it('should call todoModel.findById with route parameters', async ()=> {
        req.params.todoId = todoId;
        await todoController.getTodoById(req, res, next);
        expect(todoModel.findById).toBeCalledWith(todoId);
    });

    it('should return 200 response code and json object', async () => {
        todoModel.findById.mockReturnValue(newTodo);
        await todoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it('should handle errors', async()=> {
        const errorMessage = { message: "Error finding by Id"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.findById.mockReturnValue(rejectedPromise);
        await todoController.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });

    it('should return 404 when item does not exist', async()=> {        
        todoModel.findById.mockReturnValue(null);
        await todoController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe('todoController.getTodos', () => {
    it('should have a getTodos function', ()=>{
        expect(typeof todoController.getTodos).toBe('function');
    });

    it('should call todoModel.find({})', async ()=> {
        await todoController.getTodos(req, res, next);
        expect(todoModel.find).toHaveBeenCalledWith({});
    });

    it('should return 200 response code and all todos', async () => {
        todoModel.find.mockReturnValue(allTodos);
        await todoController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });

    it('should handle errors', async()=> {
        const errorMessage = { message: "Error finding"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.find.mockReturnValue(rejectedPromise);
        await todoController.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    
});

describe('todoController.createTodo', () => {
    beforeEach(() => {    
        req.body = newTodo;
    });
    it('should have a createTodo function', ()=>{
        expect(typeof todoController.createTodo).toBe('function');
    });
    it('should call todoModel.create', ()=> {
        todoController.createTodo(req, res, next);
        expect(todoModel.create).toBeCalledWith(newTodo);
    });
    it('should return 201 response code', async () => {
        await todoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json object in response', async () => {
        todoModel.create.mockReturnValue(newTodo);
        await todoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    
    it('should handle errors', async()=> {
        const errorMessage = { message: "Property missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.create.mockReturnValue(rejectedPromise);
        await todoController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});