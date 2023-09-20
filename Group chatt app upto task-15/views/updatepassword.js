
var updatepasswordbuttonid = document.getElementById('button');

var newpasswordid = document.getElementById('newpassword');


updatepasswordbuttonid.addEventListener('click', update_password);


function update_password(e){

    e.preventDefault();

    let jwttoken = localStorage.getItem('jwt_token');

    const updatedpassword = {
           newpassword: newpasswordid.value,
           jwttoken: jwttoken,

    }

    axios.post('http://localhost:3000/password/updatepassword', updatedpassword).then(response => {
        if(response.status === 200){
            document.body.innerHTML += '<div style="color:red;">password updated successfull <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        console.log(err)
    })


}