import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, Alert, View, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import Spinner from './Spinner';
import Card from './Card';
import CardItem from './CardItem';
import Input from './Input';
import NewButton from './NewButton';
import Header from './Header';
import NewInput from './NewInput';
//import TestAlert from './TestAlert';

class NewLoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onNewAccount.bind(this));
  }

  onNewAccount() {
    const { email, password } = this.state;

    Alert.alert(
    'No account found for email',
    'Would you like to create an account with this information?',
    [
      { text: 'Yes',
      onPress: () => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this));
} },
      { text: 'No', onPress: (this.onLoginFail.bind(this)) },
    ],
    { cancelable: false }
  );
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed.',
      loading: false,
    });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner spinnerSize="small" />;
    }

    return (
      <NewButton
        whenClicked={this.onButtonPress.bind(this)}
        value={this.state.email}
      >
        LOGIN
      </NewButton>
    );
  }
  render() {
    return (

      <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.logoContainerStyle}>
          <Image
            style={styles.logo}
            source={require('./Pictures/AppIcon.png')}
          />
          <Text style={styles.titleStyle}>Keep track of all your books in one place</Text>
        </View>

        <NewInput
          placeHolder="email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          returnKeyType="next"
          keyboardType="email-address"
          //onSubmitEditing={() => this.passwordInput.focus()}
        />

        <NewInput
          placeHolder="password"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          returnKeyType="go"
          //ref={(input) => this.passwordInput = input}
        />

        {this.renderButton()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#3498DB'
  },
  logo: {
    width: 125,
    height: 125
  },
  logoContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    color: '#FFF',
    marginTop: 10,
    width: 180,
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 18
  }
};

export default NewLoginForm;
