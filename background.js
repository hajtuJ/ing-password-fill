function init() {

	function getNumberFromString(string) {
		return string.replace (/[^\d.]/g, '');
	}

	// navigator.permissions.query({ name: 'clipboard-read' }).then(permission => {
	// 	if (permission.state === 'denied') {
	// 		throw new Error('Not allowed to read clipboard.');
	// 	}
	// 	navigator.clipboard.read().then(clipboardContents => {
	// 		const item = clipboardContents[0];
	// 		if (!item.types.includes('text/plain')) {
	// 			throw new Error('Clipboard contains non text.');
	// 		}
	// 		item.getType('text/plain').then(blob => {
	// 			blob.text().then(value => {
					// const arrayPass = value.split('');

					const pass = document.querySelector('input.ing-password-container__password-autocomplete').value;
					const arrayPass = pass;
					const inputs = document.querySelectorAll('div.ing-password-container__password--field input');
					
					let encodedPass = '';

					const fieldNick = document.querySelector('div.ing-password-container__header p strong');
					
					for (let i = 0; i < inputs.length; i++) {
						
						const el = inputs[i];
						const elPos = parseInt(getNumberFromString(el.getAttribute('id')));
						const passSignPos = elPos - 1;
						const passLetter = arrayPass[passSignPos];
						encodedPass += passLetter;
					}

					fieldNick.innerText = encodedPass;

	// 			});
	// 		});
	// 	})
	// });
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