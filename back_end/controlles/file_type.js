const db = require('../db');

const add=(req,res)=>{


    

db.query('INSERT INTO file_type SET ? ' ,req.body,(err,resulat)=>{
    if (err) {
        console.error('Error executing query:', err);
        // Send error response to frontend
        res.status(500).json({ error: 'An error occurred while executing the query' });
        return;
      }
      res.status(200).json({ message: 'تمت إضافة الملفات بنجاح' });})

}
const update=(req,res)=>{


    

    db.query('UPDATE  file_type SET ? WHERE id = ?' ,[req.body, req.params.id],(err,resulat)=>{
        if (err) {
            console.error('Error executing query:', err);
            // Send error response to frontend
            res.status(500).json({ error: 'An error occurred while executing the query' });
            return;
          }
          res.status(200).json({ message: 'تمت إضافة الملفات بنجاح' });})
    
    }
    const deletefile_type=(req,res)=>{

    

        db.query('DELETE FROM file_type WHERE id = ? ' ,[req.params.id],(err,resulat)=>{
            if (err) {
                console.error('Error executing query:', err);
                // Send error response to frontend
                res.status(500).json({ error: 'An error occurred while executing the query' });
                return;
              }
              res.status(200).json({ message: 'تمت إضافة الملفات بنجاح' });})
        
        }   

        const gettypes = (req, res) => {
            db.query('SELECT * From file_type', (err, resultat) => {
                if (err) {
                    console.error('Error executing query:', err);
                    // Send error response to frontend
                    res.status(500).json({ error: 'An error occurred while executing the query' });
                    return;
                  }
          
                  res.status(200).json({ message: 'جميع المستخدمين', file_type:resultat });
                
            })
        }

const getone =(req,res)=>{
    db.query('SELECT * From file_type WHERE id = ?' ,[req.params.id], (err, resultat) => {
        if (err) {
            console.error('Error executing query:', err);
            // Send error response to frontend
            res.status(500).json({ error: 'An error occurred while executing the query' });
            return;
          }
  
          res.status(200).json({ message: 'جميع المستخدمين', typefile:resultat[0] });
        
    })
}
module.exports={add,update,deletefile_type,gettypes,getone}