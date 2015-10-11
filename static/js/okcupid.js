function runOkCupid(userkey, token) {
	// Profile Page
	if (window.location.href.indexOf("www.okcupid.com/profile") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
		var site = 'okcupid';
		
		var user = getUrlParts(window.location.href)[3];
		
		// Username at the top
		$('#basic_info_sn').each(function() {
			var that = this;	
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user = $(this).html().trim();
			
			if (verbose) {
				console.log("Found: " + user);
			}
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return wrapSpan(verifiedNinjaImg(user, site));
				});
			});
		});
		
		// Username at the very top after you scroll
		$('.username .name').each(function() {
			var that = this;	
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user = $(this).html().trim();
			
			if (verbose) {
				console.log("Found: " + user);
			}
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return wrapSpan(verifiedNinjaImg(user, site));
				});
			});
		});
		
	}
	// Browse Matches Page
	else if (window.location.href.indexOf("www.okcupid.com/match") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
		var site = 'okcupid';
					
		var cardCount = 0;
	
		var runFunc = function() {
			// Top photo browser/slider usernames
			$('.username a.name').each(function() {
				var that = this;	
				$(this).css("display", "inline-block");
				$(this).css("margin-right", "5px");
				var user = $(this).html().trim();
				
				if ($(that).attr("data-ninja-checked")) {
					return;
				}
				
				$.when(
					cacheProfileInfo(user, site, userkey, token)
				).then(function(){
					$(that).attr("data-ninja-checked", true);
					$(that).after(function() {
						return verifiedNinjaImg(user, site);
					});
				});
			});
		
			// Recent Activity usernames
			$('a.username').each(function() {
				var that = this;
				var user = $(this).html().trim();
				
				if ($(that).attr("data-ninja-checked")) {
					return;
				}
				
				$.when(
					cacheProfileInfo(user, site, userkey, token)
				).then(function(){
					$(that).attr("data-ninja-checked", true);
					$(that).after(function() {
						return verifiedNinjaImg(user, site);
					});
				});
			});
		};
		
		runFunc();
		
		setInterval(function() {
			var newCount = $(".match-results-cards").children().length
			if (cardCount != newCount) {
				cardCount = newCount
				runFunc();
			}
		}, 3000);
	}
	// Messages
	else if (window.location.href.indexOf("www.okcupid.com/messages") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
		var site = 'okcupid';
		
		// Usernames on inbox messages
		$('.inbox .subject').each(function() {
			var that = this;	
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user = $(this).html().trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
		
		// Usernames once in a message thread
		$('.username span.name').each(function() {
			var that = this;	
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user = $(this).html().trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
		
		// Usernames in sent folder
		$('.sent .subject').each(function() {
			var that = this;	
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user_block = $(this).html().trim();
			var start = user_block.indexOf("</span>")+7;
			var user = user_block.substring(start).trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
	}
	// Main Page
	else if (window.location.href.indexOf("www.okcupid.com/") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
		var site = 'okcupid';
		
		// Top photo browser/slider usernames
		$('.username a.name').each(function() {
			var that = this;	
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user = $(this).html().trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
	
		// Recent Activity usernames
		$('a.username').each(function() {
			var that = this;
			var user = $(this).html().trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).after(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
	}
}