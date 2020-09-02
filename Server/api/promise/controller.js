const {
    insertPromise,
    updateJob,
    updateJobInterest,
    updateRegister,

    //update,
    //getByID,
    //getEducationLevelByID
} = require("./service");




module.exports = {
    createData: async(req, res) => {
        //console.log(req)
        let jobid = req.params.id
        try {
            await insertPromise(jobid, async(err, uresults) => { console.log('insertPromise') })
            await updateJob(jobid, async(err, uresults) => { console.log('insertJob') })
            await updateRegister(jobid, async(err, uresults) => { console.log('insertRegister') })
                //await updateJobInterest(jobid, async(err, uresults) => { console.log('insertJobInterest') })

            return res.status(200).json({
                success: 1,
                message: "update & instert success"
            });


        } catch (error) {
            return res.status(500).json({
                success: 0,
                message: "** ไม่สามารถติดต่อฐานข้อมูลได้ **"
            });
        }



    },



};