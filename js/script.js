// Supabase project details
const SUPABASE_URL = "https://rppkisbmszrujrwuqbsq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6LR9hbPvm0NO2l68p1SeCQ__1uQYhZC";

// Service request form
const form = document.getElementById("service-form");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const formMessage = document.getElementById("form-message");

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const contactMethod = document.getElementById("contact-method").value;
        const serviceSelect = document.getElementById("service");
        const service = serviceSelect.options[serviceSelect.selectedIndex].text;
        const message = document.getElementById("message").value.trim();

        // Clear previous message
        formMessage.textContent = "";
        formMessage.className = "form-message";

        // Disable button while submitting
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/service_requests`,
                {
                    method: "POST",
                    headers: {
                        "apikey": SUPABASE_PUBLISHABLE_KEY,
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },
                    body: JSON.stringify({
    full_name: name,
    email: email,
    phone: phone,
    contact_method: contactMethod,
    service: service,
    message: message
})
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            form.reset();

            formMessage.textContent =
                "Your service request has been submitted successfully. We will get back to you by email.";

            formMessage.className = "form-message success";

        } catch (error) {
            console.error("Submission error:", error);

            formMessage.textContent =
                "Sorry, your request could not be submitted. Please try again.";

            formMessage.className = "form-message error";
        }

        // Enable button again
        submitButton.disabled = false;
        submitButton.textContent = "Submit Request";
    });
}