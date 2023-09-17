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
//get teacher
var id = getCookie("id");
if (id == "") {
  window.location.replace("login.html");
}
// console.log(id);
var token = getCookie("token");
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/get-single-teacher/${id}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  success: function (response) {
    // console.log(response);
    if (response.teacher.position == 0) {
      response.teacher.position = "No Position";
    } else if (response.teacher.position == 1) {
      response.teacher.position = "1st";
    } else if (response.teacher.position == 2) {
      response.teacher.position = "2nd";
    } else if (response.teacher.position == 3) {
      response.teacher.position = "3rd";
    } else {
      response.teacher.position = response.teacher.position + "th Position";
    }
    document.getElementById("posi").innerHTML = response.teacher.position;
    document.getElementById("nameee").innerHTML = response.teacher.name;
    if (response.teacher.profile_picture != null) {
      document.getElementById("nav_profile").src =
        response.teacher.profile_picture;
    }
    // document.getElementById("nav_profile").innerHTML = response.teacher.name;

    // document.getElementById("loader1").style.visibility = "hidden";
    //current phase

    // document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "get",
      url: `${baseurl}/teacher/check-tournament-status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (response) {
        // console.log(response);
        if (response.msg == "Contest Ended") {
        } else {
          // document.getElementById("posi").innerHTML +=
          //   " Position in " + response.Current_phase;
        }

        document.getElementById("loader1").style.visibility = "hidden";
      },

      error: function (response) {
        console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
      },
    });
  },

  error: function (response) {
    // console.log(response.responseJSON.message);
    if (response.responseJSON.message == "Token is not valid") {
      window.location.replace("./login.html");
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

//votes
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/all-votes/${id}`,
  success: function (response) {
    // console.log();/
    var i = 1;
    response.response.forEach((element) => {
      document.getElementById("voter_list").innerHTML += `                  
        <tr>
        <td>${i}</td>
        <td>${element.voter_name}</td>
        <td class="text-end">${element.voteCount}</td>
      </tr>`;
      i++;
    });
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

//hero votes
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/all-hero-votes/${id}`,
  success: function (response) {
    // console.log(response.response);
    var i = 1;
    response.response.forEach((element) => {
      document.getElementById("hero_voter_id").innerHTML += `                  
        <tr>
        <td>${i}</td>
        <td>${element.voter_name}</td>
        <td class="text-end">${element.voteCount}</td>
      </tr>`;
      i++;
    });
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

//hero votes
document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "post",
  url: `${baseurl}/fetch-latest-chatroom-of-a-user/${id}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  success: function (response) {
    // console.log(response);chatroomID
    document.getElementById("chatroomid").value = response.chatroomID;
    response.messages.forEach((element) => {
      if (element.attachments.length == 1) {
        // console.log(element.attachments[0].file_path);
        var extension = element.attachments[0].file_path;
        extension = extension.split(".").pop();
        // console.log(extension);
        if (extension == "jpg" || extension == "png") {
          document.getElementById("vid_area").innerHTML = `
          <h5 style="color: #337ab7;" class="py-2">Admin</h5>
          <p>
            ${element.message}
          </p>
          <img class="col-12 my-2" src="${element.attachments[0].file_path}" />
          <hr>
          `;
        } else if (extension == "mp4") {
          document.getElementById("vid_area").innerHTML = `
          <h5 style="color: #337ab7;">Admin</h5>
          <p>
            ${element.message}
          </p>
          
          <video class="col-12 my-1" controls>
            <source  src="${element.attachments[0].file_path}" type="video/mp4">
          </video>
          <hr>
          `;
        }
        // document.querySelector('.output').textContent = extension;
      }
    });
    response.messages.forEach((element) => {
      if (element.attachments.length == 0) {
        if (element.sender_name == null) {
          document.getElementById("vid_area").innerHTML += `
          <h5 style="color: #337ab7;">Admin: 
          <span style="font-size: 17px; color: black;">
          ${element.message}
        </span></h5>
          `;
        } else {
          document.getElementById("vid_area").innerHTML += `
          <h5 style="color: #337ab7;">${element.sender_name}: 
          <span style="font-size: 17px; color: black;">
            ${element.message}
          </span>
          </h5>
          `;
        }
      }
    });
    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    if (response.responseJSON.error == "No messages found for the chatroom") {
      // alert("No messages found for the chatroom");
      document.getElementById("chat_area").classList.add("d-none");
    }
    if (response.responseJSON.message == "No token, authorization denied") {
      window.location.replace("./login.html");
    }
    document.getElementById("loader1").style.visibility = "hidden";
  },
});

function sendmessage(message) {
  var chatroomID = document.getElementById("chatroomid").value;
  var message = document.getElementById("exampleFormControlInput1").value;

  // Get the sender_id from the token stored in localStorage
  // const token = localStorage.getItem("token");
  // const tokenPayload = token.split(".")[1];
  // const decodedPayload = JSON.parse(atob(tokenPayload));
  // const sender_id = decodedPayload.id;
  // console.log(sender_id);

  // Code to send the data to your backend API to send a new message
  $.ajax({
    url: `${baseurl}/send-message1`,
    type: "POST",
    data: {
      sender_id: id,
      chatroomID: chatroomID,
      message: message,
    },
    dataType: "json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      document.getElementById("vid_area").innerHTML += `
            <h5 style="color: #337ab7;">You: 
            <span style="font-size: 17px; color: black;">
              ${message}
            </span>
            </h5>
            `;
      document.getElementById("exampleFormControlInput1").value = "";
      // Handle the success response
      //   console.log("Message sent successfully:", response.message);
      // Fetch chat room messages again to update the chat box with the new message
      // fetchChatRoomMessages(chatroomID);
      // console.log(response);
    },
    error: function (error) {
      // Handle the error response
      console.log("Failed to send message:", error);
    },
  });
}

document.getElementById("loader1").style.visibility = "visible";
$.ajax({
  type: "get",
  url: `${baseurl}/teacher/check-tournament-status`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  success: function (response) {
    // console.log(response);
    if (response.msg == "Contest Ended") {
    } else {
      $.ajax({
        type: "get",
        url: `${baseurl}/update-positions`,
        success: function (response) {
          // console.log(response);
          document.getElementById("loader1").style.visibility = "hidden";
        },

        error: function (response) {
          console.log(response);
          document.getElementById("loader1").style.visibility = "hidden";
        },
      });
    }

    document.getElementById("loader1").style.visibility = "hidden";
  },

  error: function (response) {
    console.log(response);
    document.getElementById("loader1").style.visibility = "hidden";
  },
});
