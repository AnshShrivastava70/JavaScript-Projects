const fonts = ["cursive", "sans-serif", "serif", "monospace"];
let captchaValue = "";

(function () {
	function initCaptcha() {
		document
			.querySelector(".login-form .captcha .captcha-refresh")
			.addEventListener("click", function () {
				generateCaptcha();
				setCaptcha();
			});
		generateCaptcha();
		setCaptcha();
	}

	initCaptcha();

	document.querySelector(".login-form #login-btn").addEventListener("click", function () {
		if (validateInputs()) {
			validateCaptcha(captchaValue);
		}
	});
})();

function generateCaptcha() {
	let value = btoa(Math.random() * 1000000000);
	value = value.substr(0, 5 + Math.random() * 5);
	captchaValue = value;
}

function setCaptcha() {
	let html = captchaValue
		.split("")
		.map((char) => {
			const rotate = -20 + Math.trunc(Math.random() * 30);
			const font = Math.trunc(Math.random() * fonts.length);
			return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]};">${char}</span>`;
		})
		.join("");
	document.querySelector(".login-form .captcha .preview").innerHTML = html;
}

function sendMail() {
	var params = {
		name: document.getElementById("name").value,
		email: document.getElementById("email").value,
		message: document.getElementById("message").value,
	};

	const serviceID = "service_u7l1f4c";
	const templateID = "template_0fj4b2v";

	emailjs
		.send(serviceID, templateID, params)
		.then((res) => {
			document.getElementById("name").value = "";
			document.getElementById("email").value = "";
			document.getElementById("message").value = "";
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
			swal("Error", "An error occurred while sending the email", "error");
		});
}

function validateCaptcha(captchaValue) {
	let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;

	if (inputCaptchaValue === captchaValue) {
		swal({
			title: "Are you sure?",
			text: "Do you want to send this response?",
			icon: "warning",
			buttons: ["Abort", "Proceed"],
			dangerMode: false,
		}).then((willSubmit) => {
			if (willSubmit) {
				sendMail();
				swal("Response Submitted", {
					icon: "success",
					button: "Awesome (:",
				}).then(() => {
					resetCaptcha();
				});
			} else {
				swal("Process Aborted", "", "info");
			}
		});
	} else if (inputCaptchaValue !== captchaValue) {
		swal("Invalid Captcha", "", "error", { button: "Close" });
	}
}

function resetCaptcha() {
	let captchaInput = document.querySelector(".login-form .captcha-form input");
	let nameInput = document.getElementById("name");
	let emailInput = document.getElementById("email");
	let messageInput = document.getElementById("message");

	captchaInput.value = "";
	nameInput.value = "";
	emailInput.value = "";
	messageInput.value = "";
	captchaInput.parentElement.classList.remove("success");
	nameInput.parentElement.classList.remove("success");
	emailInput.parentElement.classList.remove("success");
	messageInput.parentElement.classList.remove("success");

	generateCaptcha();
	setCaptcha();
}

function validateInputs() {
	let nameValue = document.getElementById("name").value;
	let emailValue = document.getElementById("email").value;
	let messageValue = document.getElementById("message").value;
	let captchaValue = document.getElementById("captcha-form").value;
	let isValid = true;

	if (nameValue === "") {
		setError(document.getElementById("name"), "Name is required");
		isValid = false;
	} else {
		setSuccess(document.getElementById("name"));
	}

	if (emailValue === "") {
		setError(document.getElementById("email"), "Email is required");
		isValid = false;
	} else if (!isValidEmail(emailValue)) {
		setError(document.getElementById("email"), "Provide a valid email address");
		isValid = false;
	} else {
		setSuccess(document.getElementById("email"));
	}

	if (messageValue === "") {
		setError(document.getElementById("message"), "Message is required");
		isValid = false;
	} else {
		setSuccess(document.getElementById("message"));
	}

	if (captchaValue === "") {
		setError(document.getElementById("captcha-form"), "Captcha is required");
		isValid = false;
	} else {
		setSuccess(document.getElementById("captcha-form"));
	}

	return isValid;
}

const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

function moveToNextInput(event, nextInputId) {
	if (event.keyCode === 13) {
		document.getElementById(nextInputId).focus();
	}
}

