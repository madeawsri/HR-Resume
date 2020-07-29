const pool = require("../../config/mysql")


module.exports = {
    /*
    create: (data, callBack) => {
        pool.query(`insert into jobcate (name) values(?)`, [data.name],
            (error, result, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, result)
            }
        );
    }
    */

    create: (data, callBack) => {
        pool.query(`insert into jobcate (name) values(?)`, [data.name], callBack);
    }
}