const PDFDocument = require('pdfkit');
var fs = require('fs');

const generateCertificate = (name, project, repo) => {
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
        .text('WITH THIS CERTIFICATE OF PARTICIPATION', 50, 500);
    doc.fontSize(16)
        .font('Roboto-Bold.ttf')
        .text(`Project Name: ${project}`, 50, 550);
    doc.fontSize(16)
        .font('Roboto-Bold.ttf')
        .text(`Repository: ${repo}`, 50, 580);
    doc.end();
}

var files = fs.readdirSync('./projects/');
files.filter(el => el.includes(".json")).map(file => {
    content = fs.readFileSync("./projects/" + file, 'utf8')
    let project = JSON.parse(content);
    project.teamMembers.forEach(name => {
        generateCertificate(name.name, project.projectName, project.repoURL)
    })
})
