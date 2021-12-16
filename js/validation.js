$(document).ready(function(){
    let usernameValid = false;
    let passwordValid = false;
    let dateOfBirthValid = false;

    let $username = $('input[name="studentID"]');
    let $password = $('input[name="password"]');
    let $dateOfBirth = $('input[name="gradDate"]');
       $username.on('change', function(e){
        var pattern = /^[A-Z]/;      
        usernameValid =  pattern.test(this.value) 
    })

    $password.on("change", function(e){
        if(this.value.length >= 9){
            passwordValid = true; 
        }        
    })

    $dateOfBirth.on("change", function(e){
       if(this.value) {
        dateOfBirthValid =  true;
       }        
    })

    $('form').on('submit', function(e){
        e.preventDefault();
        //validation code goes here
       console.log("valid", usernameValid);

        if (usernameValid && passwordValid && dateOfBirthValid){
           
            $('tbody').append(`<tr><td>${$('#studentID').val()}</td><td>${$('#password').val().length}</td><td>${$('#gradDate').val()}</td></tr>`)
            $('th').removeClass('ascending descending'); //new row added, so the table isn't sorted anymore
        }
    });

});