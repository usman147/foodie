
// Signup as a User
const signupAsUser = ()=> {
    // Get values from the user
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var country = document.getElementById("country").value
    var city = document.getElementById("city").value
    var password = document.getElementById("password").value

    //console.log(email,password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;

        console.log("User Created Successfully!");

        var obj = {
            username : username,
            email : email,
            phone : phone,
            country : country,
            city :city,
            password :password,            
            uid : user.uid
        }        
        
        // Adding Additional fields to Firebase Database
        
        firebase.database().ref('Users').child(user.uid).set(obj)
        .then((data)=>{
            // Route User to a new page 
            //window.location='login.html'
            console.log("User's additional details Added!");
        })
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Display Error if there is a problem with SignUp
        console.log("Error Code: ", errorCode)
        console.log("Error Message: ", errorMessage)
    });
} 

// Register a Resturant
const signupAsResturant = ()=> {
    // Get values from the user
    var res_name = document.getElementById("res_name").value
    var res_email = document.getElementById("res_email").value
    var res_country = document.getElementById("res_country").value
    var res_city = document.getElementById("res_city").value
    var res_password = document.getElementById("res_password").value

    firebase.auth().createUserWithEmailAndPassword(res_email, res_password)
    .then((userCredential) => {
        var user = userCredential.user;

        console.log("Resturant registered Successfully!");

        var obj = {
            resturant_name : res_name,
            email : res_email,            
            country : res_country,
            city :res_city,
            password :res_password,        
            categories: ['Italian', 'Traditional', 'Chinesse'],    
            dishes: ['Biryani', 'Pizza', 'Chowmien'],    
            uid : user.uid
        }        
        
        // Adding Additional fields to Firebase Database
        
        firebase.database().ref('Resturants').child(user.uid).set(obj)
        .then((data)=>{
            // Route User to a new page 
            //window.location='login.html'
            console.log("Resturant's additional details Added!");
        })
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Display Error if there is a problem with SignUp
        console.log("Error Code: ", errorCode)
        console.log("Error Message: ", errorMessage)
    });
}

const signin = ()=> {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value


    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;

          // Adding current user in local Storage to utilize user info in UI
          localStorage.setItem('Current_user_ID' ,user.uid)
         

          var currentUserId = localStorage.getItem('Current_user_ID')

            console.log(currentUserId)

            // Search ID within Resturant collection
            firebase.database().ref().child('Resturants').orderByChild('uid').equalTo(currentUserId).once('value')
            .then((snap) => {
                var data = snap.toJSON();

                if (data == null) {
                    // Search ID within Users collection
                    firebase.database().ref().child('Users').orderByChild('uid').equalTo(currentUserId).once('value')
                    .then((snap) => {
                        var data = snap.toJSON();
                         // This is a User so we take it to Ordering page.
                        window.location='user-home.html'
                        const myvalue = Object.values(data)
                        localStorage.setItem('Current_user_name' , myvalue[0].username)
                    });
                }
                else{
                    // This is a Resturant owner so we take it to the dashboard
                    window.location='dashboard.html' 
                }
            });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Display Error if there is a problem with SignUp
        console.log("Error Code: ", errorCode)
        console.log("Error Message: ", errorMessage)
    });
}

// User Home

const abc = ()=> {
     // Show Restaurant collection
     firebase.database().ref('/Resturants').once('value', (snapshot) => {
        const data11 = snapshot.toJSON()
                const value = Object.values(data11)

                var user_data = []

                console.log(value)

                currentUsername = localStorage.getItem('Current_user_name')

                document.getElementById("display_username").innerHTML = currentUsername

                value.forEach(v=>
                 
                    user_data.push(v)   
                 )

               //  var data = document.getElementById("user_data");

                console.log("test", user_data)
                
                document.getElementById('user_data').innerHTML = user_data.map((user,i) => 
                    // console.log(Object.keys(user))
                    `
                    <div class="col-lg-4">
                        <div class="card">                        
                        <div class="card-body">
                            <h5 class="card-title">${user.resturant_name}</h5>
                            <p class="card-text">A tradional mughlai restaurant offering range of dishes for both meat and veg lovers... </p>
                        </div>
                        <div class="card-body">
                            <a href="#${user.uid}" class="card-link" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">View Dishes</a>
                        </div>
                        <ul class="list-group list-group-flush collapse" id="${user.uid}">                                                
                            ${user.Dishes_1? `<li>${user.Dishes_1} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_2? `<li>${user.Dishes_2} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_3? `<li>${user.Dishes_3} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_4? `<li>${user.Dishes_4} <button class="btn btn-primary float-end"onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_5? `<li>${user.Dishes_5} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_6? `<li>${user.Dishes_6} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_7? `<li>${user.Dishes_7} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_8? `<li>${user.Dishes_8} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_9? `<li>${user.Dishes_9} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}
                            ${user.Dishes_10? `<li>${user.Dishes_10} <button class="btn btn-primary float-end" onClick="test();">Order</button></li>`:``}                     
                        </ul>
                        <p>
                            Location: ${user.city} 
                        </p>
                        </div>             
                        </div>             
                    `
                )
     });
}

const test = ()=>{
    
}

// Restaurant Home

const dashboard = ()=>{
    
}