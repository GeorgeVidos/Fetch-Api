
//get the books that you searched for
function getbooks(query) {
    let url = 'https://reststop.randomhouse.com/resources/works?search=' + query;

    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let init = {
        method: "GET",
        headers: myHeaders
    }

var obj;

    fetch(url, init)
        .then(response => response.json())
        .then(jsonData => obj = jsonData)
        .then((obj) => {
            console.log(obj);
            let books = obj.work;
            let output = '';
            $.each(books, (index, book) => {
                output += `
                
            <div class="well">
                <h5>Short title<br>${book.titleshort}</h5>
                <h5>Author<br>${book.authorweb}</h5>
              <h5>Year released <br>${book.onsaledate}</h5>
              <p>Workid <br>${book.workid}</p>
              
              <a onclick="BookSelected('${book.workid}')"  href="#">Book Details</a>
                <br><br>
            </div>
        `;
            });
            $('#books').html(output);
        })
}

let searchTimeoutToken = 0;
window.onload = () => {
    const searchFieldElement = document.getElementById("searchField");
    searchFieldElement.onkeyup = (event) => {

        clearTimeout(searchTimeoutToken);

        searchTimeoutToken = setTimeout(() => {
            getbooks(searchFieldElement.value);
        }, 250);
    };
}


//get the id from the selected book and show it in the next page
function BookSelected(id){
    console.log(id);
    sessionStorage.setItem('bookId', id);
    window.location = 'book.html';
    return false;
  }

var obj1;
//this function is called from book.html
//get the speccific book not all the books from the search
  function getBook(){
    let bookId = sessionStorage.getItem('bookId');

    console.log(bookId);
    let url = 'https://reststop.randomhouse.com/resources/works/' + bookId;
    console.log(url);


    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let init = {
        mode: "cors",
        method: "GET",
        headers: myHeaders,
    }
     fetch(url, init)
     .then(response => response.json())

     .then((jsonData) => {
         obj1 = jsonData;
         console.log(obj1);
        let book = jsonData;

       // console.log("obj1: " +obj1);
        let output =`
        <div class="row">
          </div>
            <ul class="list-group">
              <li><strong>Title:</strong> ${book.titleshort}</li>
              <li><strong>Author:</strong> ${book.authorweb}</li>
              <li><strong>WorkId:</strong> ${book.workid}</li>
            </ul>   
            <button id="favbtn" onclick="favbook(obj1)">add favourite</button>
            <button id="favbtn"onclick="deletebook(${book.workid})" >remove favourite</button></form>
          <br><br>
      </div>
        `;
  
        $('#book').html(output);
     })

  }

//send post request to local host /posts to save the book
  function favbook(obj1){


    let _data = {
      titleshort: obj1.titleshort,
      authorweb: obj1.authorweb,
      workid: obj1.workid
    }
    
        
      
    let url = 'http://localhost:5000/posts';


    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json')
    let init = {
        mode: "cors",
        method: "POST",
        headers: myHeaders,
        body:JSON.stringify(_data)
    }
    console.log( _data);
     fetch(url, init)
     .then(response => response.json())
     .then(data => {
       console.log('Success:', data);
     })
     .catch((error) => {
       console.error('Error:', error);
     });

  }

  //send post request to local host /posts to save the book
  function deletebook(id){

    let url = 'http://localhost:5000/posts/' + id;
    console.log(url);


    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let init = {
        method: "DELETE",
        headers: myHeaders,
    }
     fetch(url, init)
     .then(response => response.json())

     .then((jsonData) => {
         obj1 = jsonData;
         console.log(obj1);
     })

  }
