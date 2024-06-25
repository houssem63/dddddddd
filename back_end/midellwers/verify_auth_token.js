const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try {
      const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'غير مصرح' });
  
    jwt.verify(token.split(' ')[1], process.env.TOKENSECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      next();
    });
        }
        catch(error){
            res.json({message :"المصادقة فشلت"})
        }
  
    }
