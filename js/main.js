// listen for fom submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//save bookmark
function saveBookmark(e){
//Get form value
var siteName = document.getElementById('siteName').value;
var sitUrl = document.getElementById('siteUrl').value;
if(!validateForm(siteName,sitUrl)){
    return false;
}
//Create Object
var Bookmark = {
    name:siteName,
    url:sitUrl,
}
/*
 //Local Storage
 localStorage.setItem('test','hello world');
 console.log(localStorage.getItem('test'))
 localStorage.removeItem('test')
 console.log(localStorage.getItem('test'))
*/
 // Test if bookmark is null
if(localStorage.getItem('Bookmarks') === null){
    // init array
    var Bookmarks = [];
    Bookmarks.push(Bookmark);
    // set local storage
    localStorage.setItem('Bookmarks',JSON.stringify(Bookmarks));
}else{
    // Get bookmark from local storage
    var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    //Add Bookmark to array
    Bookmarks.push(Bookmark);
    //Re-set back to local storage
    localStorage.setItem('Bookmarks',JSON.stringify(Bookmarks));
}
     // Re-set form
      document.getElementById('myForm').reset();
     // Re fetch form
     fetchBookmarks();
  //prevent form from submitting    
    e.preventDefault();
}
// Delete bookmark
function deleteBookmark(url){
    // Get bookmark from local storage
    var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    // loop through
    for(var i=0;i<Bookmarks.length;i++){
        if(Bookmarks[i].url == url){
            //Remove from array
            Bookmarks.splice(i,1);
        }
        //Re-set back to local storage
    localStorage.setItem('Bookmarks',JSON.stringify(Bookmarks));
    }
    fetchBookmarks();
}
// Fetch Bookmark
function fetchBookmarks(){
    // Get Bookmarks from local storage
    var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    // Get output Id
    var BookmarkResults = document.getElementById('bookmarkResults');
    // Build output
    BookmarkResults.innerHTML = '';
    for(var i=0; i<Bookmarks.length; i++){
        var name = Bookmarks[i].name
        var url = Bookmarks[i].url
        
        BookmarkResults.innerHTML += '<div class="well">'+'<h3>' +name+'<a class= "btn btn-default" target= "_blank" href="'+url+'">Visit</a>' +'<a onclick=deleteBookmark(\''+url+'\') class= "btn btn-danger" href="#">Delete</a>' + '</h3>'+'</div>';
    }
}
function validateForm(siteName,sitUrl){
    if(!siteName || !sitUrl){
        alert('Please Fill The Form!');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!sitUrl.match(regex)){
        alert('Please Enter Valid URL!');
        return false;
    }
    return true;
}