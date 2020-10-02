const pool = require("../../config/mysql")

function getNow() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;
    return dateTime;
}
const ExcSQL = (querySql, callBack) => {
    pool.query(
        querySql,
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        }
    );
}

module.exports = {


    getData: (data, callBack) => {
        console.log('get data')
        pool.query(
            `select * from hr_register where idcard = ?`, [data.idcard],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        )

    },


    getDataByPage: (data, callBack) => {



        let max = 10
        let page = (data.page) ? data.page : 0
        page = (page * max)
        console.log(page)
        pool.query(
            `select * from hr_register where 1=1 limit ${max} offset ${page} `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )

    },



    getDataAll: (data, callBack) => {



        let max = 10
        let page = (data.page) ? data.page : 0
        page = (page * max)
        console.log(page)
        pool.query(
            `select *,nameth as topic from hr_register where 1=1  `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    updateStatusRegister: (data, callBack) => {
        console.log('update register')
        console.log(data)
        let querySql = ''
        if (data.status === 2) data.status = 1;
        else data.status = 2;
        querySql = `
        UPDATE hr_register SET status = ${data.status} where idcard = '${data.idcard}';
       `
        console.log(querySql)
        return ExcSQL(querySql, callBack)
    },


};