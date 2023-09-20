function forgotpassword(e) {
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    let jwttoken = localStorage.getItem('jwt_token');
    console.log(jwttoken);

    const userDetails = {
        email: form.get("email"),
           jwttoken: jwttoken,


    }
    console.log(userDetails)
    axios.post('http://localhost:3000/password/forgotpassword',userDetails).then(response => {
        if(response.status === 200){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })

}