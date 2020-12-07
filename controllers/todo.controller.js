const { create } = require('../model/todo.model');
const todoModel = require('../model/todo.model');

exports.deleteTodo = async (req, res, next) => {        
    try
    {
        const todo = await todoModel.findByIdAndDelete(req.params.todoId);    
        if(todo){
            res.status(200).json(todo);
        }        
        else{
            res.status(404).send();
        }
    }
    catch(err)
    {
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {        
    try
    {
        const todo = await todoModel.findByIdAndUpdate(req.params.todoId, req.body, {new: true, useFindAndModify: false});    
        if(todo){
            res.status(200).json(todo);
        }        
        else{
            res.status(404).send();
        }
    }
    catch(err)
    {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try
    {
        const todo = await todoModel.findById(req.params.todoId);    
        if(todo){
            res.status(200).json(todo);
        }        
        else{
            res.status(404).send();
        }
    }
    catch(err)
    {
        next(err);
    }
}

exports.getTodos = async (req, res, next) => {
    try
    {
        const allTodos = await todoModel.find({});    
        res.status(200).json(allTodos);
    }
    catch(err)
    {
        next(err);
    }
};

exports.createTodo = async (req, res, next) => {
    try
    {
        const createdModel = await todoModel.create(req.body);
        res.status(201).json(createdModel);
    }
    catch(err)
    {
        next(err);
    }
};