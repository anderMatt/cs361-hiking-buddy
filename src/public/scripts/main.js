// Included in master layout.
// Exposes HikingBuddyApi object to interact with backend.

(function(window) {
    console.log('main.js loaded');
    window.hikingBuddyApi = window.hikingBuddyApi || new HikingBuddyApi();

    function HikingBuddyApi(){}

    HikingBuddyApi.prototype.registerUser = function(newUserData) {
        var url = "/api/users/register";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: newUserData
        });
    };

    // this is the api method responsible for changing the privacy settings of a 
    // hike. Uses a put method to update the necessary information
    HikingBuddyApi.prototype.toggleUser = function(value) {
        var url = "/api/users/privacy";
	return $.ajax({
	    url: url,
	    type: 'PUT',
	    dataType: 'json',
	    data: value
	});
    };

    HikingBuddyApi.prototype.updateUserPassword = function(passwordChangeFormData) {
        var url = "/api/users/password/update";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: passwordChangeFormData
        });
    }

    // this is the api method responsible for retrieving the privacy settings of a
    // hike. Uses a get method to SELECT the correct information. Uses an async method
    // and returns the appropriate info
    HikingBuddyApi.prototype.getPrivacySettings = function(id) {
        var url = "/api/treks/privacy";
	var result = null;

	$.ajax({
	    url: url,
	    type: 'GET',
	    dataType: 'json',
	    data: id,
	    async: false,
	    success: function(data) {
		result = data;
	    }
	});

	return result;
    };

    HikingBuddyApi.prototype.loginUser = function(formData) {
        var url = "/api/existinguser/getId";
        var result = null;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: formData,
        async: false,
        success: function(data) {
            result = data;
        },  
        error: function (xhr, ajaxOptions, thrownError) {
            result = null;
        }   
    }); 

    return result;
    };
})(window);
