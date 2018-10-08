const {Router} = require('express')
const router = Router()

const userModel = require('../model/user')

router.post('/user',async (req, res) => {
    try {
        const {username, password, email} = req.body
        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`

        if(password&&password.length>=5){

            const data = await userModel.create({username, password, email, avatar})

            console.log(data)
            res.json({
                code: 200,
                msg: '注册成功'
            })
        } else {
            throw '密码长度不符合要求'
        }
    } catch(err) {
        res.json({
            code: 400,
            msg: '缺少必要参数',
            err
        })
        next(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const userData = await userModel.findOne({email})

        if(!userData) {
            res.json({
                code: 400,
                msg: '用户不存在'
            })
        } else {
            console.log(userData)
            if(password&&password == userData.password) {
                req.session.user = userData
                res.json({
                    code: 200,
                    msg: '登录成功',
                    userData: {
                        avatar: userData.avatar,
                        email: userData.email,
                        username: userData.username,
                        desc: userData.desc
                    }
                })
            } else {
                res.json({
                    code: 400,
                    msg: '密码不正确'
                })
            }
        }
    } catch(err) {
        res.json({
            code: 400,
            msg: err
        })
    }
})

router.get('/loginout', (req, res) => {
    if(req.session.user) {
        req.session.user = null
        res.json({
            code: 200,
            msg: '退出登录成功'
        })
    } else {
        res.json({
            code: 403,
            msg: '不能再未登录状态下退出'
        })
    }
})

module.exports = router