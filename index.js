import myLexer from './lexer/lexer.js';
import Lexer from 'flex-js';
import Tokens from './utilities/tokens.js';

function executeLexing() {
    //Todo: ReadFromFile and set the source to its
    myLexer.setSource("hola hola hola 23 \"Hey_YOU\" 43.212 /*This is a comment*/ //ven && and\n");

    let token;

    while ((token = myLexer.lex()) !== Lexer.EOF) {
        let text = myLexer.text;
        console.log("Token: " + token + ", " + text);
    }

}


executeLexing();