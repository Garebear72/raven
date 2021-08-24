let maxAttempts = 3;
let currentAttempt = 0;
let maxNumber = 4;
let currentNumber = 0;
let passcode = '2467';
let passcodeEntered = [];

function getCookie(name) {
	let cookieArr = document.cookie.split(";");

	for (let i = 0; i < cookieArr.length; i++) {
		let cookiePair = cookieArr[i].split("=");

		if (name === cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1]);
		}
	}
	return null;
}

$('.numpad').children().on('click', function() {

	if (getCookie("maxAttempt")) {
		return alert('Max attempts exceeded. Please wait...');
	} else {
		let text = $(this).text();
		// Pushing the number clicked into an array
		passcodeEntered.push(text);
		// Incrementing the current number pushed up one
		currentNumber += 1;
		// Once the user reaches 4 buttons pushed, run the following check
		if (currentNumber === maxNumber) {
			// Revert array back into string, just because we can :)
			passcodeEntered = passcodeEntered.join('');
			// If the passcode entered is correct...
			if (passcodeEntered === passcode) {
				passcodeEntered = [];
				currentNumber = 0;
				alert('Woot');
				console.log('Success!');
			}
			// If passcode is incorrect, and the current attempt is LESS THAN the max attempts allowed...
			else if (currentAttempt < maxAttempts) {
				currentAttempt += 1;
				if (currentAttempt === maxAttempts) {
					let date = new Date();
					date.setSeconds(date.getSeconds() + 10);
					date = date.toUTCString();
					document.cookie = "maxAttempt=true; expires=" + date;
					passcodeEntered = [];
					currentNumber = 0;
					return alert('Max attempts exceeded. Please wait...');
				} else {
					passcodeEntered = [];
					currentNumber = 0;
					alert('LMFAO DUMBASS TRY AGAIN');
				}
			}
		}
	}
})

