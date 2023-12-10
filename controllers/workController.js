const UserModel = require("../models/userModel")
const CompanyModel = require("../models/companyModel")
const cookieParser = require("cookie-parser");

function findCurrentJob(id, job_id){
  let final_job_num
  for(let x = 0; x <= id.length - 1; x+=1){
    if(id[x]["_id"].toString() === job_id){
      final_job_num = x
    }
  }
  return final_job_num
}

exports.workHomePage = async (req, res) => {
  try{
    let search_for_user = await UserModel.findOne({
        authPID: req.oidc.user["sub"].split("|")[1],
      });
    let comp = search_for_user["company"][0]["_id"].toString()

    let compInfo = await CompanyModel.findOne({ownerId: req.cookies.mongo})

    res.status(200).render("allJobs",{
        jobs: compInfo["allJobs"],
        authID: search_for_user["authPID"],
        mongoID: search_for_user["_id"],
        compID: compInfo["_id"],
    });
  }catch(err){
    console.log(err)
  }
};

exports.createJobHandler = async (req, res) =>{
  const client_name = req.body.clientName;
  const jobName = req.body.jobName;
  const jobNumber= req.body.jobNumber;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.states;
  const zip_code = req.body.zipCode;

  const create_job = await CompanyModel.findOneAndUpdate({ownerId: req.cookies.mongo}, {$push: {allJobs: [{
    jobNumber,
    jobName,
    clientName: client_name,
    address,
    city,
    state,
    zipcode: zip_code}]}})

  res.redirect(`/work/allJobs/${req.cookies.authID}/${req.cookies.mongo}`)
}

exports.WorkJobDetailView = async (req, res) =>{
  let search_for_user = await UserModel.findOne({
    authPID: req.oidc.user["sub"].split("|")[1],
  });
  const current_job = await CompanyModel.findOne({"_id":req.params.compID})
  const find_job = current_job["allJobs"]
  const num_of_job = findCurrentJob(current_job["allJobs"], req.params.jobID)

  res.render("jobDetails",{
    jobDetails: find_job[num_of_job],
    authID: search_for_user["authPID"],
    mongoID: search_for_user["_id"],
  })
}