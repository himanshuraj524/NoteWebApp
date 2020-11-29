let savebtn = document.getElementById('savebtn');//accessing the save note button.
showNotes();//running the saveNotes function when the page loades.
savebtn.addEventListener('click', function () {
    /*event listener when user clicks on the save note button
    it will access the notetxt and save it into the localstorage of the browser
    by using JSON. and show it by calling showNotes */
    let notetxt = document.getElementById('notetxt');//notetxt.
    let savednotes = localStorage.getItem('notes');//accessing the notes obj from localstorage.
    if (savednotes == null) {
        /*if notes obj is null it will create a new one*/
        notesObj = [];
    } else {
        /*if note note obj is not null is will pasre it into the Json object form*/
        notesObj = JSON.parse(savednotes);
    };
    //here it will push the notetext in note obj.
    notesObj.push(notetxt.value);
    //converting the json object to string and saving it into localstorage.
    localStorage.setItem('notes', JSON.stringify(notesObj));
    //setting the notetext value to empty.
    notetxt.value = "";
    //again running the showNotes function to show all the saved notes.
    showNotes();
});

function showNotes() {
    /*This function will access the saved notes from the localstorage and show them in the page.*/
    let savednotes = localStorage.getItem('notes');//accessing notes.
    if (savednotes == null) {
        /*if notes obj is null it will create a new one*/
        notesObj = [];
    } else {
        /*if note note obj is not null is will pasre it into the Json object form*/
        notesObj = JSON.parse(savednotes);
    };
    //Empty html variable.
    let html = '';
    notesObj.forEach(function (element, index) {
        /*iterating the notes object for every element and add the below html data into the empty html variable. */
        html += `
        <div class="card">
        <p class="heading" id="noteHeading">mynote-${index + 1}</p>
        <p class="content" id="noteContent">${element}</p>
        <button type="submit" id="${index}" onclick="deleteNote(this.id)" class="btn">Delete note.</button>
        </div>
        `;
    });
    let notesElem = document.getElementById('myNotes');//accessing the notes container.
    if (notesObj != 0) {
        /*if notes obj is not 0 it will add the above html inside the innser html of the main notes container.*/ 
        notesElem.innerHTML = html;
    } else {
        /*if notes obj is null it will append the below html into the main notes container. */
        notesElem.innerHTML = `<p class="content" >Nothing to show! Use "Add a Note" section above to add notes.</p>`;
    };
};

function deleteNote(index) {
    /*This function access the notes from the localStorage and delete it by using the index number from note id when user click on the delete note button */
    let savednotes = localStorage.getItem('notes');
    if (savednotes == null) {
        /*if notes obj is null it will create a new one*/
        notesObj = [];
    } else {
        /*if note note obj is not null is will pasre it into the Json object form*/
        notesObj = JSON.parse(savednotes);
    };
    notesObj.splice(index, 1);//by splice function it will delete the note.
    localStorage.setItem('notes', JSON.stringify(notesObj));//after deleting the note again it will save the remaining notes in localstorage.
    showNotes();//again it will run the showNotes function.
};

/*This is used to search the notes based on their title and content. */
let searchtxt = document.getElementById('searchtxt');//accessing the search text from the search bar.
searchtxt.addEventListener('input', function(){
    /*
    This will lisen when user start typing the character in search bar.
     */
    let inputval = searchtxt.value.toLowerCase();//access the search bar text.
    let notesCard = document.getElementsByClassName('card');//accessing the note containers list.
    Array.from(notesCard).forEach(function(element) {
        /**
         * this will iterate over all the note containers match the title and content of the note with the searched text of the search bar.
         */
        let cardTitle = element.children[0].innerText.toLowerCase();
        let cardTxt = element.children[1].innerText;
        if (cardTxt.includes(inputval)||cardTitle.includes(inputval)) {
            //if it matched it will set the element display to block.
            element.style.display = "block";    
        } else {
            //if won't matched it will set the element display to none.
            element.style.display = "none";
        };
    });
});