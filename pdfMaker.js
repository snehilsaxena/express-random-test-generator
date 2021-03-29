const Printer = require('pdfmake')
const path = require('path')
const fs = require('fs')
const reader = require('xlsx')
const dataset = require('./utils/dataset_config');

const seqFormat = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L"];

module.exports.pdf = async (req, res, next) => {

    const config = dataset['config'];
    var printer = new Printer({
        Roboto: {
            normal: path.resolve('fonts', 'times-new-roman.ttf'),
            bold: path.resolve('fonts', 'times-new-roman-grassetto.ttf')
        }
    })

    var pdfData = [];
    (async () => {
        for (let i = 0; i < config.length; i++) {

            if (config[i]['figureBased']) {
                // console.log('iterating config array');
                const randNo = Math.floor(Math.random() * config[i]['maxQue']) + 1;
                // console.log(randNo);

                let fileName = "";
                if (config[i]['nameFormat'] === 0) {

                    fileName += config[i]['namePrefix'];
                    if (randNo < 10) {
                        fileName += "0";
                    }

                    fileName += randNo;
                    fileName += config[i]['nameSuffix'];

                } else if (config[i]['nameFormat'] === 1) {

                    fileName += config[i]['namePrefix'];
                    const div = Math.floor(randNo / 10);
                    const rem = randNo % 10;
                    if (rem == 0) {
                        fileName += seqFormat[div - 1];
                        fileName += "10";
                    } else {
                        fileName += seqFormat[div];
                        fileName += "0";
                        fileName += rem;
                    }
                    fileName += config[i]['nameSuffix'];

                }

                fileName += config[i]['extension'];
                const queNo = i + 1;
                const queText = config[i]['question'];

                const filePath = config[i]['path'] + fileName;
                // console.log(fileName);

                await fs.readFile(filePath, (err, data) => {
                    if (err)
                        throw err;

                    var image = new Buffer(data, 'base64');
                    pdfData.push(
                        {
                            width: 500, // Full A4 size width.
                            marginTop: 20,
                            marginBottom: 3,
                            text: queText
                        },
                        {
                            image: image,
                            width: 320,
                            style: "centerme"
                        }
                    );
                });
            }
            else {

                const file = reader.readFile(config[i]['path']);
                const data = file.Sheets[file.SheetNames[0]];
                // console.log(data);
                const randNo = Math.floor(Math.random() * config[i]['maxQue']) + 1;
                console.log(randNo);

                const queText = config[i]['questionPrefix'] + data['B' + (1 + randNo * 4)] + config[i]['questionSuffix'];
                const queOpt1 = 'a. ' + data['C' + (2 + randNo * 4)];
                const queOpt2 = 'b. ' + data['C' + (3 + randNo * 4)];
                const queOpt3 = 'c. ' + data['G' + (2 + randNo * 4)];
                const queOpt4 = 'd. ' + data['G' + (3 + randNo * 4)];
                // console.log(queOpt1);


                pdfData.push(
                    {
                        width: 500, // Full A4 size width.
                        marginTop: 20,
                        marginBottom: 3,
                        text: queText
                    },
                    {
                        width: 500, // Full A4 size width.
                        marginTop: 1,
                        marginBottom: 1,
                        text: queOpt1,
                        style: 'textBold'
                    },
                    {
                        width: 500, // Full A4 size width.
                        marginTop: 1,
                        marginBottom: 1,
                        text: queOpt2,
                        style: 'textBold'
                    },
                    {
                        width: 500, // Full A4 size width.
                        marginTop: 1,
                        marginBottom: 1,
                        text: queOpt3,
                        style: 'textBold'
                    },
                    {
                        width: 500, // Full A4 size width.
                        marginTop: 1,
                        marginBottom: 1,
                        text: queOpt4,
                        style: 'textBold'
                    }
                );

            }
        }
    })();

    setTimeout(() => {
        var doc = printer.createPdfKitDocument({
            info: {
                title: 'NATA Sample Paper',
                author: 'Snehil Saxena',
                subject: 'NATA Sample Paper',
            },
            content: pdfData,
            defaultStyle: {
                fontSize: 11,
                font: 'Roboto', // The font name was defined above.
                lineHeight: 1.2
            },
            styles: {
                rightme:
                {
                    alignment: 'right'
                },
                centerme:
                {
                    alignment: 'center'
                },
                textBold:
                {
                    bold: true
                }
            }
        });

        doc.pipe(fs.createWriteStream('./file.pdf'));
        doc.end()
    }, 10000)

}