({
	onDataChange: function(cmp, evt, hlpr) {
		try {
			var
				data = cmp.get("v.data"),
				titlesArr = [],
				largesArr = [],
				thumbsArr = [];

			data.titles.forEach(function (item, i) {
				titlesArr.push(item);
			});

			cmp.set("v.titles", titlesArr);

			data.larges.forEach(function (item, i) {
				largesArr.push(item);
			});

			cmp.set("v.larges", largesArr);

			data.thumbs.forEach(function (item, i) {
				thumbsArr.push(item);
			});

			cmp.set("v.thumbs", thumbsArr);

			hlpr.initCarousel(cmp);
			
		} catch (err) {
			console.error(err);
		}
	}
})