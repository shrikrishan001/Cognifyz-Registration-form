// =====================================================
// Cognifyz Registration System
// Script.js
// Part 1
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // Form
    // ==========================================

    const form = document.querySelector("form");

    // ==========================================
    // Personal Information
    // ==========================================

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const countryCode = document.getElementById("countryCode");
    const dob = document.getElementById("dob");
    const gender = document.getElementById("gender");

    // ==========================================
    // Address
    // ==========================================

    const country = document.getElementById("country");
    const state = document.getElementById("state");
  const postoffice = document.getElementById("postoffice");
    const district = document.getElementById("district");
    const address = document.getElementById("address");
    const pincode = document.getElementById("pincode");


    const cityDistrictMap = {

    "Soron":"Kasganj",
    "Kasganj":"Kasganj",

    "Noida":"Gautam Buddha Nagar",
    "Greater Noida":"Gautam Buddha Nagar",

    "Lucknow":"Lucknow",

    "Agra":"Agra",

    "Mathura":"Mathura",

    "Meerut":"Meerut",

    "Ghaziabad":"Ghaziabad",

    "Kanpur":"Kanpur Nagar",

    "Varanasi":"Varanasi",

    "Prayagraj":"Prayagraj"

};

    // ==========================================
    // Password
    // ==========================================

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmpassword");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirm = document.getElementById("toggleConfirm");

    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    const matchMessage = document.getElementById("matchMessage");

    // ==========================================
    // Live Preview
    // ==========================================

    const welcomeText = document.getElementById("welcomeText");
    const liveName = document.getElementById("liveName");
    const liveEmail = document.getElementById("liveEmail");

    // ==========================================
    // Counter
    // ==========================================

    const charCount = document.getElementById("charCount");

    // ==========================================
    // Progress
    // ==========================================

    const progressBar = document.getElementById("progressBar");
    const progressPercent = document.getElementById("progressPercent");

    // ==========================================
    // Button
    // ==========================================

    const registerBtn = document.getElementById("registerBtn");

    // ==========================================
    // Error Labels
    // ==========================================

    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const dobError = document.getElementById("dobError");

    // ==========================================
    // Theme
    // ==========================================

    const themeToggle = document.getElementById("themeToggle");

    // ==========================================
    // Profile Image
    // ==========================================

    const profileImage = document.getElementById("profileImage");
    const profilePreview = document.getElementById("profilePreview");

    // ==========================================
    // Typing Text
    // ==========================================

    const typingText = document.getElementById("typingText");


        // ==========================================
    // Welcome Message
    // ==========================================
if (fullname) {

    fullname.addEventListener("input", function () {

        // Sirf alphabets aur spaces allow
        this.value = this.value.replace(/[^A-Za-z ]/g, "");

        const name = this.value.trim();

        // Welcome Text
        if (welcomeText) {

            if (name === "") {

                welcomeText.innerHTML = "";

            } else {

                welcomeText.innerHTML =
                    `👋 Welcome <b>${name}</b>`;

            }

        }

        // Live Name
        if (liveName) {

            liveName.innerText =
                name === "" ? "Guest User" : name;

        }

    });

}

    // ==========================================
    // Live Email Preview
    // ==========================================

    if (email) {

        email.addEventListener("input", function () {

            if (liveEmail) {

                if (email.value.trim() === "") {

                    liveEmail.innerText =
                        "guest@example.com";

                } else {

                    liveEmail.innerText =
                        email.value;

                }

            }

        });

    }

    // ==========================================
    // Address Character Counter
    // ==========================================

    if (address) {

        address.addEventListener("input", function () {

            if (charCount) {

                charCount.innerText =
                    address.value.length + " / 200";

            }

        });

    }

    // ==========================================
    // Email Validation
    // ==========================================

    if (email) {

        email.addEventListener("blur", function () {

            const value = email.value.trim();

            const regex =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (value === "") {

                email.style.border = "";

                if (emailError) {

                    emailError.innerHTML = "";

                }

                return;

            }

            if (regex.test(value)) {

                email.style.border =
                    "2px solid #198754";

                if (emailError) {

                    emailError.innerHTML = "";

                }

            }

            else {

                email.style.border =
                    "2px solid #dc3545";

                if (emailError) {

                    emailError.innerHTML =
                        "Enter a valid Email Address";

                    emailError.style.color =
                        "#dc3545";

                }

            }

        });

    }

        // ==========================================
    // Phone Validation
    // ==========================================

    if (phone) {

        phone.addEventListener("input", function () {

            const value = phone.value.trim();

            if (countryCode && countryCode.value === "+91") {

                const regex = /^[6-9][0-9]{9}$/;

                if (regex.test(value)) {

                    phone.style.border = "2px solid #198754";

                    if (phoneError) {

                        phoneError.innerHTML = "";

                    }

                }

                else {

                    phone.style.border = "2px solid #dc3545";

                    if (phoneError) {

                        phoneError.innerHTML =
                        "Enter a valid 10 digit Indian mobile number.";

                        phoneError.style.color = "#dc3545";

                    }

                }

            }

        });

    }

    // ==========================================
    // DOB Validation (18+)
    // ==========================================

    if (dob) {

        dob.addEventListener("change", function () {

            const birth = new Date(dob.value);
            const today = new Date();

            let age = today.getFullYear() - birth.getFullYear();

            const month = today.getMonth() - birth.getMonth();

            if (
                month < 0 ||
                (month === 0 &&
                today.getDate() < birth.getDate())
            ) {

                age--;

            }

            if (birth > today) {

                dob.style.border = "2px solid #dc3545";

                if (dobError) {

                    dobError.innerHTML =
                    "Future date is not allowed.";

                    dobError.style.color = "#dc3545";

                }

            }

            else if (age < 0) {

                dob.style.border = "2px solid #dc3545";

                if (dobError) {

                    // dobError.innerHTML =
                    // "Minimum age should be 5 years.";

                    dobError.style.color = "#dc3545";

                }

            }

            else {

                dob.style.border = "2px solid #198754";

                if (dobError) {

                    dobError.innerHTML = "";

                }

            }

        });

    }

    // ==========================================
    // Registration Progress
    // ==========================================

    function updateProgress() {

        const fields = document.querySelectorAll(
            "input[required], select[required], textarea[required]"
        );

        let valid = 0;

        fields.forEach(field => {

            if (field.checkValidity() && field.value.trim() !== "") {

                valid++;

            }

        });

        const percent = Math.round(
            (valid / fields.length) * 100
        );

        if (progressBar) {

            progressBar.style.width = percent + "%";

        }

        if (progressPercent) {

            progressPercent.innerHTML = percent + "%";

        }

    }

    document.querySelectorAll(
        "input,select,textarea"
    ).forEach(field => {

        field.addEventListener("input", updateProgress);

        field.addEventListener("change", updateProgress);

    });

    updateProgress();

    // ==========================================
    // Register Button Loading
    // ==========================================
if (form && registerBtn) {

    form.addEventListener("submit", function (e) {

        // Browser validation
        if (!form.checkValidity()) {
            return;
        }

        registerBtn.disabled = true;

        registerBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Registering...';

        // Agar 10 sec tak response na aaye to button wapas enable ho jaye
        setTimeout(() => {

            registerBtn.disabled = false;

            registerBtn.innerHTML = "Register";

        }, 10000);

    });

}

    // ==========================================
// Final Form Validation
// ==========================================

if(form){

form.addEventListener("submit",function(e){

    let isValid=true;

    const requiredFields = document.querySelectorAll(
"#fullname, #email, #phone, #dob, #gender, #country, #state, #district, #postoffice, #pincode, #password, #confirmPassword"
);

requiredFields.forEach(field => {

    if (!field) return;

    if (field.value.trim() === "") {

        field.classList.add("is-invalid");
        isValid = false;

    } else {

        field.classList.remove("is-invalid");

    }

});

    // -------------------------
    // Full Name
    // -------------------------

    if(fullname.value.trim().length<3){

        fullname.style.border="2px solid red";

        isValid=false;

    }

    else{

        fullname.style.border="2px solid green";

    }

    // -------------------------
    // Email
    // -------------------------

    const emailRegex=
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if(!emailRegex.test(email.value.trim())){

        emailError.innerHTML="Invalid Email";

        email.style.border="2px solid red";

        isValid=false;

    }

    else{

        emailError.innerHTML="";

        email.style.border="2px solid green";

    }

    // -------------------------
    // Phone
    // -------------------------

    if(countryCode.value==="+91"){

        const mobileRegex=/^[6-9][0-9]{9}$/;

        if(!mobileRegex.test(phone.value.trim())){

            phoneError.innerHTML=
            "Invalid Mobile Number";

            phone.style.border="2px solid red";

            isValid=false;

        }

        else{

            phoneError.innerHTML="";

            phone.style.border="2px solid green";

        }

    }

  
    // -------------------------
    // Password
    // -------------------------

    if(password.value.length<8){

        strengthText.innerHTML=
        "Password must contain minimum 8 characters";

        strengthText.style.color="red";

        isValid=false;

    }

    // -------------------------
    // Confirm Password
    // -------------------------

    if(password.value!==confirmPassword.value){

        matchMessage.innerHTML=
        "Password Not Matched";

        matchMessage.style.color="red";

        isValid=false;

    }

    else{

        matchMessage.innerHTML=
        "✅ Password Matched";

        matchMessage.style.color="green";

    }

    // -------------------------
    // Empty Fields
    // -------------------------

//     const requiredFields=
//     document.querySelectorAll("[required]");

//     requiredFields.forEach(field=>{

//         if(field.value.trim()===""){

//             field.style.border="2px solid red";

//             isValid=false;

//         }

//     });

//     // -------------------------
//     // Stop Form
//     // -------------------------

    if (!isValid) {

    e.preventDefault();

    registerBtn.disabled = false;

    registerBtn.innerHTML = "Register";

    alert("❌ Please fill all details correctly.");

    return;

}

    registerBtn.innerHTML=
    '<span class="spinner-border spinner-border-sm"></span> Registering...';

    registerBtn.disabled=true;

});

}

// ==========================================
// Password Strength
// ==========================================

if(password){

password.addEventListener("input",()=>{

    let strength=0;

    const value=password.value;

    if(value.length>=8) strength++;

    if(/[A-Z]/.test(value)) strength++;

    if(/[a-z]/.test(value)) strength++;

    if(/[0-9]/.test(value)) strength++;

    if(/[^A-Za-z0-9]/.test(value)) strength++;

    if(strength<=2){

        strengthBar.style.width="33%";
        strengthBar.className="progress-bar bg-danger";
        strengthText.innerHTML="Weak Password";
        strengthText.style.color="red";

    }

    else if(strength<=4){

        strengthBar.style.width="66%";
        strengthBar.className="progress-bar bg-warning";
        strengthText.innerHTML="Medium Password";
        strengthText.style.color="orange";

    }

    else{

        strengthBar.style.width="100%";
        strengthBar.className="progress-bar bg-success";
        strengthText.innerHTML="Strong Password";
        strengthText.style.color="green";

    }

});

}

// ==========================================
// Confirm Password Match
// ==========================================

if(confirmPassword){

confirmPassword.addEventListener("keyup",()=>{

    if(confirmPassword.value===""){

        matchMessage.innerHTML="";
        return;

    }

    if(password.value===confirmPassword.value){

        matchMessage.innerHTML="✅ Password Matched";
        matchMessage.style.color="green";

    }

    else{

        matchMessage.innerHTML="❌ Password Not Matched";
        matchMessage.style.color="red";

    }

});

}

// ==========================================
// Show Hide Password
// ==========================================

if(togglePassword && password){

togglePassword.addEventListener("click",()=>{

    const icon=togglePassword.querySelector("i");

    if(password.type==="password"){

        password.type="text";

        icon.classList.remove("bi-eye-fill");
        icon.classList.add("bi-eye-slash-fill");

    }

    else{

        password.type="password";

        icon.classList.remove("bi-eye-slash-fill");
        icon.classList.add("bi-eye-fill");

    }

});

}

// ==========================================
// Show Hide Confirm Password
// ==========================================

if(toggleConfirm && confirmPassword){

toggleConfirm.addEventListener("click",()=>{

    const icon=toggleConfirm.querySelector("i");

    if(confirmPassword.type==="password"){

        confirmPassword.type="text";

        icon.classList.remove("bi-eye-fill");
        icon.classList.add("bi-eye-slash-fill");

    }

    else{

        confirmPassword.type="password";

        icon.classList.remove("bi-eye-slash-fill");
        icon.classList.add("bi-eye-fill");

    }

});

}

// ==========================================
// Login Password Toggle
// ==========================================

const loginPassword=document.getElementById("loginPassword");

const loginToggle=document.getElementById("loginTogglePassword");

if(loginPassword && loginToggle){

loginToggle.addEventListener("click",()=>{

    const icon=loginToggle.querySelector("i");

    if(loginPassword.type==="password"){

        loginPassword.type="text";

        icon.classList.remove("bi-eye-fill");
        icon.classList.add("bi-eye-slash-fill");

    }

    else{

        loginPassword.type="password";

        icon.classList.remove("bi-eye-slash-fill");
        icon.classList.add("bi-eye-fill");

    }

});

}

// ==========================================
// Dark Mode
// ==========================================

if(themeToggle){

    if(localStorage.getItem("theme")==="dark"){

        document.body.classList.add("dark-mode");

        themeToggle.innerHTML=
        '<i class="bi bi-sun-fill"></i> Light Mode';

    }

    themeToggle.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){

            localStorage.setItem("theme","dark");

            themeToggle.innerHTML=
            '<i class="bi bi-sun-fill"></i> Light Mode';

        }

        else{

            localStorage.setItem("theme","light");

            themeToggle.innerHTML=
            '<i class="bi bi-moon-fill"></i> Dark Mode';

        }

    });

}

// ==========================================
// Profile Image Preview
// ==========================================

if(profileImage && profilePreview){

profileImage.addEventListener("change",function(){

    const file=this.files[0];

    if(file){

        const reader=new FileReader();

        reader.onload=function(e){

            profilePreview.src=e.target.result;

        }

        reader.readAsDataURL(file);

    }

});

}

// ==========================================
// Typing Animation
// ==========================================

if(typingText){

const texts=[

"Cognifyz Internship Program",

"Java Full Stack Development",

"Learn • Build • Grow",

"Become Industry Ready",

"Developed By Krishna Gupta"

];

let textIndex=0;
let charIndex=0;
let deleting=false;

function typingEffect(){

    const current=texts[textIndex];

    if(!deleting){

        typingText.innerHTML=current.substring(0,charIndex);

        charIndex++;

        if(charIndex>current.length){

            deleting=true;

            setTimeout(typingEffect,1500);

            return;

        }

    }

    else{

        typingText.innerHTML=current.substring(0,charIndex);

        charIndex--;

        if(charIndex<0){

            deleting=false;

            textIndex++;

            if(textIndex>=texts.length){

                textIndex=0;

            }

        }

    }

    setTimeout(typingEffect,deleting?40:80);

}

typingEffect();

}

// ==========================================
// Button Ripple Effect
// ==========================================

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",function(e){

    const ripple=document.createElement("span");

    ripple.className="ripple";

    const rect=this.getBoundingClientRect();

    ripple.style.left=e.clientX-rect.left+"px";

    ripple.style.top=e.clientY-rect.top+"px";

    this.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },600);

});

});

// ==========================================
// Auto Focus Next Input
// ==========================================

document.querySelectorAll("input").forEach(input=>{

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        const formElements=[...form.elements];

        const index=formElements.indexOf(this);

        if(formElements[index+1]){

            formElements[index+1].focus();

        }

    }

});

});

// ==========================================
// Page Loader
// ==========================================

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}

});

// ==========================================
// Console Message
// ==========================================

// ==========================================
// PIN Code Auto Fetch
// ==========================================

if (pincode) {

    pincode.addEventListener("keyup", async () => {

        if (pincode.value.length !== 6) return;

        try {

            const response = await fetch(
                `https://api.postalpincode.in/pincode/${pincode.value}`
            );

            const data = await response.json();

            console.log(data);

            if (
                data[0].Status === "Success" &&
                data[0].PostOffice &&
                Array.isArray(data[0].PostOffice)
            ) {

                const office = data[0].PostOffice[0];

                if (country)
                    country.value = "India";

                if (state)
                    state.value = office.State;

                if (district) {
                    district.innerHTML = `
                        <option value="${office.District}">
                            ${office.District}
                        </option>`;
                }

                if (postoffice) {

                    postoffice.innerHTML = "";

                    data[0].PostOffice.forEach(place => {

                        postoffice.innerHTML += `
                            <option value="${place.Name}">
                                ${place.Name}
                            </option>`;

                    });

                }

            } else {

                alert("Invalid PIN Code");

            }

        } catch (err) {

            console.log(err);

        }

    });

}

console.log("✅ Part 6 Loaded Successfully");
console.log("✅ Script Loaded Successfully");
});