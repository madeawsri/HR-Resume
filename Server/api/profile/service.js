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




};