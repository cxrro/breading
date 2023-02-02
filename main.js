var keybindingTag;

document.addEventListener('keydown', function(event) {
  if (!keybindingTag && event.code === 'Backquote') {
    setKeybinding();
  }
});

// function to handle the prompt and button logic
function setKeybinding() {
  keybindingTag = prompt("Enter the key you want to set as the new tag keybinding:");
  if(keybindingTag == null || keybindingTag == "") {
    keybindingTag = "`";
  }
}

function keypress(event) {
	if (event.key === keybindingTag) {
		highlightAndNewTag();
	}
}

document.addEventListener('keydown', keypress);
function highlightAndNewTag(){
	var newest = null;
	var current_selection = describeSelection();
	createHighlight(current_selection);

	// ask for tag name
	tagname = prompt("Enter tag name:");
	if (tagname == null || tagname == "") {
		return;
	}
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

	function describeSelection() {
		var sel = window.getSelection();
		if(sel.rangeCount != 0) {
		var range = sel.getRangeAt(0);
		if(!range.collapsed) {
			var start = describePos(range.startContainer, range.startOffset);
			var end = describePos(range.endContainer, range.endOffset);
			if(start !== null && end !== null) {
			return [start, end];
			}
		}
		}
		return null;
	}

	function describePos(node, offset) {
		// Convert current offset from character to bytes
		offset = lengthUTF8(node.textContent.substring(0, offset));
		while(!node.id) {
		if(node.previousSibling) {
			node = node.previousSibling;
			offset += lengthUTF8(node.textContent);
		} else {
			node = node.parentNode;
		}
		}
		if(node.id.substring(0, 11) != 'doc-offset-') {
		return null;
		}
		return parseInt(node.id.substring(11)) + offset;
	}
	// keep checking for the tag to be added
	var tagAdded = setInterval(checkTagAdded, 1000);

	// check if the tag has been added
	function checkTagAdded() {
		findNewest();
		if (newest) {
			saveHighlight();
			creating = false;
			clearInterval(tagAdded);
		}
	}

	// click save button on the new highlight box
	function saveHighlight(){
		if (newest) {
			parent = document.getElementById("highlight-add-form");
			var descendants = parent.getElementsByClassName("btn-primary"); 
			if ( descendants.length ) {
				descendants[0].click();
			}
		}
	}

	function createHighlight(selection) {
		document.getElementById('highlight-add-id').value = '';
		document.getElementById('highlight-add-start').value = selection[0];
		document.getElementById('highlight-add-end').value = selection[1];
		document.getElementById('highlight-add-form').reset();
	}

	function lengthUTF8(s) {
		return (new TextEncoder('utf-8').encode(s)).length;
	}
}