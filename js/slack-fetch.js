/*  ダイアログ表示 */
var dialog = document.querySelector('dialog');
var showDialog = document.body;
console.log(showDialog);
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
console.log("DOMcomplete");
showDialog.addEventListener('DOMContentLoaded', function() {
    console.log("DOMcomplete");
    dialog.showModal();
    console.log("Dialog opened");
});
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});