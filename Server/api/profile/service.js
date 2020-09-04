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

        pool.query(
            `insert into hr_profiles(
                profileid,
                nameth,
                nameen,
                addr,
                addrcur,
                flagaddr,
                email,
                phone,
                birthday,
                age,
                height,
                weight,
                nation,
                origin,
                religion,
                idcard,
                placecard,
                expiredcard,
                regtime
            ) 
                values(?,?,?,?,?,?,
                    ?,?,?,?,?,?,
                    ?,?,?,?,?,?,?)`, [
                data.profileid,
                data.nameth,
                data.nameen,
                data.addr,
                data.addrcur,
                data.flagaddr,
                data.email,
                data.phone,
                data.birthday,
                data.age,
                data.height,
                data.weight,
                data.nation,
                data.origin,
                data.religion,
                data.idcard,
                data.placecard,
                data.expiredcard,
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
    updateRegister: (data, callBack) => {
        //console.log(data)
        pool.query(
            `update hr_register set nameth=?,birthday=?,password=? 
                where idcard =?`, [
                data.nameth,
                data.birthday,
                data.password,
                data.profileid,
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

        pool.query(
            `UPDATE  hr_profiles SET
                
                nameth=?,
                nameen=?,
                addr=?,
                addrcur=?,
                flagaddr=?,
                email=?,
                phone=?,
                birthday=?,
                age=?,
                height=?,
                weight=?,
                nation=?,
                origin=?,
                religion=?,
                idcard=?,
                placecard=?,
                expiredcard=?,
                regtime=?
            WHERE  profileid=? `, [
                data.nameth,
                data.nameen,
                data.addr,
                data.addrcur,
                data.flagaddr,
                data.email,
                data.phone,
                data.birthday,
                data.age,
                data.height,
                data.weight,
                data.nation,
                data.origin,
                data.religion,
                data.idcard,
                data.placecard,
                data.expiredcard,
                getNow(),
                data.profileid
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
            `select * from hr_profiles where profileid = ?`, [idcard],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    /**
     SELECT DISTINCT 
   p.profileid,
	p.nameth,
	p.email,
	p.phone	,
	p.age,
	p.birthday,
	p.height,
	p.weight,
  (SELECT CONCAT(e.levelid,'|',e.institution,'|',e.subject,'|',e.endtime,'|',e.gpa) FROM hr_education AS e WHERE e.profileid = p.profileid AND e.institution <> "" ORDER BY e.levelid DESC LIMIT 1 ) AS edu
 FROM 
  (SELECT profileid,nameth,email,phone,age,birthday,height,weight FROM hr_profiles) AS p  
LEFT JOIN (SELECT profileid,workplace,'position',salary,begintime FROM hr_work) AS w  ON w.profileid = p.profileid
     */

    getData: (idcard, callBack) => {
        pool.query(
            ` SELECT DISTINCT 
            concat((left(STR_TO_DATE(p.birthday,'%d/%m/%Y'),4)-543),(right(STR_TO_DATE(p.birthday,'%d/%m/%Y'),6))) AS cbirthday,
            (SELECT k.certcarid FROM hr_knowledge AS k WHERE k.profileid = p.profileid) AS carid,
            p.*,
           (SELECT CONCAT(e.levelid,'|',e.institution,'|',e.subject,'|',e.endtime,'|',e.gpa) FROM hr_education AS e WHERE e.profileid = p.profileid AND e.institution <> "" ORDER BY e.levelid DESC LIMIT 1 ) AS edu,
           (SELECT GROUP_CONCAT(ji.jobid) FROM hr_jobinterest AS ji WHERE ji.idcard = p.profileid) AS jobids,
           (SELECT DISTINCT  GROUP_CONCAT(w.position, w.detail) FROM hr_work AS w WHERE w.profileid = p.profileid ORDER BY w.endtime DESC LIMIT 1) AS worknote
           
          FROM (SELECT a.*,r.wstatus from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard AND r.wstatus <> 1) AS p  
         LEFT JOIN (SELECT profileid,workplace,'position',salary,begintime FROM hr_work) AS w  ON w.profileid = p.profileid
             where p.profileid = ?`, [idcard],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },


    getDataAll: (callBack) => {
        pool.query(
            ` SELECT DISTINCT 
            concat((left(STR_TO_DATE(p.birthday,'%d/%m/%Y'),4)-543),(right(STR_TO_DATE(p.birthday,'%d/%m/%Y'),6))) AS cbirthday,
            (SELECT k.certcarid FROM hr_knowledge AS k WHERE k.profileid = p.profileid) AS carid,
            p.*,
           (SELECT CONCAT(e.levelid,'|',e.institution,'|',e.subject,'|',e.endtime,'|',e.gpa) FROM hr_education AS e WHERE e.profileid = p.profileid AND e.institution <> "" ORDER BY e.levelid DESC LIMIT 1 ) AS edu,
           (SELECT GROUP_CONCAT(ji.jobid) FROM hr_jobinterest AS ji WHERE ji.idcard = p.profileid) AS jobids,
           (SELECT DISTINCT  GROUP_CONCAT(w.position, w.detail) FROM hr_work AS w WHERE w.profileid = p.profileid ORDER BY w.endtime DESC LIMIT 1) AS worknote
          FROM (SELECT a.*,r.wstatus from hr_profiles AS a RIGHT JOIN hr_register AS r ON a.profileid = r.idcard AND r.wstatus<>1) AS p  
         LEFT JOIN (SELECT profileid,workplace,'position',salary,begintime FROM hr_work) AS w  ON w.profileid = p.profileid
         where p.nameth <> ""
             `,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


};