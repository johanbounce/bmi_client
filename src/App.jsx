import React, { Component } from 'react';
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from './components/InputFields';
import LoginForm from "./components/LoginForm";
import { authenticate } from './modules/auth';

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    autenticated: false,
    message: ""
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await Authenticate(
      e.target.email.value
    );
    if (response.autenticated) {
      this.setState({ autenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderLogin, autenticated, message } = this.state;
    let renderLogin;
    switch(true) {
      case renderLoginForm && !autenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />
        break;
        case !renderLoginForm && !autenticated:
          renderLogin = (
          <>
        <button
          id="login"
          onClick={() => this.setState({ renderLoginForm: true })}
      >
        Login
      </button>
          <p>{message}</p>
          </>
    );
    break;
    case authenticated:
      renderLogin = (
        <p>Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
      );
      break;
    }

    return (
      <>      
        <InputFields onChangeHandler={this.onChangeHandler} />
        {renderLogin}
        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
        />  
      </>
    );
    
  }
}

export default App;
