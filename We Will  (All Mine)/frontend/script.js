document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm'); // Form ID
    const registerForm = document.getElementById('registerForm'); // Register Form ID
    const errorMessageDiv = document.getElementById('error-message'); // Error message div
    const logoutButton = document.getElementById('logout-button'); // Logout button
    const loginButton = document.getElementById('login-button'); // Login button
    const welcomeMessage = document.getElementById('welcome-message'); // Welcome message element
    const usernameDisplay = document.getElementById('username-display'); // Username display element
    const registerMessageDiv = document.getElementById('register-message'); // Success message for registration
    const loginPopup = document.getElementById('login-popup'); // Login popup
    const closePopupButton = document.getElementById('close-popup'); // Close button for popup
    const cartButton = document.getElementById('cart-button'); // Cart button
    const cartPopup = document.getElementById('cart-popup'); // Cart popup
    const cardItemsContainer = document.getElementById('card-items-container'); // Container for cart items
    const closeCardPopupButton = document.getElementById('close-card-popup'); // Close button for cart popup

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(this); // Use the form element for FormData
            fetch('../backend/login.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text()) // Change to text for debugging
                .then(data => {
                    console.log('Login Response:', data); // Log response for debugging
                    if (data.includes("ورود موفقیت‌آمیز بود!")) {
                        errorMessageDiv.textContent = ""; // Clear error messages

                        // Close the login popup
                        loginPopup.style.display = "none";

                        // Update the login button with the username
                        fetch('../backend/check_session.php')
                            .then(response => response.json())
                            .then(sessionData => {
                                if (sessionData.status === 'logged_in') {
                                    loginButton.style.display = 'none'; // Hide login button
                                    logoutButton.style.display = 'block'; // Show logout button
                                    usernameDisplay.textContent = sessionData.username; // Set username in welcome message
                                    welcomeMessage.style.display = 'inline'; // Show welcome message
                                    loadCart(); // Load the cart after successful login
                                }
                            });
                    } else {
                        // Display the error message inside the form
                        errorMessageDiv.textContent = data;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorMessageDiv.textContent = 'خطا در ارسال درخواست: ' + error.message; // Display network errors
                });
        });
    }

    // Handle register form submission
    document.addEventListener('DOMContentLoaded', function() {
        const registerForm = document.getElementById('registerForm'); // Register Form ID
        const registerMessageDiv = document.getElementById('register-message'); // Success/Error message container

        // Handle register form submission
        if (registerForm) {
            registerForm.addEventListener('submit', async function(e) {
                e.preventDefault(); // Prevent default form submission

                // ابتدا اعتبارسنجی OTP
                const phoneNumber = document.getElementById('phone').value;
                const otpCode = document.getElementById('user_otp').value;

                const isOtpValid = await validateOtp(phoneNumber, otpCode); // اعتبارسنجی OTP
                if (isOtpValid) {
                    // اگر OTP معتبر بود، ادامه ثبت‌نام
                    const formData = new FormData(this); // Use the form element for FormData
                    fetch('../backend/register.php', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.text()) // Change to text for debugging
                        .then(data => {
                            console.log('Register Response:', data); // Log response for debugging
                            try {
                                const jsonData = JSON.parse(data); // Try parsing JSON
                                if (jsonData.status === 'success') {
                                    // Display success message
                                    registerMessageDiv.textContent = jsonData.message; // Show success message
                                    registerMessageDiv.style.color = "green"; // Make sure the message is visible

                                    // Close the register form after a short delay
                                    setTimeout(() => {
                                        closePopup(); // Close the registration popup
                                    }, 2000); // Close after 2 seconds
                                } else {
                                    // Display error messages returned from the server
                                    registerMessageDiv.textContent = jsonData.message;
                                    registerMessageDiv.style.color = "red"; // Display error message in red
                                }
                            } catch (e) {
                                console.error('Error parsing JSON:', e);
                                registerMessageDiv.textContent = 'خطا در پردازش پاسخ از سرور'; // Display parsing error
                                registerMessageDiv.style.color = "red"; // Display error message in red
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            registerMessageDiv.textContent = 'خطا در ارسال درخواست: ' + error.message; // Display network errors
                            registerMessageDiv.style.color = "red"; // Display error message in red
                        });
                } else {
                    // اگر OTP معتبر نبود، نمایش پیام خطا
                    registerMessageDiv.textContent = "کد تایید نامعتبر است. لطفاً دوباره تلاش کنید.";
                    registerMessageDiv.style.color = "red";
                }
            });
        }

        // تابع برای ارسال OTP
        async function triggerOtp() {
            const phoneNumber = document.getElementById('phone').value;

            try {
                const response = await fetch('../backend/otp_send.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `user_phone=${encodeURIComponent(phoneNumber)}`
                });
                const data = await response.text();
                alert('کد تایید ارسال شد!');
                document.getElementById('otp_input_section').style.display = 'block'; // نمایش بخش کد تایید
            } catch (error) {
                alert('خطا در ارسال کد: ' + error.message);
            }
        }

        // تابع برای اعتبارسنجی OTP
        async function validateOtp(phoneNumber, otpCode) {
            try {
                const response = await fetch('../backend/otp_verify.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `user_phone=${encodeURIComponent(phoneNumber)}&user_otp=${encodeURIComponent(otpCode)}`
                });
                const data = await response.text();
                return data === "OTP معتبر است"; // OTP معتبر
            } catch (error) {
                throw new Error('خطا در تایید کد: ' + error.message);
            }
        }
    });


    // Check session on page load
        fetch('../backend/check_session.php') // Check if the user is already logged in
            .then(response => response.json())
            .then(sessionData => {
                if (sessionData.status === 'logged_in') {
                    loginButton.style.display = 'none'; // Hide login button
                    logoutButton.style.display = 'block'; // Show logout button
                    usernameDisplay.textContent = sessionData.username; // Set username in welcome message
                    welcomeMessage.style.display = 'inline'; // Show welcome message
                    loadCart(); // Load the cart on page load if logged in
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Logout functionality
        logoutButton.addEventListener('click', function() {
            fetch('../backend/logout.php') // Call the logout script
                .then(() => {
                    // After logout, reset the UI
                    logoutButton.style.display = 'none'; // Hide logout button
                    loginButton.style.display = 'block'; // Show login button
                    loginButton.textContent = 'ثبت‌نام / ورود'; // Reset button text
                    welcomeMessage.style.display = 'none'; // Hide welcome message
                })
                .catch(error => {
                    console.error('Error during logout:', error);
                });
        });



        // Function to load cart data
    function loadCart() {
        fetch('../backend/cart.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const cardItemsContainer = document.getElementById('card-items-container');
                cardItemsContainer.innerHTML = ''; // Clear existing items

                if (data.length > 0) {
                    document.getElementById('empty-card-message').style.display = 'none';

                    data.forEach(item => {
                        const row = document.createElement('tr');
                        row.classList.add('cart-item');  // Add styling class
                        row.setAttribute('data-product-id', item.product_id); // Set data attribute for product ID

                        row.innerHTML = `
                        <td>${item.product_name}</td>
                        <td>
                            <button class="decrease-btn">−</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="increase-btn">+</button>
                        </td>
                        <td>${item.price} تومان</td>
                        <td>${item.uid}</td> <!-- Add UID -->
                        <td>${item.server}</td> <!-- Add Server -->
                    `;
                        cardItemsContainer.appendChild(row);

                        // Add event listeners for the buttons
                        row.querySelector('.decrease-btn').addEventListener('click', function () {
                            removeFromCart(item.product_id);
                        });

                        row.querySelector('.increase-btn').addEventListener('click', function () {
                            addToCart(item.product_id);
                        });
                    });
                } else {
                    document.getElementById('empty-card-message').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });


    cartButton.addEventListener('click', function () {
            loadCart(); // Load the cart whenever the cart button is clicked
        });


    // Close popup when close button is clicked
        closeCardPopupButton.addEventListener('click', function () {
            cartPopup.style.display = 'none';
        });

        // Close popup when clicking outside of it
        window.addEventListener('click', function (event) {
            if (event.target === cartPopup) {
                cartPopup.style.display = 'none';
            }
        });
    }

    // Show login popup
        loginButton.addEventListener('click', function() {
            loginPopup.style.display = 'block';
        });

        // Close login popup
        closePopupButton.addEventListener('click', function() {
            loginPopup.style.display = 'none';
        });

        // Close popup when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === loginPopup) {
                loginPopup.style.display = 'none';
            }
        });

        // JavaScript to fetch products
    function fetchProductList() {
        fetch('../backend/product_list.php') // Fetch products from product_list.php
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('product-list'); // Assuming the HTML contains a div with this ID
                if (!productList) {
                    console.error('Product list element not found');
                    return; // Exit if the element is not found
                }

                let output = '';
                data.products.forEach(product => {
                    output += `
                    <div class="card">
                        <img src="${product.image_url}" alt="${product.product_name}" style="width:100%; height:auto;">
                        <h3>${product.product_name}</h3>
                        <p>قیمت: ${product.price} تومان</p>
                        <p>${product.description}</p>
                        <button class="btn-primary" onclick="addToCart(${product.product_id})">خرید</button>
                    </div>
                `;
                });

                productList.innerHTML = output; // Display the products
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    // Fetch products when the page loads
        fetchProductList();
    });

document.getElementById("purchase-history-button").addEventListener("click", function() {
    fetch("../backend/purchase_history.php")  // Path to PHP file returning purchase history
        .then(response => response.json())  // Parse as JSON for better control
        .then(data => {
            const container = document.getElementById("purchase-history-container");
            container.innerHTML = "";  // Clear previous data

            if (data.length === 0) {
                container.innerHTML = "<p>هنوز خریدی ثبت نشده است.</p>";
            } else {
                // Construct the table with purchase history
                let table = "<table class='purchase-history-table'><thead><tr><th>نام محصول</th><th>تاریخ خرید</th><th>قیمت</th></tr></thead><tbody>";

                data.forEach(item => {
                    table += `
                        <tr>
                            <td>${item.product_name}</td>
                            <td>${item.purchase_date}</td>
                            <td>${item.price} تومان</td>
                        </tr>
                    `;
                });

                table += "</tbody></table>";
                container.innerHTML = table;  // Inject the table into the container
            }
            document.getElementById("purchase-history-popup").style.display = "flex";  // Show popup
        })
        .catch(error => {
            console.error('Error fetching purchase history:', error);
            document.getElementById("purchase-history-container").innerHTML = "<p>خطا در بارگذاری سوابق خرید.</p>";
        });
});

// Close purchase history popup
    function closePurchaseHistoryPopup() {
        document.getElementById("purchase-history-popup").style.display = "none";
    }
// باز کردن سبد خرید
document.getElementById('cart-button').addEventListener('click', function() {
    document.getElementById('cart-popup').style.display = 'flex';
});

// بستن سبد خرید با کلیک بر روی دکمه بستن
document.getElementById('close-card-popup').addEventListener('click', function() {
    document.getElementById('cart-popup').style.display = 'none';
});

// بستن سبد خرید با کلیک خارج از پاپ‌آپ
window.addEventListener('click', function(event) {
    var cartPopup = document.getElementById('cart-popup');
    if (event.target === cartPopup) {
        cartPopup.style.display = 'none';
    }
});

// Add item to cart
function removeFromCart(productId) {
    fetch('../backend/product_remove_in_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Find the corresponding cart item row and update its quantity
                const quantityElement = document.querySelector(`.cart-item[data-product-id="${productId}"] .quantity`);
                if (quantityElement) {
                    const newQuantity = parseInt(quantityElement.textContent) - 1; // Decrease quantity by 1
                    if (newQuantity > 0) {
                        quantityElement.textContent = newQuantity; // Update the displayed quantity
                    } else {
                        // If the quantity is 0, remove the item from the DOM
                        quantityElement.closest('.cart-item').remove();
                    }
                }
            }
        });
}


// Add item to cart (modified to update the cart live)
function addToCart(productId) {
    // Check if the user is logged in
    fetch('../backend/check_session.php') // Assuming this endpoint checks session status
        .then(response => response.json())
        .then(sessionData => {
            if (sessionData.status === 'logged_in') {
                // User is logged in, proceed with adding the product to the cart
                fetch('../backend/product_add_in_cart.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ product_id: productId })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Check if the item is already in the cart
                            const existingItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
                            if (existingItem) {
                                // Update quantity
                                const quantityElement = existingItem.querySelector('.quantity');
                                quantityElement.textContent = parseInt(quantityElement.textContent) + 1; // Increase by 1
                            } else {
                                // If the item is new, add it to the cart
                                const cardItemsContainer = document.getElementById('card-items-container');
                                const newRow = document.createElement('tr');
                                newRow.classList.add('cart-item');
                                newRow.setAttribute('data-product-id', productId);

                                newRow.innerHTML = `
                                    <td>${data.product_name}</td>
                                    <td>
                                        <button class="decrease-btn">−</button>
                                        <span class="quantity">1</span>
                                        <button class="increase-btn">+</button>
                                    </td>
                                    <td>${data.price} تومان</td>
                                `;

                                cardItemsContainer.appendChild(newRow);

                                // Add event listeners for new item buttons
                                newRow.querySelector('.decrease-btn').addEventListener('click', function () {
                                    removeFromCart(productId);
                                });

                                newRow.querySelector('.increase-btn').addEventListener('click', function () {
                                    addToCart(productId);
                                });
                            }
                        }
                    });
            } else {
                // User is not logged in, show the login prompt popup
                const loginPromptPopup = document.getElementById('login-prompt-popup');
                loginPromptPopup.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
        });
}


function closeCardPopupButton() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = 'none'; // Hide the cart popup
}
function closeLoginPromptPopup() {
    const loginPromptPopup = document.getElementById('login-prompt-popup');
    loginPromptPopup.style.display = 'none'; // Hide the login prompt popup
}

function closePopup() {
    const loginPopup = document.getElementById('login-popup');
    loginPopup.style.display = 'none'; // Hide the login popup
}
function openLoginPopup() {
    const loginPopup = document.getElementById('login-popup');
    const loginPromptPopup = document.getElementById('login-prompt-popup');

    loginPromptPopup.style.display = 'none'; // Hide the login prompt popup
    loginPopup.style.display = 'block'; // Show the login popup
}

// Function to process purchase history data
function handlePurchaseHistoryData(data) {
    const container = document.getElementById("purchase-history-container");
    container.innerHTML = "";  // Clear previous data

    // Check if the response is an error object (has 'error' key)
    if (data.error) {
        container.innerHTML = `<p>${data.error}</p>`;
        document.getElementById("purchase-history-popup").style.display = "flex";  // Show the popup
        return;
    }

    // Check if data is an array
    if (Array.isArray(data)) {
        if (data.length === 0) {
            container.innerHTML = "<p>هنوز خریدی ثبت نشده است.</p>";
        } else {
            let table = "<table class='purchase-history-table'><thead><tr><th>نام محصول</th><th>تعداد</th><th>قیمت کل (تومان)</th><th>تاریخ خرید</th><th>UID</th><th>سرور</th></tr></thead><tbody>";

            data.forEach(item => {
                table += `
                    <tr>
                        <td>${item.product_name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.total_price} تومان</td>
                        <td>${item.purchased_at}</td>
                        <td>${item.uid}</td>
                        <td>${item.server}</td>
                    </tr>
                `;
            });

            table += "</tbody></table>";
            container.innerHTML = table;
        }
        document.getElementById("purchase-history-popup").style.display = "flex";  // Show the popup
    } else {
        // If the data is not an array or an error, show a generic error message
        container.innerHTML = "<p>خطای ناشناخته‌ای رخ داده است.</p>";
    }
}

// Event listener for the "Purchase History" button
document.getElementById("purchase-history-button").addEventListener("click", function() {
    fetch("../backend/purchase_history.php")
        .then(response => response.text())  // Get the raw text response for logging/debugging
        .then(data => {
            console.log("Raw response:", data);  // Log the raw response

            let parsedData;
            try {
                parsedData = JSON.parse(data);  // Attempt to parse the response as JSON
            } catch (error) {
                console.error('Error parsing JSON:', error);
                document.getElementById("purchase-history-container").innerHTML = "<p>خطا در پردازش پاسخ سرور.</p>";
                return;  // Stop execution if parsing fails
            }

            // Use the dedicated function to handle the parsed data
            handlePurchaseHistoryData(parsedData);
        })
        .catch(error => {
            console.error('Error fetching purchase history:', error);
            document.getElementById("purchase-history-container").innerHTML = "<p>خطا در بارگذاری سوابق خرید.</p>";
        });
});
function showForm(formType) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("otp-form").style.display = formType === "otp" ? "block" : "none";

    document.getElementById("register-form").style.display = "none";
    document.getElementById("reset-form").style.display = "none";

    if (formType === "login") {
        document.getElementById("login-form").style.display = "block";
    } else if (formType === "otp") {
        document.getElementById("otp-form").style.display = "block";
    } else if (formType === "register") {
        document.getElementById("register-form").style.display = "block";
    } else if (formType === "reset") {
        document.getElementById("reset-form").style.display = "block";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Other DOM content-loaded scripts can be here
});
document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('resetForm'); // The reset password form
    const resetFormMessageDiv = document.createElement('div'); // Create a div for success/error messages
    resetForm.appendChild(resetFormMessageDiv); // Append the message div to the form

    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(this); // Use the form element for FormData

            fetch('../backend/reset_password.php', { // Send the form data to reset_password.php
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    // Display the response (success or error) inside the popup
                    resetFormMessageDiv.textContent = data;
                    resetFormMessageDiv.style.color = data.includes('A password reset link has been sent') ? 'green' : 'red'; // Change text color based on success/error
                })
                .catch(error => {
                    // Handle error
                    resetFormMessageDiv.textContent = 'An error occurred: ' + error.message;
                    resetFormMessageDiv.style.color = 'red';
                });
        });
    }
});

function closePopup() {
    const loginPopup = document.getElementById('login-popup');
    loginPopup.style.display = 'none'; // پنهان کردن پاپ‌آپ لاگین



    // بازنشانی فرم‌ها و مخفی کردن بخش OTP
    resetOtpForm();
}

// تابع برای بازنشانی فرم OTP
function resetOtpForm() {
    document.getElementById('otpForm').reset(); // بازنشانی فرم ورود
    document.getElementById('otp-input-section').style.display = 'none'; // مخفی کردن فیلد OTP
    document.getElementById('otp-status').innerText = ''; // پاک کردن پیام وضعیت
}
// کد برای بستن پاپ‌آپ با کلیک بر روی دکمه بستن
document.getElementById('close-popup').addEventListener('click', function() {
    closePopup(); // فراخوانی تابع برای بستن پاپ‌آپ و بازنشانی فرم‌ها
});

// کد برای بستن پاپ‌آپ با کلیک بر روی فضای بیرونی پاپ‌آپ
window.addEventListener('click', function(event) {
    const loginPopup = document.getElementById('login-popup');
    if (event.target === loginPopup) {
        closePopup(); // بستن پاپ‌آپ و بازنشانی فرم‌ها
    }
});
// تابع برای ارسال OTP
function sendOtp() {
    const email = document.getElementById('email').value;

    fetch('../backend/otp_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}`
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('otp-status').innerText = data;
            document.getElementById('otp-input-section').style.display = 'block'; // نمایش فیلد OTP پس از ارسال

            // دریافت زمان فعلی از اینترنت و شروع تایمر
            fetch('http://worldtimeapi.org/api/ip') // استفاده از API برای دریافت زمان
                .then(response => response.json())
                .then(data => {
                    const currentTime = new Date(data.datetime); // زمان فعلی
                    const expiresAt = new Date(currentTime.getTime() + 5 * 60000); // زمان انقضای 5 دقیقه بعد
                    startTimer(expiresAt); // شروع تایمر
                })
                .catch(error => {
                    console.error('خطا در دریافت زمان:', error);
                    alert('خطا در دریافت زمان. لطفاً دوباره تلاش کنید.');
                });
        })
        .catch(error => {
            document.getElementById('otp-status').innerText = 'خطا در ارسال کد OTP';
        });
}

// تابع برای شروع تایمر
function startTimer(expiresAt) {
    const display = document.getElementById('timer');

    const interval = setInterval(function () {
        const currentTime = new Date();
        const remainingTime = expiresAt - currentTime;

        if (remainingTime <= 0) {
            clearInterval(interval);
            display.textContent = "زمان منقضی شده است!";
            document.getElementById('verifyOtpButton').disabled = true; // غیر فعال کردن دکمه تایید
        } else {
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            display.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // فرمت زمان
        }
    }, 1000);
}

// تابع برای تایید OTP
function verifyOtp() {
    const loginForm = document.getElementById('loginForm'); // Form ID
    const registerForm = document.getElementById('registerForm'); // Register Form ID
    const errorMessageDiv = document.getElementById('error-message'); // Error message div
    const logoutButton = document.getElementById('logout-button'); // Logout button
    const loginButton = document.getElementById('login-button'); // Login button
    const welcomeMessage = document.getElementById('welcome-message'); // Welcome message element
    const usernameDisplay = document.getElementById('username-display'); // Username display element
    const registerMessageDiv = document.getElementById('register-message'); // Success message for registration
    const loginPopup = document.getElementById('login-popup'); // Login popup
    const closePopupButton = document.getElementById('close-popup'); // Close button for popup
    const cartButton = document.getElementById('cart-button'); // Cart button
    const cartPopup = document.getElementById('cart-popup'); // Cart popup
    const cardItemsContainer = document.getElementById('card-items-container'); // Container for cart items
    const closeCardPopupButton = document.getElementById('close-card-popup'); // Close button for cart popup
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;


        fetch('../backend/verify_otp.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
        })
            .then(response => response.text())
            .then(data => {
                document.getElementById('otp-status').innerText = data;

                // پس از تایید موفقیت‌آمیز OTP، بررسی وضعیت سشن
                fetch('../backend/check_session.php')
                    .then(response => response.json())
                    .then(sessionData => {
                        if (sessionData.status === 'logged_in') {
                            document.getElementById('login-button').style.display = 'none'; // پنهان کردن دکمه ورود
                            document.getElementById('logout-button').style.display = 'block'; // نمایش دکمه خروج
                            document.getElementById('username-display').textContent = sessionData.username; // نمایش نام کاربری
                            document.getElementById('welcome-message').style.display = 'inline'; // نمایش پیام خوش‌آمدگویی
                        }
                    });
            })
            .catch(error => {
                document.getElementById('otp-status').innerText = 'خطا در تایید کد OTP';
            });
    }

// بررسی سشن هنگام بارگذاری صفحه
    document.addEventListener('DOMContentLoaded', function() {
        fetch('../backend/check_session.php') // بررسی وضعیت سشن
            .then(response => response.json())
            .then(sessionData => {
                if (sessionData.status === 'logged_in') {
                    document.getElementById('login-button').style.display = 'none'; // پنهان کردن دکمه ورود
                    document.getElementById('logout-button').style.display = 'block'; // نمایش دکمه خروج
                    document.getElementById('username-display').textContent = sessionData.username; // نمایش نام کاربری
                    document.getElementById('welcome-message').style.display = 'inline'; // نمایش پیام خوش‌آمدگویی
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

