const Printer = require('pdfmake')
const path = require('path')
const fs = require('fs')
const reader = require('xlsx')
const dataset = require('./utils/dataset_config');

const seqFormat = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L"];

const breaks = [
    {
        str: 0,
        end: 32,
        que: ""
    },
    {
        str: 33,
        end: 54,
        que: ""
    },
    {
        str: 55,
        end: 61,
        que: ""
    },
    {
        str: 62,
        end: 69,
        que: ""
    },
    {
        str: 70,
        end: 71,
        que: ""
    },
    {
        str: 72,
        end: 86,
        que: ""
    },
    {
        str: 87,
        end: 87,
        que: ""
    }
]

const itrAllowedValues = [1, 2, 3, 4, 6, 7];

module.exports.pdf = async (itr) => {

    console.log(itrAllowedValues, parseInt(itr), itrAllowedValues.indexOf(parseInt(itr)));
    const config = dataset['config'];
    var printer = new Printer({
        Roboto: {
            normal: path.resolve('fonts', 'times-new-roman.ttf'),
            bold: path.resolve('fonts', 'times-new-roman-grassetto.ttf')
        }
    })

    var pdfData = [];
    if (itrAllowedValues.indexOf(parseInt(itr)) !== -1) {
        console.log(itr);
        (async () => {
            for (let i = breaks[itr - 1].str; i <= breaks[itr - 1].end; i++) {

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
                                text: queText,
                                style: 'textBold'
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
                    let randNo = Math.floor(Math.random() * config[i]['maxQue']) + 1;
                    // console.log(randNo);
                    randNo -= 1;

                    console.log(randNo, config[i]['path']);
                    if (!config[i]['path'].includes('syllogism')) {

                        const queText = config[i]['questionPrefix'] + data['B' + (1 + randNo * 4)].v + config[i]['questionSuffix'];
                        const queOpt1 = 'a. ' + data['C' + (2 + randNo * 4)].v;
                        const queOpt2 = 'b. ' + data['C' + (3 + randNo * 4)].v;
                        const queOpt3 = 'c. ' + data['G' + (2 + randNo * 4)].v;
                        const queOpt4 = 'd. ' + data['G' + (3 + randNo * 4)].v;
                        // console.log(queOpt1);


                        pdfData.push(
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 20,
                                marginBottom: 3,
                                text: queText,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt1
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt2
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt3
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt4
                            }
                        );


                    } else {


                        const queText1 = config[i]['questionPrefix'] + data['B' + (1 + randNo * 9)].v + config[i]['questionSuffix'];
                        const queText2 = '     ' + data['B' + (2 + randNo * 9)].v;
                        const queText3 = '     ' + data['B' + (3 + randNo * 9)].v;
                        const queText4 = '     ' + data['B' + (4 + randNo * 9)].v;
                        const queText5 = '     ' + data['B' + (5 + randNo * 9)].v;
                        const queText6 = '     ' + data['B' + (6 + randNo * 9)].v;

                        const queOpt1 = 'a. ' + data['C' + (7 + randNo * 9)].v;
                        const queOpt2 = 'b. ' + data['C' + (8 + randNo * 9)].v;
                        const queOpt3 = 'c. ' + data['G' + (7 + randNo * 9)].v;
                        const queOpt4 = 'd. ' + data['G' + (8 + randNo * 9)].v;

                        pdfData.push(
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 20,
                                marginBottom: 1,
                                text: queText1,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queText2,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queText3,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queText4,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queText5,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 3,
                                text: queText6,
                                style: 'textBold'
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt1
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt2
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt3
                            },
                            {
                                width: 500, // Full A4 size width.
                                marginTop: 1,
                                marginBottom: 1,
                                text: queOpt4
                            }
                        );
                    }

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
                // watermark: { text: 'test watermark', color: 'black', opacity: 0.1, bold: true, italics: false, fontSize: 44 }
            });

            doc.pipe(fs.createWriteStream('./file-' + itr + '.pdf'));
            doc.end()
        }, 10000)

        // let count = 1;
        // for (let data of pdfData) {
        //     console.log(data);
        //     if (data['text'] && data['text'].includes("Q.")) {
        //         const replaced = "Q." + count;
        //         count += 1;
        //         data['text'] = data['text'].replace("Q.", replaced);
        //         console.log("in if ", data);
        //     }
        // }
    }
}