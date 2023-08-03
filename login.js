const LoginForm = document .getElementById('login');

LoginForm.addEventListener('submit',(e) =>{e.preventDefault();
    const UserName2 = document.getElementById('fname').value;
    const Password2 = document.getElementById('password').value;
    //Read the Information from IndexedDB
CheckDataInIndexedDB(UserName2,Password2);
});

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