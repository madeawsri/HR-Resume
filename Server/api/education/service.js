const pool = require("../../config/mysql")
const tableName = "hr_education"

module.exports = {

    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into ${tableName} (
                profileid,
                levelid,
                institution,
                subject,
                begintime,
                endtime,
                gpa
            ) 
                values(?,?,?,?,?,?,?)`, [
                data.profileid,
                data.levelid,
                data.institution,
                data.subject,
                data.begintime,
                data.endtime,
                data.gpa
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

                institution=?,
                subject=?,
                begintime=?,
                endtime=?,
                gpa=?

            WHERE  profileid=? and levelid=? `, [

                data.institution,
                data.subject,
                data.begintime,
                data.endtime,
                data.gpa,

                data.profileid,
                data.levelid,

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
            `select * from ${tableName} where profileid = ? and levelid=?`, [data.profileid, data.levelid],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    getEducationLevelByID: (id, callBack) => {
        if (id === undefined)
            pool.query(
                `select * from hr_education_level where id = ? `, [id],
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results[0]);
                }
            );
        else
            pool.query(
                `select * from hr_education_level  `,
                (error, results, fields) => {
                    if (error) {
                        callBack(error);
                    }
                    return callBack(null, results[0]);
                }
            );
    },




};