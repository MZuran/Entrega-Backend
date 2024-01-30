async function onClickTest() {
    await fetch('api/sessions/logout', {
        method: 'POST', // or 'GET' depending on your server setup
        credentials: 'include', // include cookies in the request
      })
        .then(response => {
          if (response.ok) {
            // Session on the server side has been destroyed, you can handle success here
            console.log('Session destroyed successfully');
            window.location.href = "/users/login"
          } else {
            // Handle errors here
            console.error('Failed to destroy session');
          }
        })
        .catch(error => {
          console.error('Error during session destruction:', error);
        });
}