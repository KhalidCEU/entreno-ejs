const bcrypt = require("bcrypt");

const USERNAMES = ["sofia", "luis", "carla", "pablo"];

const database = {};
database.users = {};
database.users.data = {};

database.users.encryptPassword = function(pass, callback){
    bcrypt.hash(pass, 10, callback);
}

database.users.verifyPassword = async function(pass, hash){
    return await bcrypt.compare(pass, hash);
}

database.users.register = function(username, password, role) {
    if (database.users.data.hasOwnProperty(username)){
        throw new Error(`Username ${username} already exists`);
    }

    database.users.encryptPassword(password, function(err, hash){
        if (err){
            throw new Error("Error generating hash for " + password);
        }
        database.users.data[username] = {username, hash, role, last_login: new Date().toISOString()};
    });
}

database.users.authenticateUser = async function(username, password) {
    if (!database.users.data.hasOwnProperty(username)){
        return false;
    }
    return await database.users.verifyPassword(password, database.users.data[username].hash);
}

function seedDatabase(){
    database.users.register("admin", "admin", "admin");

    USERNAMES.forEach(function(username){
        database.users.register(username, "1234", "user");
    });

    console.log("Database initialized");
}


seedDatabase();

module.exports = database;