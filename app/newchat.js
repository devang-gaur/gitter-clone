var myRef= new Firebase('https://resplendent-fire-3752.firebaseio.com/');
var username=null;
//var user=$('#username');
var text=$('#message');
var send_button=$('#post');

send_button.click(function(){
  //myRef.set(user.val()+" says "+text.val());

  //var username=user.val();
  //var message=message.val();
  myRef.push({
    username : username,
    message : text.val()
  });
  //myRef.push(user.val()+" says "+text.val());
    text.val('');

    myRef.onAuth(function(authData){
    if(authData)
    {
      // 'child_added' event is called whenever a new child is added in Firebase
      // snapshot is the newly added data
      myRef.on('child_added', function(snapshot) {
      msg = snapshot.val();
      var new_message = $('<div/>');
      new_message.append('<p><strong>' + msg.username + '</strong></p><p>' + msg.message + '</p>');
      //add a class for styling purposes
      new_message.addClass('msg');

      // to differentiate between your messages and someone else's messages, we'll add a class 'me'
      // to your messages and style them accordingly
      new_message.addClass(msg.username == username ? ' me' : '')   // this is an inline version of if-else

      $("#results").append(new_message);
      $("#results").animate({scrollTop:$('#results')[0].scrollHeight});
      });
    }
   });

   myRef.onAuth(function(){console.log("Hello");});
});


var google_login_button=$('#google_login');

google_login_button.click(function() {
  // A login popup will be displayed when the google login button is clicked
  myRef.authWithOAuthPopup('google', function(error, authData) {
    if(error){
      console.log('login failed');
    }else{
      console.log("authentication successful");
      //console.log(authData.google.displayName);

      username =  authData.google.displayName;
      //add the username to the post button
      send_button.html("Post as " + username);

      // enable the post message button
      //send_button.attr('disabled', 'false');
      // disable the google login button
      google_login_button.attr('disabled', 'true');
    }
  }, {remember: "none"}  // this will end authentication when the page is closed
  );
});
