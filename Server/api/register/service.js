const pool = require("../../config/mysql")

function getNow() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + ' ' + time;
    return dateTime;
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


};