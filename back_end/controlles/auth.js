const db = require('../db');
const bcrypt = require('bcrypt')
const jwt =require("jsonwebtoken")


const SignUp=async()=>{
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
        }
    
        const newUser = new User({ username, email, password });
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
}
  const LogIn = 
    (req, res) => {
      const { username, password } = req.body;
      const sql = 'SELECT * FROM users WHERE username = ?';
      db.query(sql, [username], (err, results) => {
        if (err) {
          
          return res.status(500).json({ error: 'فشل تسجيل الدخول' });
        }
        if (results.length === 0) {
          return res.status(401).json({ error: 'بيانات الاعتماد غير صالحة' });
        }
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ error: 'بيانات الاعتماد غير صالحة' });
        }
        const token = jwt.sign({ userId: user.id,role:user.role }, process.env.TOKENSECRET, { expiresIn: '24h' });
        delete user.password
        res.json({ token ,message:"تسجيل الدخول بنجاح",user});
      });
      };
  module.exports={LogIn}


  


  /*    const {password}=req.body
req.body.password=await bcrypt.hash(password,10)

    db.query('INSERT INTO users SET ?',req.body,(err,resulat)=>{
        if (err) {
            console.error('Error executing query:', err);
            // Send error response to frontend
            res.status(500).json({ error: 'An error occurred while executing the query' });
            return;
          }
          res.status(200).json({ message: 'Query executed successfully', data: resulat[0] });

})*/