function init() {

	function getNumberFromString(string) {
		return string.replace (/[^\d.]/g, '');
	}

	const pass = document.querySelector('input.ing-password-container__password-autocomplete').value;
	const arrayPass = pass;
	const inputs = document.querySelectorAll('div.ing-password-container__password--field input');

	let encodedPass = '';
	
	for (let i = 0; i < inputs.length; i++) {
		
		const el = inputs[i];
		const elPos = parseInt(getNumberFromString(el.getAttribute('id')));
		const passSignPos = elPos - 1;
		const passLetter = arrayPass[passSignPos];
		el.nextElementSibling.querySelector('span').innerText = passLetter;
		encodedPass += passLetter;
	}

	//focus first input
	inputs[0].focus();
	
}

chrome.commands.onCommand.addListener((command) => {
	chrome.tabs.query({url: "https://login.ingbank.pl/*"}, function(results) {
		if (results.length !== 0) {
			results.map((tab) => {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					function: init
				});
			});
		}
	});
});