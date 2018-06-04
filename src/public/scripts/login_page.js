$(document).ready(function() {
    var userLoginForm = $('#loginUser');
    var submitBtn = $('#loginSubmit');
    console.log(submitBtn);

    userLoginForm.submit(onUserLogin);

    function onUserLogin(event) {
        console.log('Logging user in...');
        event.preventDefault();
        submitBtn.prop('disabled', true);

        var formData = userLoginForm.serialize();
        var userId = window.hikingBuddyApi.loginUser(formData);

        if(userId == null) {
            alert("Invalid login info entered!");
            window.location.href = `/login`;
        }   

        else if(userId != null) {
            window.location.href = `/profile/${userId}`;
        }   
    }   
});
