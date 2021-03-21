const express = require('express');
// const fs = require( 'fs' );
const app = express();
const pdfMaker = require('./pdfMaker');
// const router = express.Router();

app.get('', (req, res, next) => {
    
    pdfMaker.pdf();
    // res.setHeader('Content-type', 'application/pdf')
    // res.setHeader('Content-disposition', 'inline; filename="Example.pdf"')
    // res.sendFile('./abc.pdf');
    res.send('Completed');
    // (async ()=>{
    //     try {
    //         const files = await fs.promises.readdir( moveFrom );
    //         for( const file of files ) {
    //             console.log(file);
    //             convertImage(moveFrom+file);
    //         }
    //         res.send('Completed');
    //     }
    //     catch( e ) {
    //         console.error( "We've thrown! Whoops!", e );
    //         res.send('Not Completed');
    //     }
    // })();
});

app.listen(8080);
console.log("Server Started at port 8080!");
