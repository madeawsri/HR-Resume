const pool = require("../../config/mysql")
let curFolderName = __dirname.split("\\")
let lenCurFolderName = curFolderName.length - 1
curFolderName = curFolderName[lenCurFolderName]

const tableName = `hr_${curFolderName}`

module.exports = {

    create: (data, callBack) => {
        console.log(data)
        if (data.regstatus === undefined) data.regstatus = 0
        pool.query(
            `insert into ${tableName} (
                idcard,
                jobid,
                regstatus
            ) 
                values( ?,?,?)`, [
                data.idcard,
                data.jobid,
                data.regstatus
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
            salary=?,
            note=?,
            lastedit=CURRENT_TIMESTAMP
            WHERE  idcard=? and jobid=? `, [
                data.salary,
                data.note,
                data.idcard,
                data.jobid
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
            `DELETE FROM  ${tableName} WHERE  idcard=? and jobid=? `, [
                data.idcard,
                data.jobid
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
        let sql = '';
        let flegAll = false;

        switch (data.idcard) {
            case "interview":
                sql = `SELECT r.nuddate,group_concat(p.nameth) AS fname
                FROM hr_jobinterest AS r , hr_profiles AS p 
                WHERE r.jobid = ${data.jobid}
                AND r.idcard = p.profileid
                AND r.nuddate IS NOT NULL 
                GROUP BY r.nuddate
                ORDER BY nuddate`
                flegAll = true
                break;

            case "jobid":
                sql = `SELECT * ,(select j.topic from hr_jobs as j where j.id = x.jobid ) as pname from ${tableName}  as x
                WHERE x.jobid = '${data.jobid}'`
                flegAll = true
                break;

            default:
                if (data.idcard && data.jobid) {
                    sql = `SELECT *,(select j.topic from hr_jobs as j where j.id = x.jobid ) as pname from ${tableName}  as x
                    WHERE x.idcard = '${data.idcard}' and x.jobid = ${data.jobid}`
                    flegAll = false
                } else {
                    sql = `SELECT * ,(select j.topic from hr_jobs as j where j.id = x.jobid ) as pname from ${tableName}  as x
                WHERE x.idcard = '${data.idcard}'`
                    flegAll = true
                }
                break;
        }
        pool.query(
            sql,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                if (flegAll)
                    return callBack(null, results);
                else
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


    interview: (data, callBack) => {
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

    updatenud: (data, callBack) => {
        console.log(data)
        pool.query(
            `UPDATE  ${tableName} SET 
            nuddate=?,
            nudnote=?,
            nuduser=?
            WHERE  idcard=? and jobid=? `, [
                data.nuddate,
                data.nudnote,
                data.nuduser,
                data.idcard,
                data.jobid
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updatepmdate: (data, callBack) => {
        console.log(data)
        let sql = `UPDATE  ${tableName} SET  pmdate='${data.pmdate}',status=1  WHERE  id in (${data.id}) `
        if (data.pmdate === null)
            sql = `UPDATE  ${tableName} SET  pmdate=null,status=0  WHERE  id in (${data.id}) `

        console.log(sql)
        pool.query(
            sql,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    updateworkdate: (data, callBack) => {
        console.log(data)
        let sql = `UPDATE  ${tableName} SET  workdate='${data.workdate}'  WHERE  id in (${data.id}) `
        if (data.workdate === null)
            sql = `UPDATE  ${tableName} SET  workdate=null  WHERE  id in (${data.id}) `

        console.log(sql)
        pool.query(
            sql,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



};