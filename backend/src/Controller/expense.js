const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const ExpenseModel = require('../Models/expenseModel.js');

const GetExpense = async (req, res) => {
    const filter = {};
    if (req.params.id) {
        filter._id = new ObjectId(req.params.id);
    }

    const expensesList = await ExpenseModel.find(filter);;
    res.status(200).send(expensesList);
}

const GetExpenses = async (req, res, next) => {
    const expensesList = await ExpenseModel.find({});;
    res.status(200).send(expensesList);
}

const AddExpense = async (req, res) => {
    const expenseData = req.body;
    const expense = new ExpenseModel(expenseData);
    await expense.save();
    res.status(201).send("Expense saved to database successfully.");
}

const DeleteExpense = async (req, res) => {
    const id = req.params;
    const objectifiedId = new ObjectId(id);
    await ExpenseModel.deleteOne({ _id: objectifiedId });
    res.status(200).send("Expense deleted successfully.");
}

const UpdateExpense = async (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;
    const result = await ExpenseModel.findByIdAndUpdate(
        id,
        updateBody,
        { new: true }
    )
    res.status(200).send(result);
}

module.exports = {
    GetExpense,
    GetExpenses,
    AddExpense,
    UpdateExpense,
    DeleteExpense
}