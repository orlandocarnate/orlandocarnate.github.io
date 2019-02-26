$(document).ready(function () {
    const three = "J5Bzn7h3Fbw";
    const two = "FuutFZZiKrVU";
    const one = "AIzaSyCekSqPXYbX";

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    // get contact form info and send to firebase.

    // MODEL jQuery event listener
    $("#contact").click(function () {
        $("#contactModal").modal();
        $(".form-group").show();
        $("#contact-submit").show();
        $("#sent-msg").hide();
        $("#sender-name").val("");
        $("#sender-email").val("");
        $("#sender-message").val("");
    });

    // FIREBASE
    // Initialize Firebase
    var config = {
        apiKey: one + two + three,
        authDomain: "portfolio-a39f6.firebaseapp.com",
        databaseURL: "https://portfolio-a39f6.firebaseio.com",
        projectId: "portfolio-a39f6",
        storageBucket: "portfolio-a39f6.appspot.com",
        messagingSenderId: "307089580586"
    };
    firebase.initializeApp(config);

    

    const saveMsg = (name, email, msg) => {
        // const timeStamp = Math.floor(Date.now());
        const currentTime = moment().unix();
        const convertedTime = moment(currentTime, "X").format("YYYY/MM/DD hh:mm a");
        let database = firebase.database();
        database.ref("messages/").push({
            name: name,
            email: email,
            message: msg,
            date: convertedTime
        });
    }

    // get values when contact form has been submitted.
    $("#contact-submit").on("click", function (event) {
        event.preventDefault();
        const name = $("#sender-name").val();
        const email = $("#sender-email").val();
        const msg = $("#sender-message").val();
        if (name !== "" && email.match(mailformat) && msg !=="") {
            $(".form-group").hide();
            $("#contact-submit").hide();
            $("#sent-msg").show();
            // console.log(name, email, msg);
            saveMsg(name, email, msg);
        }
    });

});
