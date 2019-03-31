const PDFDocument = require('pdfkit');
var fs = require('fs');

const generateCertificate = (name) => {
    const doc = new PDFDocument({ margin: 5 });
    doc.pipe(fs.createWriteStream(`./certificates/${name}.pdf`));
    doc.image('banner.jpeg', {
        fit: [600, 300],
    });
    doc.fontSize(25)
        .font('Roboto-Bold.ttf')
        .text('SCHOOL OF AI PROUDLY PRESENTS', 50, 400);
    doc.fontSize(35)
        .font('Roboto-Bold.ttf')
        .text(name, 50, 450);
    doc.fontSize(25)
        .font('Roboto-Bold.ttf')
        .text('WITH THIS CERTIFICATE OF PARTICIPATION', 50, 530);
    doc.end();
}

var files = fs.readdirSync('./projects/');
files.filter(el => el.includes(".json")).map(file => {
    content = fs.readFileSync("./projects/" + file, 'utf8')
    console.log(JSON.parse(content).teamMembers.forEach(name => generateCertificate(name.name)))
})




generateCertificate("John Smith")