const pool = require("../../config/mysql")

//let curFolderName = __dirname.split("\\")
//let lenCurFolderName = curFolderName.length - 1
//curFolderName = curFolderName[lenCurFolderName]

//const tableName = `hr_${curFolderName}`
const tableName = "hr_jobinterest";

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
        if (data.idcard && data.jobid) {
            sql = `SELECT *,(select j.topic from hr_jobs as j where j.id = x.jobid ) as pname from ${tableName}  as x
            WHERE x.idcard = '${data.idcard}' and x.jobid = ${data.jobid}`
            flegAll = false
        } else {
            sql = `SELECT * ,(select j.topic from hr_jobs as j where j.id = x.jobid ) as pname from ${tableName}  as x
        WHERE x.idcard = '${data.idcard}'`
            flegAll = true
        }
        //console.log("TEST")
        //console.log(data)
        //console.log(sql)

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
        console.log(data)
        if (data.id === undefined) {
            if (data.pid === undefined) {
                pool.query(
                    `select * from ${tableName} `,
                    (error, results, fields) => {
                        if (error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                )
            } else {
                pool.query(
                    `SELECT p.profileid,p.nameth,p.phone,i.* from hr_jobinterest AS i 
                    LEFT OUTER JOIN hr_profiles AS p ON i.idcard = p.profileid
                    WHERE i.idcard = '${data.id}'`,
                    (error, results, fields) => {
                        if (error) {
                            callBack(error);
                        }
                        return callBack(null, results);
                    }
                )

            }

        } else {

            pool.query(
                `SELECT p.profileid,p.nameth,p.phone,i.* from hr_jobinterest AS i 
                LEFT OUTER JOIN ( SELECT p.profileid,p.nameth,p.phone FROM hr_profiles AS p RIGHT JOIN hr_register AS r ON (p.profileid=r.idcard AND r.wstatus NOT IN (1,2)))  AS p ON i.idcard = p.profileid
                WHERE i.jobid = '${data.id}'
                AND i.idcard NOT IN (SELECT x.idcard FROM hr_jobinterest AS x WHERE STATUS = 1 AND x.jobid != ${data.id})
                `,
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
            )



        }

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
            nudnote=?
            WHERE  idcard=? and jobid=? `, [
                data.nuddate,
                data.nudnote,
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


};