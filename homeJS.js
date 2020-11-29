let savebtn = document.getElementById('savebtn');
showNotes();
savebtn.addEventListener('click', function () {
    // let noteTitle = document.getElementById('noteTitle');
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
    showNotes();
});

function showNotes() {
    let savednotes = localStorage.getItem('notes');
    if (savednotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(savednotes);
    };
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card">
        <p class="heading" id="noteHeading">mynote-${index + 1}</p>
        <p class="content" id="noteContent">${element}</p>
        <button type="submit" id="${index}" onclick="deleteNote(this.id)" class="btn">Delete note.</button>
        </div>
        `;
    });
    let notesElem = document.getElementById('myNotes');
    if (notesObj != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `<p class="content" >Nothing to show! Use "Add a Note" section above to add notes.</p>`;
    };
};

function deleteNote(index) {
    let savednotes = localStorage.getItem('notes');
    if (savednotes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(savednotes);
    };
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
};


let searchtxt = document.getElementById('searchtxt');
searchtxt.addEventListener('input', function searchnotes() {
    let inputval = searchtxt.value.toLowerCase();
    // console.log(inputval);
    let notesCard = document.getElementsByClassName('card');
    // console.log(notesCard);
    Array.from(notesCard).forEach(function(element) {
        // console.log(element.);
        // console.log(element);
        let cardTitle = element.children[0].innerText.toLowerCase();
        let cardTxt = element.children[1].innerText;
        if (cardTxt.includes(inputval)||cardTitle.includes(inputval)) {
            element.style.display = "block";

        } else {
            element.style.display = "none";
        };
    });
});