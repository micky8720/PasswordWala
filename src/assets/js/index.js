console.log("js of index called...");
var CLIENT_ID = 'zn5ube43ez63mee';


function print(){
  console.log("Checking print...");
  
}
print();
// Parses the url and gets the access token if it is in the urls hash


function getAccessTokenFromUrl() {
  console.log("token from js file: "+utils.parseQueryString(window.location.hash).access_token);
 return utils.parseQueryString(window.location.hash).access_token;
}

 const token_dropbox = getAccessTokenFromUrl();


// If the user was just redirected from authenticating, the urls hash will
// contain the access token.
function isAuthenticated() {
  return !!getAccessTokenFromUrl();
}
// Render a list of items to #files
function renderItems(items) {
  var filesContainer = document.getElementById('files');
  items.forEach(function(item) {
    var li = document.createElement('li');
    li.innerHTML = item.name;
    filesContainer.appendChild(li);
  });
}
// This example keeps both the authenticate and non-authenticated setions
// in the DOM and uses this function to show/hide the correct section.
function showPageSection(elementId) {
 // document.getElementById(elementId).style.display = 'block';
}
if (isAuthenticated()) {
  showPageSection('authed-section');
  console.log("in if authenticated...");
  
  // Create an instance of Dropbox with the access token and use it to
  // fetch and render the files in the users root directory.
  var dbx = new Dropbox.Dropbox({ accessToken: getAccessTokenFromUrl() });
  dbx.filesListFolder({path: ''})
    .then(function(response) {
      renderItems(response.entries);
    })
    .catch(function(error) {
      console.error(error);
    });
} else {
 // showPageSection('pre-auth-section');
  // Set the login anchors href using dbx.getAuthenticationUrl()
  var dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID });
  console.log("dbx is :" + dbx);
  
  var authUrl = dbx.getAuthenticationUrl('http://localhost:4200/homecomponent/');
  document.getElementById('authlink').href = authUrl;
}

//  export{token_dropbox};

// index.exports = token_dropbox;