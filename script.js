document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('nameInput');
  const phoneInput = document.getElementById('phoneInput');
  const name = nameInput.value.trim().toLowerCase();
  const phone = phoneInput.value.trim();
  const message = document.getElementById('message');
  const output = document.getElementById('output');

  let users = JSON.parse(localStorage.getItem('usersList')) || [];

  // Tekshir: ism avval ro‘yxatda bormi
  if (users.some(user => user.name === name)) {
    message.textContent = `❌ "${name}" ism bilan allaqachon ro‘yxatdan o‘tilgan.`;
    message.style.color = 'red';
  } else {
    users.push({ name: name, phone: phone });
    localStorage.setItem('usersList', JSON.stringify(users, null, 2));
    message.textContent = `✅ "${name}" muvaffaqiyatli ro‘yxatdan o‘tdi.`;
    message.style.color = 'green';
  }

  nameInput.value = '';
  phoneInput.value = '';
  output.textContent = JSON.stringify(users, null, 2);
});

function downloadTxt() {
  let users = JSON.parse(localStorage.getItem('usersList')) || [];
  let blob = new Blob([JSON.stringify(users, null, 2)], { type: "text/plain;charset=utf-8" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "registered.txt";
  link.click();
}
