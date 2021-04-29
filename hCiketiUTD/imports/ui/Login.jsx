import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const Login = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
    Accounts.onLoginFailure(function(attempt){
      if (attempt.error) {
        var reason = attempt.error.reason;
        alert(reason)
      }
    });
  };

  return (
      <div>
        <div  className="login-main-container">
          <div  className="form">
            <form onSubmit={submit} className="login-form-container">
              <h1 className="login-form-header">Log in to start your session</h1>
              <input type="text" placeholder="E-mail address" name="username" required
                     onChange={e => setUsername(e.target.value)}
              />
              <br />
              <input type="password" placeholder="Password" name="password"
                     required
                     onChange={e => setPassword(e.target.value)} />
              <br />
              {/* <label class="container">Remember Me <input type="checkbox" />
              <span class="checkmark"></span>
            </label> */}

              <button type="submit">Log in</button>
              <p className="login-form-forgot"><a href="#">Forgot my password </a></p>
              <p className="login-form-verify"><a href="#">Verify Account </a></p>
            </form>
          </div>
        </div>
      </div>
  );
};