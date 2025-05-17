chrome.storage.local.get('savedPassword', ({ savedPassword }) => {
    if (!savedPassword) {
        alert('Brak zapisanego hasła!');
        return;
    }

    const root1 = document.querySelector('login-subapp')?.shadowRoot;
    const root2 = root1?.querySelector('login-auth')?.shadowRoot;
    const ingPinFields = root2?.querySelectorAll('ing-pin-field');

    ingPinFields?.forEach(pinField => {
        const shadow = pinField.shadowRoot;
        if (!shadow) return;

        // 🔢 Get the requested character position from <slot name="after">
        const slot = shadow.querySelector('slot[name="after"]');
        const projected = slot?.assignedNodes?.()[0]?.textContent?.trim();
        const position = parseInt(projected, 10);

        if (!position || isNaN(position)) {
            console.warn('❌ Brak pozycji:', projected);
            return;
        }

        if (position > savedPassword.length) {
            console.warn(`⛔ Pozycja ${position} przekracza długość hasła`);
            return;
        }

        // 🎯 Get the actual input from the <slot name="input">
        const inputSlot = shadow.querySelector('slot[name="input"]');
        const input = inputSlot?.assignedElements?.()[0];

        if (!input || input.disabled || input.readOnly || input.offsetParent === null) {
            console.warn('⚠️ Input niedostępny');
            return;
        }

        // ✍️ Fill the input with the correct character
        const char = savedPassword.charAt(position - 1);
        input.value = char;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        console.log(`✅ Wpisano znak ${position}: ${char}`);
    });
});