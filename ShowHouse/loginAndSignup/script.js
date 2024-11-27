document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    // Step 1: Check if `users` data exists in `localStorage`, if not, initialize it
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({ users: [] }));
    }

    // Step 2: Function to store new user data in `localStorage`
    const storeUserData = (email, password) => {
        // Retrieve existing user data
        const userData = JSON.parse(localStorage.getItem('users'));
        
        // Add the new user to the users array
        userData.users.push({ email, password });
        
        // Store the updated JSON object as a string in `localStorage`
        localStorage.setItem('users', JSON.stringify(userData));
    };

    // Step 3: Signup form handling to store details
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Store the new user data
            storeUserData(email, password);
            alert('Signup successful!');
        });
    }
});
