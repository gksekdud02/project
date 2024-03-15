const fs = require("fs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const connection = require("../db.js")
const saltRounds = 10
const KEY = "test_key"

const join = (req,res) => {
    fs.readFile('./view/join.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
}

const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    const insertQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    bcrypt.hash(password,saltRounds,(error,hash)=>{ // 비밀번호 암호화
        if (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }

        connection.query(insertQuery, [username, email, hash], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            console.log('User registered successfully');
            res.status(200).send('User registered successfully');
            res.redirect('/')
        });
    })
    
};

const login = (req,res) => {
    fs.readFile('./view/login.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
}

const logout = (req,res) => {
    res.clearCookie('login');
    // 클라이언트에게 성공적인 로그아웃을 응답
    res.status(200).send('로그아웃 되었습니다.');
}


const loginUser = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    if (username && password) {
        const selectQuery = 'SELECT * FROM user WHERE username = ?';

        connection.query(selectQuery, [username], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }

            if (result.length > 0) {
                const hashedPassword = result[0].password;

                bcrypt.compare(password, hashedPassword, (compareError, match) => {
                    if (compareError) {
                        console.error(compareError);
                        return res.status(500).send('Internal Server Error');
                    }
                    if (match) {
                        console.log("로그인 성공");
                        res.setHeader('Set-Cookie','login='+username)
                        res.redirect('/')
                    } else {
                        console.log("비밀번호가 일치하지 않습니다.");
                        res.setHeader('Set-Cookie','login=false')
                        return res.status(401).send('Incorrect password');
                    }
                });
            } else {
                console.log("아이디 정보가 일치하지 않습니다.");
                res.setHeader('Set-Cookie','login=false')
                return res.status(401).send('Incorrect username');
            }
        });
    } else {
        console.log("아이디와 비밀번호를 입력하세요");
        res.setHeader('Set-Cookie','login=false')
        return res.status(400).send('Username and password are required');
    }
};


const see = (req,res) => {
    const username = req.params.username;
    console.log(username)

    if (username){
        const selectQuery = 'SELECT email FROM user WHERE username = ?';
        connection.query(selectQuery,[username],(error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            if (result.length > 0) {
                const email = result[0].email

                fs.readFile('./view/info.html', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Internal Server Error');
                    }
                    const modifiedData = data.replace('{{username}}', username).replace('{{email}}', email);
                    res.send(modifiedData);
                });
            }
        });
    }
}

 const edit = (req,res) => {
    return res.send("Edit Users")
}

const remove = (req,res) => {
    const username = req.params.username;
    
    if(username){
        const deleteQuery = 'DELETE FROM user WHERE username = ?';
        connection.query(deleteQuery,[username],(error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            console.log('User deleted successfully');
            res.status(200).send('User deleted successfully');
            // 회원 탈퇴 후 홈페이지로 리디렉션
            res.redirect('/');
        });
    }
}


module.exports = {
    join,
    registerUser,
    login,
    loginUser,
    see,
    edit,
    remove,
    logout
};