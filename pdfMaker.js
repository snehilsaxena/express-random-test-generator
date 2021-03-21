const Printer = require('pdfmake')
const path = require('path')
const fs = require('fs')

module.exports.pdf = async (req, res, next) => {
    var printer = new Printer({
        Roboto: {
            normal: path.resolve('fonts', 'Roboto-Regular.ttf'),
            bold: path.resolve('fonts', 'Roboto-Bold.ttf'),
        }
    })

    var imageData = [];
    (async () => {
        let t = 0;
        while (t < 5) {
            t = t + 1;
            await fs.readFile('./dataset/figure_based/1-1.jpg', (err, data) => {
                if (err)
                    throw err;

                var image = new Buffer(data, 'base64')
                const textInfo = 'Que. No. ' + t + ' Solve it now';
                 imageData.push(
                    {
                        width: 500, // Full A4 size width.
                        margin: 10,
                        text: textInfo
                    },
                    {
                        image: image,
                        width: 500, // Full A4 size width.
                        margin: 10
                    }
                );
            });
        }
    })();

    setTimeout(() => {
        console.log(imageData);
        var doc = printer.createPdfKitDocument({
            info: {
                title: 'PDF with External Image',
                author: 'Matt Hagemann',
                subject: 'PDF with External Image',
            },
            content: imageData,
            defaultStyle: {
                fontSize: 11,
                font: 'Roboto', // The font name was defined above.
                lineHeight: 1.2,
            }
        });

        // doc.addPage({content:imageData[0]});
        // doc.addContent(imageData[0]);

        doc.pipe(fs.createWriteStream('./file.pdf'));
        doc.end()
    }, 10000)

}