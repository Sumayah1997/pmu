//Get Reference for both the Forms
const SignUpForm = document.getElementById('SignUpForm');
// const LoginForm = document .getElementById('LoginForm');

//Event Listener for SignUp
SignUpForm.addEventListener('submit',(e)=>{e.preventDefault();
    const Email1 = document.getElementById('email').value;
    const Fname1 = document.getElementById('fname').value;
    const Lname1 = document.getElementById('lname').value;
    const Password1 = document.getElementById('password').value;
//Store the Information in IndexedDB
SaveDataToIndexedDB(Email1,Fname1,Lname1, Password1);
});

//Function to Store Data in IndexedDB
function SaveDataToIndexedDB(Email,Fname, Lname, Password)
{   const User = {email:Email, fname:Fname, lname: Lname, password: Password};
    const request = window.indexedDB.open('UserDB',1);
    request.onerror = (event)=>
    {console.error('Sorry. Error Creating IndexedDB Database');};
    request.onsuccess = (event)=>
    {   const db = event.target.result;
        const transaction = db.transaction(['Users'],'readwrite');
        const objectstore = transaction.objectStore('Users');
        const addUserRequest = objectstore.add(User);
        addUserRequest.onsuccess = ()=>
        {
            window.location.href = "log.html";
            console.log('User Data Saved Successfully!');
        };
        transaction.onsuccess = ()=>{db.close();};
    };
    request.onupgradeneeded=(event)=>
    {   const db = event.target.result;
        db.createObjectStore('Users',{keyPath:'fname'});
    };
}

//Function to Checking User Data in the IndexedDB
function CheckDataInIndexedDB(UserName, Password)
{   const request = window.indexedDB.open('UserDB',1);
    request.onerror = (event)=>{console.error('Error while Reading!');};
    request.onsuccess = (event)=>
    {   const db = event.target.result;
        const transaction = db.transaction(['Users'],'readonly');
        const objectstore = transaction.objectStore('Users');
        const getUserRequest = objectstore.get(UserName);
        getUserRequest.onsuccess = () =>
        {   const User = getUserRequest.result;
            if(User && User.password === Password)
            {
                // console.log('Login Successful!');
                window.location.href = "fristpage.html"
            }
            else {
                document.getElementById("note").innerHTML=`Username or Password Incorrect`
            }
        };
        transaction.oncomplete= ()=>{db.close();};
    };
    request.onupgradeneeded=(event)=>
    {   const db=event.target.result;
        db.createObjectStore('Users',{keyPath:'UserName'});
    };
}