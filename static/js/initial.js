var ninja_site = "https://verified.ninja/";

function SyncNow() {
	$.get(ninja_site+"api/v1/request/token", function(data) {		
		if (data.Userkey != undefined && data.Token != undefined) {
		    localStorage.userkey = data.Userkey;
		    localStorage.token = data.Token;
			
			$("#error_note").addClass("hideit");
			$("#done_note").removeClass("hideit");
		} else {
			$("#error_note").removeClass("hideit");
			$("#done_note").addClass("hideit");
		}
	});	
}

document.getElementById("sync_button").addEventListener("click", SyncNow);