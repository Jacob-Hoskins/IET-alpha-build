const mongoose = require("mongoose")

// company must have company name, all employees ID, all estimates ID, all jobs ID, 
// create mock job cards to design and style all jobs page

//TODO: in the company collection create the Good Old Boys document and add 3 jobs
const companySchema = new mongoose.Schema({
    companyName:{
        required: true,
        type: String,
    },
    ownerId: {
        type: String,
        required: true,
    },
    employees: [{
        id: {
            type: String,
            required: true,
            unique: true,
        }
    }],
    allJobs:[{
        jobName: {
            type: String,
            required: true,
        },
        jobNumber:{
            type: Number,
            required: true,
        },
        clientName:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        zipcode:{
            type: Number,
            required: true
        }
    }],
})

const Company = mongoose.model("companies", companySchema);

module.exports = Company;