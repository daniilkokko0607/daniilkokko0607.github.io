function regxpText() {
    let str = document.getElementById('source').value;
    let regexpAllPoints = new RegExp('\'', 'gm');
    let regexpReturnApostroph = /\b\"\b/gm;
    let newstr = str.replace(regexpAllPoints, '"');
    newstr = newstr.replace(regexpReturnApostroph, '\'');
    document.getElementById('output').value = newstr;
}
document.getElementById('source').addEventListener("keyup", regxpText);