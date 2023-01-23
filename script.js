createHighlight(current_selection);

// ask for tag name
let tagname = prompt("Enter tag name:");
console.log("tagname: " + tagname);

// click add tag button
parent = document.getElementById("highlight-add-tags");
var addtagbutton = parent.getElementsByTagName("a"); 
if ( addtagbutton.length ) {
	addtagbutton[0].click();
}

// puts your tag name in the box
addbox = document.getElementById("tag-add-path");
addbox.value = tagname;

// click save button on the new tag box
parent = document.getElementById("tag-add-form");
var savenewtagbutton = parent.getElementsByClassName("btn-primary"); 
if ( savenewtagbutton.length ) {
	savenewtagbutton[0].click();
}
console.log("saved new tag " + tagname);

function findNewest(){
	// try to find the tag name in the list
	parent = document.getElementById("highlight-add-form");
	var taglabels = parent.getElementsByClassName("form-check-label");
	function getNewestLabel() {
		var newest = null;
		for (var i = 0; i < taglabels.length; i++) {
			var tag = taglabels[i].innerHTML;
			if (tag == tagname) {
				console.log("found tag: " + tagname)
				newest = taglabels[i];
				newest.previousSibling.checked = true;
				break;
			}
		}
	}
}

// click save button on the new highlight box
function saveHighlight(){
	if (newest != null) {
		parent = document.getElementById("highlight-add-form");
		var descendants = parent.getElementsByClassName("btn-primary"); 
		if ( descendants.length ) {
			descendants[0].click();
		}
	}
}

// check if the tag has been added
function checkTagAdded() {
	getNewestLabel();
	if (newest != null) {
		saveHighlight();
	}
}

// keep checking for the tag to be added because taguette is slow
setInterval(checkTagAdded,50);