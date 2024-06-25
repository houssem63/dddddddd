const db = require('../db');
const bcrypt = require('bcrypt')
const addUser = async (req, res) => {
    db.query('SELECT * FROM users WHERE username = ?', [req.body.username],async (err, resulat) => {
        if (err) {
            console.error('Error executing query:', err);
            // Send error response to frontend
            res.status(500).json({ error: 'An error occurred while executing the query' });
            return;
        }
        if (resulat.length > 0) return res.json({ message: 'اسم المستخدم موجود بالفعل' ,ok:false})
        else {

            const {password}=req.body
            req.body.password=await bcrypt.hash(password,10)
            db.query('INSERT INTO users SET ?',req.body,(err,resulat)=>{
                if (err) {
                    console.error('Error executing query:', err);
                    // Send error response to frontend
                    res.status(500).json({ error: 'An error occurred while executing the query' });
                    return;
                  }
                  const {password,...user}=req.body
                  res.status(200).json({ message: 'تمت إضافة المستخدم بنجاح', user,ok:true });
        
        })
        }
        
    }
)}    
const updateUser =async (req, res) => {
        console.log(req.body)
        if(req.body.password===null){
        delete req.body.password
        }else{
            const {password}=req.body

            req.body.password=await bcrypt.hash(password,10)
        }
        db.query('UPDATE  users SET ? WHERE id = ?', [req.body, req.params.id], (err, resulat) => {
            if (err) {
                console.error('Error executing query:', err);
                // Send error response to frontend
                res.status(500).json({ error: 'An error occurred while executing the query' });
                return;
              }
        
              res.status(200).json({ message: 'تم تحديث المستخدم بنجاح', user:req.body });
            })
    }
    const getAllUser = (req, res) => {
        db.query('SELECT id, username, firstname, lastname, role From users', (err, resultat) => {
            if (err) {
                console.error('Error executing query:', err);
                // Send error response to frontend
                res.status(500).json({ error: 'An error occurred while executing the query' });
                return;
              }
              res.status(200).json({ message: 'جميع المستخدمين', users:resultat });
            
        })
    }
 

const deleteUser=(req,res)=>{
    db.query('DELETE FROM users WHERE id = ?',[req.params.id],(err,resulat)=>{
        if (err) {
            console.error('Error executing query:', err);
            // Send error response to frontend
            res.status(500).json({ error: 'An error occurred while executing the query' });
            return;
          }
          res.status(200).json({ message: 'تم حذف المستخدم بنجاح' });

    })
}

const getoneuser=(req,res)=>{
    db.query('SELECT id, username, firstname, lastname, role From users WHERE id = ?',[req.params.id], (err, resultat) => {
        if (err) {
            console.error('Error executing query:', err);
            // Send error response to frontend
            res.status(500).json({ error: 'An error occurred while executing the query' });
            return;
          }
          res.status(200).json({ message: 'جميع المستخدمين', users:resultat[0] });
        
    })
}


    module.exports = { addUser, getAllUser, updateUser,deleteUser,getoneuser }