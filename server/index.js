const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = 8081;
const mysql = require("mysql2");
const pdfmake = require("pdfmake");

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-BoldItalic.ttf'
  }
};


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Global@259",
  database: "admit_card",
});

app.post("/api/saveData", async (req, res) => {
  try {
    const { name, phone, school, cls, roll, address } = req.body;
    if (!name || !phone || !school || !cls || !roll || !address) {
      return res.status(400).json({
        message: "please fill all the fields",
      });
    }

    const saveData =
      "INSERT INTO admit_card_table(name,phone,school,cls,roll,address) VALUES (?,?,?,?,?,?)";
    db.query(
      saveData,
      [name, phone, school, cls, roll, address],
      (error, result) => {
        if (error) {
          return res.status(404).json({ error: "unable to save data" });
        }
        return res.status(200).json({ message: "data saved sucessfully" });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/getData/:roll", (req, res) => {
  const roll = req.params.roll;
  db.query(
    "SELECT * FROM admit_card_table WHERE roll=?",
    [roll],
    (error, results) => {
      if (error) {
        throw error;
      }
      if(results.length === 0){
        return res.status(404).send("No data found");
      }
      
      const data = results[0];
      const pdfDoc = generatePDF(data);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition','attachment; filename=admit_card.pdf');

      pdfDoc.pipe(res);
      pdfDoc.end();
});
})

function generatePDF(data) {
  const docDefinition = {
    content: [
      { text: 'Admit Card', style: 'header' },
      { text: `Name: ${data.name}` },
      { text: `Phone: ${data.phone}` },
      { text: `School: ${data.school}` },
      { text: `Class: ${data.cls}` },
      { text: `Roll: ${data.roll}` },
      { text: `Address: ${data.address}` }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
        
      }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  const printer = new pdfmake(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return pdfDoc;
}


app.listen(port, () => {
  console.log(`server is up at port:${port}`)
})
