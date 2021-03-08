const helper = {
    import : {
		url: (url) => {
			return new Promise((resolve, reject) => {
				let script = document.createElement('script');
				var filename = url.replace(/^.*[\\\/]/, '');
				script.type = 'text/javascript';
				script.setAttribute("id", filename);
				helper.import.removeService('head script[src="' + url + '"]');
				if($('head script[src="' + url + '"]').length == 0){
					script.src = url;
					script.addEventListener('load', () => resolve(script), false);
					script.addEventListener('error', () => reject(script), false);
					document.head.appendChild(script);
				}
			});
		},
		urls: (urls) => {
			return Promise.all(urls.map(helper.import.url));
		},
		removeService : function(link){
			if($(link).length != 0)
				$(link).remove();
		}
	}
}