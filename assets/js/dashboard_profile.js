// Get form data
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//   name, company, email, password;
// Make Ajax request to signup API
// //get teacher
var id = getCookie("id");
var token = getCookie("token");
// console.log(token);
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/get-single-teacher/${id}`,
  success: function (response) {
    // console.log(response.teacher.questions[0]);
    // profile_picture;
    document.getElementById("profile_pica").src =
      response.teacher.profile_picture;
    // document.getElementById("nav_profile").src =
    //   response.teacher.profile_picture;
    $("#question1").val(response.teacher.questions[0].question1);
    $("#question2").val(response.teacher.questions[0].question2);
    $("#question3").val(response.teacher.questions[0].question3);
    $("#question4").val(response.teacher.questions[0].question4);
    document.getElementById("fullname").value = response.teacher.name;
    document.getElementById("email").value = response.teacher.email;
    document.getElementById("phone").value = response.teacher.phone;
    document.getElementById("address").value = response.teacher.address;

    document.getElementById("nameee").innerHTML = response.teacher.name;
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

$("#update_profile").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Get form data
  var name = $("#fullname").val();
  var phone = $("#phone").val();
  var address = $("#address").val();
  // console.log(address);
  //   name, company, email, password;
  // Make Ajax request to signup API

  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "put",
    url: `${baseurl}/teacher/edit-teacher/${id}`,
    data: {
      name: name,
      phone: phone,
      address: address,
      id: id,
    },
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (response) {
      // console.log(response)
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Profile Updated Successfully",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.reload();
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      //   console.log(response.responseJSON.error);
      // if (response.status == 500) {
      Swal.fire({
        title: "Failed!",
        text: response.responseJSON.error,
        icon: "error",
      });
    },
  });
});

function profile_pic() {
  document.getElementById("loader1").style.visibility = "visible";
  var elem = document.getElementById("change_dp");

  // console.log(elem.files.length);
  var form = new FormData();
  form.append("profile_picture", elem.files[0], elem.files[0].name);
  form.append("id", id);
  // fileName.forEach((key) => {
  //   form.append("photos", key, key.name);
  // });

  var settings = {};

  $.ajax({
    url: `${baseurl}/teacher/change_profile-picture/${id}`,
    method: "put",
    timeout: 0,
    processData: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
    success: function (response) {
      // console.log(response);
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Photo uploaded successfully!",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.reload();
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      var res_error = JSON.parse(response.responseText);
      // if (response.responseJSON.error == "Email already registered") {
      Swal.fire({
        title: "Error!",
        text: res_error.error,
        icon: "error",
      });
      // }
    },
  });
}

function savequestions() {
  // Get form data
  var question1 = $("#question1").val();
  var question2 = $("#question2").val();
  var question3 = $("#question3").val();
  var question4 = $("#question4").val();
  // console.log(address);
  //   name, company, email, password;
  // Make Ajax request to signup API

  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "post",
    url: `${baseurl}/teacher/update-questions`,
    data: {
      question1: question1,
      question2: question2,
      question3: question3,
      question4: question4,
      id: id,
    },
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (response) {
      // console.log(response)
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Questions Updated Successfully",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.reload();
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      //   console.log(response.responseJSON.error);
      // if (response.status == 500) {
      Swal.fire({
        title: "Failed!",
        text: response.responseJSON.error,
        icon: "error",
      });
    },
  });
}
// function uploadphotos() {
//   document.getElementById("loader1").style.visibility = "visible";
//   var elem = document.getElementById("upload_photos");

//   // console.log(elem.files.length);
//   var form = new FormData();
//   for (i = 0; i < elem.files.length; i++) {
//     form.append("photos", elem.files[i], elem.files[i].name);
//     // console.log("a");
//   }
//   form.append("id", id);
//   // fileName.forEach((key) => {
//   //   form.append("photos", key, key.name);
//   // });

//   var settings = {};

//   $.ajax({
//     url: `${baseurl}/teacher/upload-photos`,
//     method: "POST",
//     timeout: 0,
//     processData: false,
//     mimeType: "multipart/form-data",
//     contentType: false,
//     data: form,
//     success: function (response) {
//       // console.log(response);
//       document.getElementById("loader1").style.visibility = "hidden";
//       Swal.fire({
//         icon: "success",
//         title: "Successful!",
//         text: "Photos uploaded successfully!",
//         // allowOutsideClick: false,
//       });
//       $("button.swal2-confirm").click(function () {
//         location.reload();
//       });
//     },

//     error: function (response) {
//       document.getElementById("loader1").style.visibility = "hidden";
//       var res_error = JSON.parse(response.responseText);
//       // if (response.responseJSON.error == "Email already registered") {
//       Swal.fire({
//         title: "Error!",
//         text: res_error.error,
//         icon: "error",
//       });
//       // }
//     },
//   });
// }

// function deletephotos(x, id) {
//   document.getElementById("loader1").style.visibility = "visible";
//   $.ajax({
//     type: "delete",
//     url: `${baseurl}/teacher/delete-photo/${x}`,
//     data: {
//       id: id,
//     },
//     success: function (response) {
//       // console.log(response);
//       Swal.fire({
//         icon: "success",
//         title: "Successful!",
//         text: response.message,
//         // allowOutsideClick: false,
//       });
//       $("button.swal2-confirm").click(function () {
//         location.reload();
//       });
//       // var i = 1;
//       document.getElementById("loader1").style.visibility = "hidden";
//     },

//     error: function (response) {
//       // console.log(response);
//       Swal.fire({
//         title: "Error!",
//         text: response.responseJSON.error,
//         icon: "error",
//       });
//       document.getElementById("loader1").style.visibility = "hidden";
//     },
//   });
// }
