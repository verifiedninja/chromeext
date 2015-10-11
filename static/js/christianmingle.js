function runChristianMingle(userkey, token) {
	var site = 'christianmingle';
	
	// Home Page
	if (window.location.href.indexOf("www.christianmingle.com/central") != -1) {
		console.log("Verified.ninja extension is modifying this page.");

		// Top photo browser/slider usernames
		$("#slideshow-holder a").each(function() {
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
			
			return false;
		});
	
		// Recent Activity usernames
		$('.qow-username a').each(function() {
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
	}
	// Search page
	else if (window.location.href.indexOf("www.christianmingle.com/search") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
	
		// Spotlight username
		$('.spotlight-toptext a').each(function() {
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
	
		// Username on main page
		$('.username a').each(function() {
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
		
		$('.mini-profile .info > a').each(function() {
			$(this).css("float", "none");
		});
		
		// Popout profile
		$('.mini-profile .info h2').each(function() {
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
		
		
		// Photo Gallery
		$('.searchgallery .vtop h4 a').each(function() {
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
	}
	// News Feeds
	else if (window.location.href.indexOf("www.christianmingle.com/connect") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
	
		// /connect/
		$('#smile_ .first').each(function() {
			var that = this;
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user = $(this).html().trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).append(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
	
		// /connect/news_feed.html - Profile Activity
		$('#news_feed_events a#qow_profile_link').each(function() {
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
		
		// /connect/news_feed.html - Activity Feed
		$('#activity-feed .search_grp_header a').each(function() {
			var that = this;
			$(this).css("display", "inline-block");
			$(this).css("margin-right", "5px");
			var user_block = $(this).html().trim();
			var start = user_block.indexOf("&nbsp;")+5;
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
	// Inbox
	else if (window.location.href.indexOf("christianmingle.com/inbox") != -1) {
		console.log("Verified.ninja extension is modifying this page.");
	
		// /connect/
		$('td.username').each(function() {
			var that = this;
			var user = $(this).html().trim();
			
			$.when(
				cacheProfileInfo(user, site, userkey, token)
			).then(function(){
				$(that).attr("data-ninja-checked", true);
				$(that).append(function() {
					return verifiedNinjaImg(user, site);
				});
			});
		});
	}
}