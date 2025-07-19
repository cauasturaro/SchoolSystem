const app = require('./app');
const Student = require('./models/StudentModel');
const sequelize = require('./config/database');
const PORT = 8080;

sequelize.sync({ alter: true })
    .then(() => console.log("SC: Tables created successfuly!"))
    .catch(error => console.error("SC", error));

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})