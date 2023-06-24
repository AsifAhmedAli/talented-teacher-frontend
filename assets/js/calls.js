var request;
//     // Abort any pending request
if (request) {
  request.abort();
}

$("#reg_form").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Get form data
  var name = $("#fullname").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var address = $("#address").val();
  // console.log(address);
  //   name, company, email, password;
  // Make Ajax request to signup API
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "POST",
    url: `${baseurl}/teacher-registration`,
    data: {
      name: name,
      phone: phone,
      email: email,
      password: password,
      address: address,
    },
    success: function (response) {
      // console.log(response)
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Please check your email for Verification",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.replace("./login.html");
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      //   console.log(response.responseJSON.error);
      if (response.responseJSON.error == "Email already registered") {
        Swal.fire({
          title: "Error!",
          text: "Email Already Registered",
          icon: "error",
        });
      }
      //   if (response.status == 500) {
      //     Swal.fire({
      //       title: "Sign Up Failed!",
      //       text: response.responseJSON.message,
      //       icon: "error",
      //     });
      //   }
    },
  });
});

$("#loginform").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;

  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "POST",
    url: `${baseurl}/teacher-login`,
    data: {
      email: email,
      password: pass,
    },
    success: function (response) {
      console.log(response);
      document.cookie = `token=${response.token}`;
      // document.cookie = `user=${response.user}`;
      document.cookie = `id=${response.user}`;
      document.getElementById("loader1").style.visibility = "hidden";
      // alert("asdf");
      location.replace("./dashboard.html");
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      // console.log(response);
      if (
        response.responseJSON.error == "Please verify your email before login"
      ) {
        Swal.fire({
          title: "Error!",
          text: response.responseJSON.error,
          icon: "error",
        });
      } else if (response.responseJSON.error == "Incorrect password") {
        Swal.fire({
          title: "Error!",
          text: response.responseJSON.error,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An Unexpected Error Occured",
          icon: "error",
        });
      }
    },
  });
});

function logoutcall() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.replace("./login.html");
}
