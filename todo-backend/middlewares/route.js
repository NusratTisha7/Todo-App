const userRoutes = require('../routes/userRoutes');
const todoRoutes = require('../routes/todoRoutes');

module.exports = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/todo', todoRoutes);
}