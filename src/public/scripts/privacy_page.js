$(document).ready(function() {
	// get the form and the submit button by id
	var userPrivacyToggle = $('#updatePrivacy');
	var submitBtn = $('#privacySubmit');

	// call the update checkbox function; this function should check the box if the trek is currently
	// set to public, otherwise this function will do nothing
	updateCheckbox();

	// call the userPrivacyToggle function once the submit button is pressed; this function will update the
	// database based on whether or not the checkbox is checked
	userPrivacyToggle.submit(onUserPrivacy);

	// as earlier stated, this function will check if the trek is currently set to public or not. If it 
	// is, the checkbox will be checked to indicate this to the user	
	function updateCheckbox(event) {
		// initializes the checkboxStatus to a garbage value
		var checkboxStatus = -55;

		// gets the current trek id from the URL string; there's probably a much prettier way, but I was
		// desparate at this point
		var params = window.location.href;
		var parts = params.split("/");
		var idPart = parts[4];
		var id = parts[4].split("?");

		// user the value var as a parameter for the upcoming function
		var value = {};
		value.id = id;

		// call the getPrivacySettings function. This function should return the current value of the
		// current trek's public attribute. The checkboxStatus is then set equal to the returned value
		checkboxStatus = window.hikingBuddyApi.getPrivacySettings(value);

//		var replaced = $("body").html().replace('PLACEHOLDER','private');
//		$("body").html(replaced);
		$("div.placeholder").replaceWith("public");
//$( "div.second" ).replaceWith( "<h2>New heading</h2>" );

		// if the checkboxStatus was equal to 1, the hike is currently set to public. If this the case, 
		// check the checkbox
		if(checkboxStatus == 1) {
			$('#checkboxToggle').prop('checked', true);
			$("div.placeholder").replaceWith("public");

//			var replaced = $("body").html().replace('PLACEHOLDER','public');
//			$("body").html(replaced);
		}
	}

	// this function should update the database appropriately when the user presses the submit button
	function onUserPrivacy(event) {
		// prevents the screen from reloading and disables the submit button
		event.preventDefault();	
		submitBtn.prop('disabled', true);

		// get the checkbox by id
		var checkbox = $('#checkboxToggle');

		// initialize the formData var to 0. This var stores whether or not the checkbox is checked
		var formData = "0";

		// if the checkbox is checked, set the formData var to 1
		if(checkbox.is(':checked')) {
			formData = "0";
		}

		// once again, getting the id of the current trek from the URL string
		var params = window.location.href;
		var parts = params.split("/");
		var idPart = parts[4];
		var id = parts[4].split("?");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//	I THINK I WENT WRONG HERE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// trying to set the value to hold the appropriate parameters
		var value = {};
		value.val = formData;
		value.id = id[0];

// I believe the value variable is correct when displayed here
//console.log("VALUE IN privacy_page.js: " + value);

		// call the api function to update the table, passing in the value parameter
		window.hikingBuddyApi.toggleUser(value)
			// if the function finishes normally, alert the user that they have changed the status of 
			// the trek
			.done(function() {
				if(checkbox.is(':checked')) {
					alert("this trek has been set to public");
				}

				else {
					alert("this trek has been set to private");
				}

// this does not show the change that it should
console.log("VALUE AFTER SUBMITTING: " + window.hikingBuddyApi.getPrivacySettings(value));
				// this will redirect the page back to the current trek once those pages have been
				// integrated
//				window.location.href = `/viewtrek/${value.val}`;
			})
			// if the function failes, alert the user and re-enable the submit button
			.fail(function(response) {
				alert('Failed to update privacy settings! Error: ' + response.responseText);
				submitBtn.prop('disabled', false);
			});
	}
});
