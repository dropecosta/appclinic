const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/patients', require('./routes/api/patients'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/prescriptions', require('./routes/api/prescriptions'));
app.use('/api/exams', require('./routes/api/exams'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));