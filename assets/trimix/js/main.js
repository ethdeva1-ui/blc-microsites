(function () {
  var CART_URL = 'https://balancedlife-care.com/product/trimix-injection/';

  var STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  var form = document.getElementById('trimix-form');
  var errorEl = document.getElementById('form-error');
  var stateSelect = document.getElementById('state');

  document.getElementById('year').textContent = new Date().getFullYear();

  STATES.forEach(function (name) {
    var opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    stateSelect.appendChild(opt);
  });

  function fail(message, field) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    if (field) field.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.hidden = true;
    Array.prototype.forEach.call(form.elements, function (el) { el.classList && el.classList.remove('invalid'); });

    var f = form.elements;
    var checks = [
      [f.fullName, f.fullName.value.trim().length >= 2, 'Please enter your full name.'],
      [f.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()), 'Please enter a valid email address.'],
      [f.age, Number(f.age.value) >= 18, 'You must be 18 or older to continue.'],
      [f.state, f.state.value !== '', 'Please select your state.'],
      [f.consent, f.consent.checked, 'Please confirm you understand a prescription is required.']
    ];

    for (var i = 0; i < checks.length; i++) {
      if (!checks[i][1]) {
        checks[i][0].classList.add('invalid');
        return fail(checks[i][2], checks[i][0]);
      }
    }

    try {
      sessionStorage.setItem('trimixLead', JSON.stringify({
        fullName: f.fullName.value.trim(),
        email: f.email.value.trim(),
        phone: f.phone.value.trim(),
        age: f.age.value,
        state: f.state.value
      }));
    } catch (err) { /* storage unavailable; continue anyway */ }

    window.location.href = CART_URL;
  });
})();
