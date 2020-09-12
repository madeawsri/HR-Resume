const pool = require("../../config/mysql")
const tableFamily = "hr_family"
    /*
    function getNow() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes();
        const dateTime = date + ' ' + time;
        return dateTime;
    }*/
module.exports = {

    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into ${tableFamily} (
                profileid,
                namewh,
                career,
                workplace,
                position,
                numchild,
                numchildedu,
                numchildeduno,
                numchildwork,
                father,
                fage,
                fnation,
                forigin,
                flive,
                mother,
                mage,
                mnation,
                morigin,
                mlive,
                nameo,
                phoneo,
                addro,
                relationo

            ) 
                values(?,?,?,?,?,?,
                       ?,?,?,?,?,?,
                       ?,?,?,?,?,?,?,
                       ?,?,?,?)`, [
                data.profileid,
                data.namewh,
                data.career,
                data.workplace,
                data.position,
                data.numchild,
                data.numchildedu,
                data.numchildeduno,
                data.numchildwork,
                data.father,
                data.fage,
                data.fnation,
                data.forigin,
                data.flive,
                data.mother,
                data.mage,
                data.mnation,
                data.morigin,
                data.mlive,
                data.nameo,
                data.phoneo,
                data.addro,
                data.relationo
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
            `UPDATE  ${tableFamily} SET
                
            namewh=?,
            career=?,
            workplace=?,
            position=?,
            numchild=?,
            numchildedu=?,
            numchildeduno=?,
            numchildwork=?,
            father=?,
            fage=?,
            fnation=?,
            forigin=?,
            flive=?,
            mother=?,
            mage=?,
            mnation=?,
            morigin=?,
            mlive=?,
            nameo=?,
            phoneo=?,
            addro=?,
            relationo=?

            WHERE  profileid=? `, [
                data.namewh,
                data.career,
                data.workplace,
                data.position,
                data.numchild,
                data.numchildedu,
                data.numchildeduno,
                data.numchildwork,
                data.father,
                data.fage,
                data.fnation,
                data.forigin,
                data.flive,
                data.mother,
                data.mage,
                data.mnation,
                data.morigin,
                data.mlive,
                data.nameo,
                data.phoneo,
                data.addro,
                data.relationo,


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

    getByID: (idcard, callBack) => {
        pool.query(
            `select * from ${tableFamily} where profileid = ?`, [idcard],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0] ? results[0] : []);
            }
        );
    },




};