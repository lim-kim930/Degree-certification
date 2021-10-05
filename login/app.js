//引入express框架
const express = require('express')
//引入路径处理模块
const path = require('path')
const formidable = require('formidable');
const bodyParser = require('body-parser')
const fs = require('fs')
//创建web服务器
const app = express()
//静态资源访问服务器功能
app.use(express.static(path.join(__dirname, 'src')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


// 3.html
app.get('/get', (req, res) => {
	res.send(req.query)
})
// 生成令牌
app.post('/generateToken', (req, res) => {
	if (req.headers.authorization != null && req.headers.code != null)
		res.send({
			"tokenKey": "0xb6ce71bfe14c32d5b5d8fd93dc5c5a0c6cde13056621e467c79e6b16d5132636"
		})
})
// 新生成令牌,覆盖已有令牌
app.get('/generateNewToken', (req, res) => {
	if (req.headers.authorization != null && req.headers.code != null)
		res.send({
			"tokenKey": "0xb6ce71bfe14c32d5b5d8fd93dc5c5a0c6cde13056621e467c79e6b16d5132636"
		})
});
// 管理令牌
app.post('/getTokenInfo', (req, res) => {
	if (req.headers.authorization != null && req.headers.code != null)
		res.send({
			"tokenKey": "0xb6ce71bfe14c32d5b5d8fd93dc5c5a0c6cde13056621e467c79e6b16d5132636",
			"cutOffTime": "1615193210",
			"visitCount": 2,
			"maxVisitCount": 3,
			"range": "0123456"
		})
})
// 企业查询,接收token值,返回学生信息
app.post('/companySearch', (req, res) => {
	if (req.headers.authorization != null && req.headers.code != null && req.body.tokenKey == 1)
		res.send({
			"studentName": "ZYL",
			"department": "TEST",
			"certificateNumber": "10336101000001",
			"lssuingTime": 1615105119,
			"IDNumber": "342401200008031988 ",
			"specialSituation": "休学",
			"punishment": ""

		})
	else
		res.status(400).send({
			"isTokenOverdue": "true",
			"isExceededVisit": "false"
		})
})
// 教务处录入
app.post('/addStudent', (req, res) => {
	if (req.headers.authorization != null && req.headers.code != null)
		res.send(
			{
				"address": "0xc5e7526f15700760e7f0ccf641bb4e90a902a7bc",
				"studentName": "ZYL",
				"department": "TEST",
				"schoolYear": "4",
				"enrollmentYear": "2020",
				"learnTyoe": "1",
				"educationalLevel": "01",
				"IDNumber": "342401200008031988 ",
				"picture": "aisijashuahsiuadduhwhqhdyagedqgtdugaidgsusduaygsd",
				"body": req.body
			},
		)
	else
		res.status(400)
})
// 7.html
app.get('/error', (req, res) => {
	res.status(400).send('Error')
})
app.get('/error3', (req, res) => {
	console.log(nonexit);
	res.send('Error');
})

// 邮箱地址验证
app.get('/verifyEmailAdress', (req, res) => {
	// 接收客户端传递过来的邮箱地址
	const email = req.query.email;
	// 判断邮箱地址注册过的情况
	if (email == 'itheima@itcast.cn') {
		// 设置http状态码并对客户端做出响应
		res.status(400).send({ message: '邮箱地址已经注册过了, 请更换其他邮箱地址' });
	} else {
		// 邮箱地址可用的情况
		// 对客户端做出响应
		res.send({ message: '恭喜, 邮箱地址可用' });
	}
});

app.post('/formData', (req, res) => {
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm();
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		res.send(fields);
	});
});

// 实现文件上传的路由
app.post('/upload', (req, res) => {
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm();
	// 设置客户端上传文件的存储路径
	form.uploadDir = path.join(__dirname, 'public', 'uploads');
	// 保留上传文件的后缀名字
	form.keepExtensions = true;
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		// 将客户端传递过来的文件地址响应到客户端
		res.send({
			path: files.attrName.path.split('public')[1]
		});
	});
});
//监听端口
app.listen(3000)
//控制台提示输出
console.log('服务器启动成功')