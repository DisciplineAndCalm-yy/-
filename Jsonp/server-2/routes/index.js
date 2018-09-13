var express = require('express');
var router = express.Router();
// var cors = require('cors');
var http = require('http');


router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  next();
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getJsonp', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.jsonp({
    data: 'Jsonp的一些信息',
    msg: '我超喜欢编程的。好想自己独立开发啊。',
    code: 200
  })
})

router.get('/getMsg', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*')

  res.json({
    data: '一些信息',
    msg: '代码全没了.我日你吗！',
    code: 200
  })
})

router.get('/proxy', (req, response) => { 
  http.get('http://localhost:3001/demo', function(res) {
    console.log(res);
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
        response.json({
          parsedData
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  });
});

router.options('/hard', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.send();
});

router.post('/hard', (req, res) => {
  res.json({
    data: 'POST的信息',
    msg: '我超喜欢编程的。',
    code: 200
  })
})

module.exports = router;
