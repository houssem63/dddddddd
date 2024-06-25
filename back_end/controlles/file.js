const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const path = require('path');

const {getusers,getSocketIo } =require('../socket') 
const addfiles = async (req, res) => {
  

  const uuid = uuidv4();
  const jsdate = new Date();

  req.body.createdAt = jsdate.toISOString().slice(0, 19).replace("T", " ");
  const url = req.protocol + "://" + req.get("host");  
  for (var i = 0; i < req.files.length; i++) {
    req.body.file_path =url + "/images/" + req.files[i].filename;
    req.body.related_files = uuid;
    req.body.type=req.files[i].mimetype
    // Execute MySQL query inside the loop
    const query = `INSERT INTO files
     (createdAt,file_path,type,sender_id,resever_id,content,file_type_id,related_files,fileName)
       VALUES ('${req.body.createdAt}','${req.body.file_path}','${req.body.type}','${req.body.sender_id}','${req.body.resever_id}',
       '${req.body.content}','${req.body.file_type_id}','${req.body.related_files}','${req.files[i].filename}') `;
 
           await executeQuery(query);

 
  }
  query2 = `SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,
    GROUP_CONCAT(fi.file_path) paths,GROUP_CONCAT(fi.type) types,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id
    
    WHERE  related_files = '${uuid}'
    GROUP BY  fi.related_files `;
    db.query(query2,async (err, resulat) => {
      if (err) {
        console.error("Error executing query:", err);
        // Send error response to frontend
        res
          .status(500)
          .json({ error: "An error occurred while executing the query" });
        return;
      }
try{
const receveirSocket= await findAsync(getusers(), element => element.user ===req.body.resever_id);
      console.log(resulat);
     getSocketIo().to(receveirSocket.socket).emit('newFiles',resulat) 
}catch(err){
console.log(err);
}
      
    });
  res.status(200).json({ message: "تمت إضافة الملفات بنجاح" });  
};
async function findAsync(array, condition) {

     return new Promise((resolve, reject) => {
    const found = array.find(condition);
    if (found) {
      resolve(found);
    } else {
      reject('Element not found');
    }
  });
 
         
}     
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (error, results, fields) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
const searchFiles = (req, res) => {
console.log(req.query);
console.log(req.query.start === 'null');
  var query;
  if (req.query.userID === 'undefined' && req.query.start !='null' && req.query.end !='null' ) {
    console.log('1');
    query = `
    SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,GROUP_CONCAT(fi.type) types,GROUP_CONCAT(fi.file_path) paths,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id

            WHERE date(createdAt) BETWEEN 
            '${new Date(req.query.start)
              .toISOString()
              .slice(0, 10)
              .replace("T", " ")}' AND
            '${new Date(req.query.end)
              .toISOString()
              .slice(0, 10)
              .replace("T", " ")}'
              GROUP BY  fi.related_files
          `;
  } else if (req.query.start === 'null') {
    console.log('2',query);
 
    query = `SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,GROUP_CONCAT(fi.file_path) paths,GROUP_CONCAT(fi.type) types,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id
    
    WHERE  (resever_id = '${req.query.userID}' OR sender_id ='${req.query.userID}')
    GROUP BY  fi.related_files `;
  } else if (req.query.end === 'null' && req.query.userID != 'undefined'&&req.query.start != 'null') {
    query =   `
    SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,GROUP_CONCAT(fi.type) types,GROUP_CONCAT(fi.file_path) paths,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id
    
    WHERE date(createdAt) = 
    '${new Date(req.query.start).toISOString().slice(0, 10).replace("T", " ")}'
    AND  (resever_id = '${req.query.userID}' OR sender_id ='${req.query.userID}')
    GROUP BY  fi.related_files `;
  } else if (req.query.userID === 'undefined' && req.query.end === 'null') {

    query =  `
    SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,GROUP_CONCAT(fi.type) types,GROUP_CONCAT(fi.file_path) paths,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id
    
    WHERE date(createdAt) = 
    '${new Date(req.query.start).toISOString().slice(0, 10).replace("T", " ")}'
    GROUP BY  fi.related_files
    `;
    console.log('3',query);

  } else {
    console.log('4',query);

    query =  `    SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,GROUP_CONCAT(fi.type) types,GROUP_CONCAT(fi.file_path) paths,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id
    
    
    WHERE date(createdAt) BETWEEN 
    '${new Date(req.query.start)
      .toISOString()
      .slice(0, 10)
      .replace("T", " ")}' AND
    '${new Date(req.query.end).toISOString().slice(0, 10).replace("T", " ")}'
    AND  (resever_id = '${req.query.userID}' OR sender_id ='${
      req.query.userID
    }')
    GROUP BY  fi.related_files `;
  }
console.log(query);
  db.query(query, (err, resulat) => {
    if (err) {
      console.error("Error executing query:", err);
      // Send error response to frontend
      res
        .status(500)
        .json({ error: "An error occurred while executing the query" });
      return;
    }
    console.log(resulat);
    res.status(200).json({ message: "تمت إضافة المستخدم بنجاح" ,resulat});
  });
};
const downloadfile=(req,res)=>{
 
  req.params.filename=req.params.filename.slice(1,req.params.filename.length)
    res.download(path.join(__dirname, '../', 'images/')+req.params.filename, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });

}
const todayFiles=(req,res)=>{
  console.log(new Date().toISOString().slice(0, 10).replace("T", " "))
  query = `SELECT fi.*, se.firstname as sendername, se.lastname as senderlastname
    ,re.firstname as resevername,re.lastname as reseverlastname,GROUP_CONCAT(fi.type) types,GROUP_CONCAT(fi.file_path) paths,ft.libelle as filetype

    FROM files fi
    INNER JOIN users se  ON fi.sender_id = se.id
    INNER JOIN users re  ON fi.resever_id = re.id
    INNER JOIN file_type ft  ON fi.file_type_id  = ft.id
    
    WHERE date(createdAt) = 
    '${new Date().toISOString().slice(0, 10).replace("T", " ")}'
    GROUP BY  fi.related_files `;
    db.query(query, (err, resulat) => {
      if (err) {
        console.error("Error executing query:", err);
        // Send error response to frontend
        res
          .status(500)
          .json({ error: "An error occurred while executing the query" });
        return;
      }
      console.log(resulat);
      res.status(200).json({ message: "تمت إضافة المستخدم بنجاح" ,resulat});
    });
}
module.exports = { addfiles, searchFiles,downloadfile,todayFiles };
