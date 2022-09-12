const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express()
const port = process.env.PORT||7000;

app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
   
const upload = multer({ storage: storage })

app.use('/profile', express.static('upload/images'))

app.post('/upload', upload.single('profile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
    
})

app.get('/getProfile', (req, res) => {
    db.collection('mydb').find().toArray((err, result) => {
        const imgArray = result.map(element => element._id);
        console.log(imgArray);
        if (err) return console.log(err)
        res.send(imgArray)
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})