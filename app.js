    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const phone = document.getElementById("phone");
    const birthdate = document.getElementById("birthdate");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const fieldConditions = {
      firstname: ["fname_capital", "fname_onlyLetters", "fname_noSpaces", "fname_minLength"],
      lastname: ["capital", "onlyLetters", "noSpaces", "minLength"],
      phone: ["start", "elevenDigits", "noSpacePhone"],
      birthdate: ["dateFormat"],
      email: ["emailValidFormat", "email_noSpace"],
      password: ["min8", "noSpacePass"],
      confirmPassword: ["matchPass"]
    };

firstname.addEventListener("input", () => {
  let v = firstname.value;
  // تحويل أول حرف Capital والباقي Small
  if (v.length > 0) {
    v = v[0].toUpperCase() + v.slice(1).toLowerCase();
    firstname.value = v;
  }

  toggleList("firstnameErrors", v);
  toggle("fname_capital", /^[A-Z]/.test(v));
  toggle("fname_onlyLetters", /^[A-Za-z]+$/.test(v));
  toggle("fname_noSpaces", !/\s/.test(v));
  toggle("fname_minLength", v.length > 2);
  checkAllConditions("firstname");
});

lastname.addEventListener("input", () => {
  let v = lastname.value;
  // تحويل أول حرف Capital والباقي Small
  if (v.length > 0) {
    v = v[0].toUpperCase() + v.slice(1).toLowerCase();
    lastname.value = v;
  }

  toggleList("lastnameErrors", v);
  toggle("capital", /^[A-Z]/.test(v));
  toggle("onlyLetters", /^[A-Za-z]+$/.test(v));
  toggle("noSpaces", !/\s/.test(v));
  toggle("minLength", v.length > 2);
  checkAllConditions("lastname");
});
    phone.addEventListener("input", () => {
      const v = phone.value;
      toggleList("phoneErrors", v);
      toggle("start", /^01[0125]/.test(v));
      toggle("elevenDigits", /^\d{11}$/.test(v));
      toggle("noSpacePhone", !/\s/.test(v));
      checkAllConditions("phone");
    });

    birthdate.addEventListener("input", () => {
      const v = birthdate.value;
      toggleList("birthdateErrors", v);
      toggle("dateFormat", /^\d{4}\/\d{2}\/\d{2}$/.test(v));
      checkAllConditions("birthdate");
    });

    email.addEventListener("input", () => {
      const v = email.value;
      toggleList("emailErrors", v);
      toggle("emailValidFormat", /^[a-z0-9._%+-]+@gmail\.com$/.test(v));
      toggle("email_noSpace", !/\s/.test(v));
      checkAllConditions("email");
    });

    password.addEventListener("input", () => {
      const v = password.value;
      toggleList("passwordErrors", v);
      toggle("min8", /^[A-Za-z0-9]{8,}$/.test(v));
      toggle("noSpacePass", !/\s/.test(v));
      checkAllConditions("password");
      checkMatch();
    });

    confirmPassword.addEventListener("input", () => {
      toggleList("confirmPasswordErrors", confirmPassword.value);
      checkMatch();
      checkAllConditions("confirmPassword");
    });

    function checkMatch() {
      toggle("matchPass", confirmPassword.value === password.value && confirmPassword.value !== "");
    }


    function toggle(id, condition) {
      const el = document.getElementById(id);
      el.style.display = condition ? "none" : "list-item";
    }

    function toggleList(listId, value) {
      document.getElementById(listId).style.display = value.length > 0 ? "block" : "none";
    }


    function checkAllConditions(field) {
      const allValid = fieldConditions[field].every(id =>
        document.getElementById(id).style.display === "none"
      );

      const list = document.getElementById(field + "Errors");

      if (allValid && list.style.display !== "none") {
        list.style.display = "none";
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `${field} is valid ✅`,
          showConfirmButton: false,
          timer: 1200
        });
      }

      if (!allValid && list.style.display === "none") {
        list.style.display = "block";
      }
    }

    document.getElementById("myForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const unverified = document.querySelectorAll("ul li:not([style*='display: none'])");
      if (unverified.length === 0) {
        Swal.fire("Done✅", "Every thing is good", "success");
        firstname.value = "";
        lastname.value = "";
        phone.value = "";
        birthdate.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
      } else {
        Swal.fire("Alert❌ ", "Something is wrong", "error");
      }
    });