var UPLOAD_URL 	= "https://api.imgur.com/3/image.json";

// Hardcode client id.
var CLIENT_ID_HARD 	= undefined;

// Div for image preview.
let imgPrevDiv 	= document.querySelector(".img-preview");
let urlPrev 		= document.querySelector("#uploadedImgUrl");

/**
 * This will be run after all is done.
 */
var injectUrl = function() {
	console.log("[+] Success uploading!");
	let res = JSON.parse(this.responseText);
	imgPrevDiv.setAttribute("src", res.data.link);
	urlPrev.value = res.data.link;
};

/**
 * Should be called onchange="uploadToImgur.call(this)" on a file input
 * element.
 */
var uploadToImgur = function() {
	if ('files' in this && this.files.length > 0)
		upload(this.files[0], injectUrl);
};

/**
 * Uploads a single file to imgur.
 * @param {File}	file 	File to upload.
 */
var upload = function(file, cb) {
	// empty url prev data
	urlPrev.value = "";
	// Get client id on change
	var CLIENT_ID = CLIENT_ID_HARD || document.querySelector("#client-id").value;

	if (CLIENT_ID.length < 1) {
		throw new Error("I need a client Id!");
	}

	// Form data
	let fd = new FormData();
	fd.append("image", file, file.name);

	// AJAX Request
	let xhr = new XMLHttpRequest();
	xhr.addEventListener("load", cb);
	xhr.open("POST", UPLOAD_URL);
	// Send authentication headers.
	xhr.setRequestHeader("Authorization", "Client-ID "+CLIENT_ID);
	// Send form data
	xhr.send(fd);
};
