const mongoose = require('mongoose');
const config = require("../Config/env");

const ConnectDatabase = async () => {
    await mongoose.connect('mongodb+srv://office_laptop_user:QfiPH1QQmUi4MC7y@dbcluster.he2y8af.mongodb.net/XPensesDB?retryWrites=true&w=majority&appName=DbCluster');
}

module.exports = ConnectDatabase;
