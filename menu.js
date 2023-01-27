tagList = document.getElementById("highlight-add-tags");
a = 0
b = 1
function expandMenu() {
	// make the menu and tag list wider
	parent = document.getElementById("highlight-add-modal");
		var box = parent.getElementsByTagName("div");
		box[0].style.maxWidth = '90%';
	document.getElementById('highlight-add-form').style.width = '80%';

	// make the list a flexbox
	tagList.style.display = 'flex';
	tagList.style.flexWrap = 'wrap';

	// make list items flex items and break words normally
	var tags = tagList.getElementsByTagName("li");
	a = tags.length;
	for (var i = 0; i < tags.length-1; i++) {
		tags[i].style.flex = '1 0 25%';
		tags[i].style.margin = '0 2% 0 2%';
		tags[i].getElementsByTagName("label")[0].style.wordBreak = 'normal';
	}
}
expandMenu();

tagList.addEventListener('DOMNodeInserted', function(e) {
	// the way taguette updates the list is by removing everything from the old list and readding every tag so unfortunately we have to do this once for each tag haha
	
	console.log("peekaboo")
	if (b % a == 0) {
		expandMenu();
	}	
	b++;
});