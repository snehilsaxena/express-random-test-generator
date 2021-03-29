const PDFMerger = require('pdf-merger-js');

module.exports.pdf = async (req, res, next) => {

    var merger = new PDFMerger();

    const randNo = [];
    for(let i=0; i<5; i++){
        randNo.push(Math.floor(Math.random() * 40) + 1);
    }

    console.log(randNo);


    (async () => {
        merger.add('./file.pdf');  
        merger.add('./dataset/pdf_based/PREFERENTIAL BASED QUESTIONS for mock test.pdf', randNo); 

        await merger.save('merged.pdf'); 
    })();

}

