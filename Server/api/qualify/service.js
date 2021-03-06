const pool = require("../../config/mysql")
let curFolderName = __dirname.split("\\")
let lenCurFolderName = curFolderName.length - 1
curFolderName = curFolderName[lenCurFolderName]

const tableName = `hr_${curFolderName}`

module.exports = {

    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into ${tableName} (
                topic
            ) 
                values( ?)`, [
                data.topic
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    update: (data, callBack) => {
        console.log(data)
        pool.query(
            `UPDATE  ${tableName} SET 

            topic=?

            WHERE  id=? `, [
                data.topic,
                data.id

            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    del: (data, callBack) => {
        console.log(data)
        pool.query(
            `DELETE FROM  ${tableName} WHERE  id=? `, [
                data.id,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getByID: (data, callBack) => {

        pool.query(
            `select * from ${tableName} where id = ? `, [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );

    },


    getAll: (data, callBack) => {

        pool.query(
            `select * from ${tableName} `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );

    },


    showPage: (data, callBack) => {

        let id = data.id
        let max = 3
        id = (id * max)

        pool.query(
            `select * from ${tableName} order by id desc limit ${max} offset ${id}  `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );

    },





};