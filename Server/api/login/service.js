const pool = require("../../config/mysql")

function getNow() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;
    return dateTime;
}
module.exports = {

    create: (data, callBack) => {
        let username = data.idcard
        let password = data.password

        pool.query(
            `insert into hr_register(idcard,nameth,birthday,username,password,regtime) 
                values(?,?,?,?,?,?)`, [
                data.idcard,
                data.nameth,
                data.birthday,
                username,
                password,
                getNow()
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByCardid: (idcard, callBack) => {
        pool.query(
            `select * from hr_register where idcard = ?`, [idcard],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserLogin: (login, callBack) => {
        //console.log(`${login.username}${login.password}`)
        pool.query(
            `select * from hr_register where concat(username,password) = ? `, [`${login.username}${login.password}`],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

};