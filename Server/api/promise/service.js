const pool = require("../../config/mysql")
const tableName = "hr_education"
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

    updateRegister: (jobid, callBack) => {
        let querySql = `UPDATE hr_register SET wstatus = 1 
        WHERE idcard in (
        SELECT a.idcard  
          FROM hr_jobinterest a 
          LEFT JOIN hr_jobs b ON a.jobid = b.id 
          LEFT JOIN (SELECT a.* from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard AND r.wstatus <> 1) as c ON a.idcard = c.profileid
         WHERE a.pmdate IS NOT NULL AND a.workdate IS NOT NULL AND  status = 1 and a.jobid = ${jobid}) ;`
        return ExcSQL(querySql, callBack)
    },
    updateJobInterest: (jobid, callBack) => {
        let querySql = `UPDATE hr_jobinterest SET STATUS = 2
        WHERE id IN (SELECT * FROM  (
         SELECT  DISTINCT a.id  
          FROM hr_jobinterest a 
          LEFT JOIN hr_jobs b ON a.jobid = b.id 
          LEFT JOIN (SELECT a.* from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard AND r.wstatus <> 1) as c ON a.idcard = c.profileid
         WHERE a.pmdate IS NOT NULL AND a.workdate IS NOT NULL AND  status = 1 and a.jobid = ${jobid}) AS z );`
        return ExcSQL(querySql, callBack)
    },
    updateJob: (jobid, callBack) => {
        let querySql = `UPDATE hr_jobs SET ostatus = 0 
        WHERE id IN 
         (SELECT * FROM ( SELECT DISTINCT a.jobid  
          FROM hr_jobinterest a 
          LEFT JOIN hr_jobs b ON a.jobid = b.id 
          LEFT JOIN (SELECT a.* from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard AND r.wstatus <> 1) as c ON a.idcard = c.profileid
         WHERE a.pmdate IS NOT NULL AND a.workdate IS NOT NULL AND  status = 1 and a.jobid = ${jobid}) AS  z) ;`
        return ExcSQL(querySql, callBack)
    },

    insertPromise: (jobid, callBack) => {
        let querySql = `
        INSERT INTO hr_promise (jobinterestid,jobid,idcard,namecard,jobname,promisedate,workdate) 
(SELECT a.id AS jobinterestid,a.jobid , a.idcard,c.nameth AS namecard,b.topic AS jobname,a.pmdate AS promisedate ,a.workdate 
FROM hr_jobinterest a 
LEFT JOIN hr_jobs b ON a.jobid = b.id 
LEFT JOIN (SELECT a.* from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard ) as c ON a.idcard = c.profileid
WHERE a.pmdate IS NOT NULL AND a.workdate IS NOT NULL AND  status = 1 and a.jobid = ${jobid});  `
        return ExcSQL(querySql, callBack)
    },


    getAll: (data, callBack) => {
        let querySql = `
        SELECT p.* , r.wstatus , p.jobinterestid as id , r.idcard as profileid
          FROM hr_promise AS p LEFT JOIN hr_register AS r ON  p.idcard = r.idcard
        `
        return ExcSQL(querySql, callBack)
    },

    updateStatusPromise: (data, callBack) => {
        data.outdate = `'${data.outdate}'`
        if (data.status == 1)
            data.outdate = null;

        let querySql = `
          UPDATE hr_promise SET status = ${data.status} , statusnote = '${data.statusnote}' , outdate = ${data.outdate} where idcard = '${data.idcard}' and jobid = '${data.jobid}';
       `
        return ExcSQL(querySql, callBack)
    },
    updateStatusRegister: (data, callBack) => {
        let querySql = ''
        if (data.status != 1) data.status = 0;
        querySql = `
        UPDATE hr_register SET wstatus = ${data.status} where idcard = '${data.idcard}';
       `
        return ExcSQL(querySql, callBack)
    },

};