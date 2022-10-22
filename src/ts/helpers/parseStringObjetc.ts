

export class ParseStringObject {
    stringObj: string;
    constructor() {}
    static parse(stringObj: string) {
        let strParsed = stringObj;
        strParsed.replace(/\n/g, '');
        JSON.parse(strParsed);
        return strParsed;
    }
}