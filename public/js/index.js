const TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

//Get all bookmarks
function fetchBookmarks(){
    let url= "/bookmarks";
    let settings={
        method: 'GET',
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    }
    let results = document.querySelector('.allBookmarks');
    fetch(url,settings)
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON=>{
            results.innerHTML="";
            for ( let i = 0; i < responseJSON.length; i ++ ){
                results.innerHTML += `<div> <p> Id: ${responseJSON[i]._id} </p>
                <p> Title: ${responseJSON[i].title}</p>
                <p> Description: ${responseJSON[i].description}</p>
                <p> Url: ${responseJSON[i].url}</p>
                <p> Rating: ${responseJSON[i].rating}</p>
                </div>`;
            }

        })
        .catch( err => {
            results.innerHTML = `<div> ${err.message} </div>`;
        });
}
//Add a bookmark filling the form
function addBookmarkFetch(id,title,description,url,rating){
    let path = '/bookmarks';
    let data ={
        id : id,
        title: title,
        description: description,
        url: url,
        rating:Number(rating)
    }
    let settings={
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
    //Cada metodo tiene su seccion de resultados para mostrar errores
    let results = document.querySelector('.post-results');

    fetch(path, settings)

    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJSON=>{
        fetchBookmarks();
    })
    .catch(err=>{
        results.innerHTML= `<div> ${err.message} </div>`;
    });

}

function watchAddBookmarksForm(){
    let addForm = document.querySelector('.add-bookmark-form');
    addForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        let id= document.getElementById('bookmarkId').value;
        let title= document.getElementById('bookmarkTitle').value;
        let description= document.getElementById('bookmarkDescription').value;
        let url = document.getElementById('bookmarkUrl').value;
        let rating = document.getElementById('bookmarkRating').value;

        addBookmarkFetch(id,title,description,url,rating);
        addForm.reset();

    })
}
//Delete a bookmark given an id
function deleteBookmarkFetch(id){
    let url= `/bookmark/${id}`;
    let settings ={
        method: 'DELETE',
        headers:{
            Authorization:  `Bearer ${TOKEN}`
            }
    }
    let results = document.querySelector('.delete-results');
    fetch(url,settings)
    

    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJSON=>{
        fetchBookmarks();
    })
    .catch(err=>{
        results.innerHTML= `<div> ${err.message} </div>`;
    });   
}

function watchDeleteBookmarkForm(){
    let deleteForm=document.querySelector('.delete-bookmark');
    deleteForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        let id = document.getElementById('idToDelete').value;
        deleteBookmarkFetch(id);
        deleteForm.reset();
    })
    }
//Update bookmark given an id
function updateBookmarkFetch(id,title,description,bookmarkUrl,rating){
    let url = `/bookmark/${id}`;
    let data ={
        id: id,
        title: title,
        description: description,
        url: bookmarkUrl,
        rating: Number(rating)
    }
    let settings={
        method: 'PATCH',
        headers:{
            Authorization :`Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)   
    }
    let results =document.querySelector(".update-results");
    fetch (url,settings)
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON=>{
            fetchBookmarks();
        })
        .catch(err=>{
            results.innerHTML=`<div> ${err.message} </div>`;
        })

}

function watchUpdateBookmarkForm(){
    let updateForm = document.querySelector('.update-bookmark');
    updateForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        let id= document.getElementById('idToUpdate').value;
        let title = document.getElementById('titleToUpdate').value;
        let description = document.getElementById('descriptionToUpdate').value;
        let bookmarkUrl = document.getElementById('urlToUpdate').value;
        let rating = document.getElementById('ratingToUpdate').value;

        updateBookmarkFetch(id,title,description,bookmarkUrl,rating);
        updateForm.reset();

    })
}
//Find a bookmark given a title
function searchBookmarkFetch(title){
    let url = `/bookmark?title=${title}`
    let settings={
        method: 'GET',
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    }
    let results = document.querySelector('.get-results');
    fetch (url,settings)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJSON=>{
        results.innerHTML="";
        for(let i=0;i<responseJSON.length();i++){
            results.innerHTML += `<div> <p> Id: ${responseJSON[i]._id} </p>
            <p> Title: ${responseJSON[i].title}</p>
            <p> Description: ${responseJSON[i].description}</p>
            <p> Url: ${responseJSON[i].url}</p>
            <p> Rating: ${responseJSON[i].rating}</p>
            </div>`;
        }
    })
    .catch(err=>{
        results.innerHTML=`<div> ${err.message} </div>`;
    })

}
function watchFindTitleForm(){
let searchTitleForm = document.querySelector('.getBookmark-title');
searchTitleForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let title = document.getElementById('searchTitle');
    searchBookmarkFetch(title);
    searchTitleForm.reset();
})
}



function init(){
    fetchBookmarks();
    watchAddBookmarksForm();
    watchDeleteBookmarkForm();
    watchUpdateBookmarkForm();
    watchFindTitleForm();
    
}

init();