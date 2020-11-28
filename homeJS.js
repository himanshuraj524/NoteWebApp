let savebtn = document.getElementById('savebtn');
savebtn.addEventListener('click', function(){
    let notetxt = document.getElementById('notetxt');
    // console.log(notetxt.value);
    let savednotes = localStorage.getItem('notes');
    if (savednotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(savednotes);
    };
    notesObj.push(notetxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notetxt.value);
    notetxt.value = "";
});