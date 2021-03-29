const PDFMerger = require('pdf-merger-js');

module.exports.pdf = async (req, res, next) => {

    var merger = new PDFMerger();

    const randNo = [];
    for(let i=0; i<5; i++){
        randNo.push(Math.floor(Math.random() * 40) + 1);
    }

    const randNo2 = [];
    randNo2.push(Math.floor(Math.random() * 20) + 1);

    console.log(randNo);


    (async () => {
        merger.add('./front cover.pdf'); 
        merger.add('./file-1.pdf');  
        merger.add('./file-2.pdf');  
        merger.add('./file-3.pdf');  
        merger.add('./file-4.pdf');  
        merger.add('./file-5.pdf');  
        merger.add('./file-6.pdf');  
        merger.add('./dataset/pdf_based/PREFERENTIAL BASED QUESTIONS for mock test.pdf', randNo);
        merger.add('./dataset/pdf_based/prefer 2 questions.pdf', randNo2); 
        merger.add('./file-7.pdf');  

        await merger.save('merged.pdf'); 
    })();

}

