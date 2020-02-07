import Lexer from 'flex-js';
import Tokens from './../utilities/tokens.js';
import { LEX_REGEX, LEX_KEYWORDS } from './lexer_tokens.js';

var myLexer = new Lexer();

function addKeywordsToLexerDefinitions() {
    let keywords = Object.entries(LEX_KEYWORDS);

    keywords.forEach(keyword => {
        myLexer.addDefinition(keyword[0], keyword[1].value);
    });
}

function addRegularExprKeywordsToLexerDefinitions() {
    let regExprKeywords = Object.entries(LEX_REGEX);

    regExprKeywords.forEach(regExprKeyword => {
        myLexer.addDefinition(regExprKeyword[0], regExprKeyword[1].pattern);
    });

    /*
     * Above is same as this: 
     * myLexer.addDefinition(LEX_REGEX.DIGIT.value, LEX_REGEX.DIGIT.pattern);
    */
}

function addKeywordsToLexerRules() {
    let keywords = Object.entries(LEX_KEYWORDS);

    keywords.forEach(keyword => {
        myLexer.addRule(keyword[1].value, () => {
            return keyword[1].token;
        });
    });
}

function addRegularExprKeywordsToLexerRules() {

    //Add these two first because they wont get added
    //in the forEach but we still want to add them in the rules anyways
    //but without an action
    myLexer.addRule(LEX_REGEX.WHITESPACE.pattern);
    myLexer.addRule(LEX_REGEX.COMMENT.pattern);
    myLexer.addRule(/.|\n/);

    let regExprKeywords = Object.entries(LEX_REGEX);

    regExprKeywords.forEach(regExprKeyword => {

        //Some regular expression are not tokens so dont add them
        if (regExprKeyword[1].token === null)
            return;

        myLexer.addRule(regExprKeyword[1].pattern, () => {
            return regExprKeyword[1].token;
        });
    });

    /* 
     * Above is same as this: 
     * myLexer.addRule(LEX_REGEX.IDENTIFIER.pattern, () => {
     *   return LEX_REGEX.IDENTIFIER.token;
     * });
    */
}

//Options
myLexer.setIgnoreCase(true);

//Definitions
addKeywordsToLexerDefinitions();
addRegularExprKeywordsToLexerDefinitions();

//Rules
addKeywordsToLexerRules();
addRegularExprKeywordsToLexerRules();


export default myLexer;