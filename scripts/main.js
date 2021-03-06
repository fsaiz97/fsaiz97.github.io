let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/puzzle-piece.jpg') {
      myImage.setAttribute('src','images/hacker.jpg');
    } else {
      myImage.setAttribute('src','images/puzzle-piece.jpg');
    }
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myName = prompt('Please enter your name.');
    if(!myName) {
        setUserName();
    }
    else {
        sessionStorage.setItem('name', myName);
        myHeading.textContent = 'Welcome to my site, ' + myName;
    }
}
  
if(!sessionStorage.getItem('name')) {
setUserName();
} else {
let storedName = sessionStorage.getItem('name');
myHeading.textContent = 'Welcome to my site, ' + storedName;
}

myButton.onclick = function() {
setUserName();
}
