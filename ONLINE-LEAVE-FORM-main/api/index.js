const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const {PDFDocument,StandardFonts} = require('pdf-lib');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');
const axios = require('axios')
const filePath = path.join(__dirname, '177.pdf');

const fileData = fs.readFileSync(filePath);

const { Schema } = mongoose;

const dbURI1 = 'mongodb+srv://leave:junewonder16@college-project.k1doypa.mongodb.net/studentPage?retryWrites=true&w=majority';
const dbURI2 = 'mongodb+srv://leave:junewonder16@college-project.k1doypa.mongodb.net/studentDetails?retryWrites=true&w=majority';
const dbURI3 = 'mongodb+srv://leave:junewonder16@college-project.k1doypa.mongodb.net/Auth?retryWrites=true&w=majority';
const dbURI4 = 'mongodb+srv://leave:junewonder16@college-project.k1doypa.mongodb.net/Template?retryWrites=true&w=majority';

const db1Connection = mongoose.createConnection(dbURI1, { useNewUrlParser: true, useUnifiedTopology: true });
const db2Connection = mongoose.createConnection(dbURI2, { useNewUrlParser: true, useUnifiedTopology: true });
const db3Connection = mongoose.createConnection(dbURI3, { useNewUrlParser: true, useUnifiedTopology: true });
const db4Connection = mongoose.createConnection(dbURI4, { useNewUrlParser: true, useUnifiedTopology: true });

const pdfSchema = new mongoose.Schema({
    title: String,
    data: Buffer,
    proof: Buffer,
});
const templateSchema = new mongoose.Schema({
    title:String,
    data:Buffer
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    person:String,
    section:String,
    password: String,
    leaveCount:Number,
    dept:String
});
const studentSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    ug: String,
    year: String,
    branch: String,
    section: String,
    coarse: String,
    leave: Number,
    reason: String,
    date: String,
    councellor: String,
    hod: String,
});


const PDF = db1Connection.model('pdf', pdfSchema);
const hodPDF = db1Connection.model('hodPdfs', pdfSchema);
const inchargePDF = db1Connection.model('inchargePdfs', pdfSchema);
const students = db2Connection.model('students', studentSchema);
const user = db3Connection.model('users', userSchema);
const template = db4Connection.model('templates', templateSchema);


db1Connection.on('connected', () => {
    console.log('Connected to DB1...');
});
db2Connection.on('connected', () => {
    console.log('Connected to DB2...');
});
db3Connection.on('connected', () => {
    console.log('Connected to DB3...');
});
db4Connection.on('connected', () => {
    console.log('Connected to DB4...');
});

db1Connection.on('error', (err) => {
    console.log('DB1 connection error:', err);
});
db2Connection.on('error', (err) => {
    console.log('DB2 connection error:', err);
});
db3Connection.on('error', (err) => {
    console.log('DB3 connection error:', err);
});
db4Connection.on('error', (err) => {
    console.log('DB connection error:', err);
});


app.use(bodyParser.json())
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json())


app.get('/api/list',async(req,res) => {
    const list = await user.find({person:"student"}).sort({name:1});
    res.json(list)
})
app.get('/api/list/leave',async(req,res) => {
    const list = await user.find({person:"student"}).sort({leaveCount:1});
    res.json(list)
})
app.get('/api/list/class',async(req,res) => {
    const list = await user.find({person:"student"}).sort({section:1});
    res.json(list)
})
app.get('/api/list/dept',async(req,res) => {
    const list = await user.find({person:"student"}).sort({dept:1});
    res.json(list)
})
app.post('/api/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const check = await user.findOne({email:email})
        if(check){
            if(check.leaveCount>=6) {
                res.json("LeaveCount Invalid");
            }
            res.json((check.person).toString())
        }else{
            res.json("not exist")
        }
    }catch(err){
        res.json("error")
    }
})
app.post('/api/register',async(req,res)=>{
    const {name,dept,person,section,email,password} = req.body
    try{
        const check = await user.findOne({email:email})
        if(check){
            res.json("exist")
        }else{
            const newUser = new user({ name:name,dept:dept,person:person,section:section,email:email,password:password ,leaveCount:0});
            await newUser.save()
            res.json("not exist")
        }
    }catch(err){
        console.log('inside catch');
        res.json("not exist")
    }
})
app.get('/api/getStudentRequest/:id', async(req, res) => {

  try {
    const id = req.params.id;
    const document = await PDF.findById(id);

    if (!document) {
      return res.status(404).send('Document not found');
    }

    const pdfBuffer = Buffer.from(document.data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${document.fileName}`);

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
app.get('/api/getInchargeRequest/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const document = await inchargePDF.findById(id);

    if (!document) {
      return res.status(404).send('Document not found');
    }

    const pdfBuffer = Buffer.from(document.data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${document.fileName}`);

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
app.get('/api/getHodRequest/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const document = await hodPDF.findById(id);

    if (!document) {
      return res.status(404).send('Document not found');
    }

    const pdfBuffer = Buffer.from(document.data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${document.fileName}`);

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
app.get('/api/getCouncellor',async (req,res)=> {
    const count = await PDF.countDocuments();
    res.send(count.toString())
})
app.get('/api/getHod',async (req,res)=> {
    const count = await hodPDF.countDocuments();
    res.send(count.toString())
})
app.get('/api/getIncharge',async (req,res)=> {
    const count = await inchargePDF.countDocuments();
    res.send(count.toString())
})
app.get('/api/pdfs',async (req,res)=> {
    const details = await PDF.find({})
    res.json(details)
})
app.get('/api/hodpdfs',async (req,res)=> {
    const details = await hodPDF.find({})
    res.json(details)
})
app.get('/api/inchargepdfs',async (req,res)=> {
    const details = await inchargePDF.find({})
    res.json(details)
})
app.post('/api/saveToIncharge',async(req,res) => {
    

    const { signatureDataUrl, id } = req.body;

    const response = await hodPDF.findById(id);

    // Load the PDF buffer into pdf-lib
    const pdfDoc = await PDFDocument.load(response.data);

    // Add some text to the PDF
    const page = pdfDoc.getPage(0);
    const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();
    const fontSize = 24;
    const text = 'Hello, World!';
    const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const y = height / 2;
    page.drawImage(signatureImage, {
        x: 380,
        y: page.getHeight() - 860,
        width:170,
        heigth:50
    });

    // Delete document in the pdf collection

    const deletedDoc = await hodPDF.findByIdAndDelete(id);

    // Convert the modified PDF back to a buffer
    const pdfBytes = await pdfDoc.save();

    // Store the new PDF buffer in the new database
    const newDoc = new inchargePDF({ title: response.title, data: Buffer.from(pdfBytes) });

    newDoc.save()

    res.send({ success: true });
});
app.post('/api/saveToHOD',async(req,res) => {
    

    const { signatureDataUrl, id } = req.body;

    const response = await PDF.findById(id);

    // Load the PDF buffer into pdf-lib
    const pdfDoc = await PDFDocument.load(response.data);

    // Add some text to the PDF
    const page = pdfDoc.getPage(0);
    const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();
    const fontSize = 24;
    page.drawImage(signatureImage, {
        x: 105,
        y: page.getHeight() - 810,
        size: 14,
        width:170,
        height:50
    });

    // Delete document in the pdf collection

    const deletedDoc = await PDF.findByIdAndDelete(id);

    // Convert the modified PDF back to a buffer
    const pdfBytes = await pdfDoc.save();

    // Store the new PDF buffer in the new database
    const newDoc = new hodPDF({ title: response.title, data: Buffer.from(pdfBytes) });

    newDoc.save()

    res.send({ success: true });
});
app.post('/api/signature',async (req,res)=>{
    try {
        const {name,rollno,ug,year,
            branch,section,reason,leave,coarse,councellor,
            hod,selectedDate,signatureDataUrl } = req.body;
        const change=await user.updateOne(
            { person: "student", name: name, dept: branch },
            { $inc: { leaveCount: leave } })

        const fileDB = await template.findOne({title:"zzzzzx"});

        const fontSize = 50;
        const textSize = 14;    

        const pdfDoc = await PDFDocument.load(fileDB.data);

        const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
        // Get the page dimensions of the first page
        const page = pdfDoc.getPages()[0];

        page.drawImage(signatureImage, {
            x: 100,
            y: 100,
            width:170 ,
            height:50 ,
        });
        
        page.drawText(name, {
            x: 300,
            y: page.getHeight() - 252,
            size: textSize,
        });
        page.drawText(rollno, {
            x: 300,
            y: page.getHeight() - 275,
            size: textSize,
        });
        page.drawText(ug, {
            x: 300,
            y: page.getHeight() - 298,
            size: textSize,
        });
        page.drawText(branch, {
            x: 300,
            y: page.getHeight() - 322,
            size: textSize,
        });
        page.drawText(coarse, {
            x: 450,
            y: page.getHeight() - 298,
            size: textSize,
        });
        page.drawText(section, {
            x: 300,
            y: page.getHeight() - 345,
            size: textSize,
        });
        page.drawText(leave.toString(), {
            x: 340,
            y: page.getHeight() - 365,
            size: textSize,
        });
        page.drawText(leave.toString(), {
            x: 340,
            y: page.getHeight() - 443,
            size: textSize,
        });
        page.drawText(reason, {
            x: 230,
            y: page.getHeight() - 460,
            size: textSize,
        });
        page.drawText(selectedDate, {
            x: 242,
            y: page.getHeight() - 491,
            size: textSize,
        });
        page.drawText(councellor, {
            x: 105,
            y: page.getHeight() - 750,
            size: textSize,
        });
        page.drawText(hod, {
            x: 380,
            y: page.getHeight() - 750,
            size: textSize,
        });

        // Save the modified PDF document to a buffer
        const modifiedPdfData = await pdfDoc.save();
        
        // Convert modifiedPdfData to a Buffer object
        const modifiedPdfBuffer = Buffer.from(modifiedPdfData);

        // Create a new PDF document in MongoDB
        const newPdf = new PDF({
            title: name,
            data: modifiedPdfBuffer,
        });

        const stud = new students({
            name:name,
            rollno:rollno,
            ug:ug,
            year:year,
            branch:branch,
            section:section,
            leave:leave,
            coarse:coarse,
            councellor:councellor,
            hod:hod,
            selectedDate:selectedDate
        })
        await stud.save();
        const savedPdf=await newPdf.save();
        // Respond with a success message
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${name}.pdf`);
        res.send(savedPdf.data);

        } catch (error) {
            console.log(error)
            res.status(500).send('Server error');
        }
    })
app.listen(4000,() => {
    console.log("Server is listenning on 4000 port");
})


