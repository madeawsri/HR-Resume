const pool = require("../../config/mysql")
const tableName = "hr_education"
const ExcSQL = (querySql, callBack) => {
    pool.query(
        querySql,
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
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
LEFT JOIN (SELECT a.* from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard AND r.wstatus <> 1) as c ON a.idcard = c.profileid
WHERE a.pmdate IS NOT NULL AND a.workdate IS NOT NULL AND  status = 1 and a.jobid = ${jobid});  `
        return ExcSQL(querySql, callBack)
    },

};