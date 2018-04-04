// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase'

@Injectable()
export class AuthProvider {
  constructor(private googlePlus: GooglePlus) {
    console.log('Hello AuthProvider Provider');
  }

  loginWithEmail(email: string, password: string): Promise<any>{
      //sign in with firebase using the email and password provided by our input fields
      return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  signupWithEmail(email: string, password: string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      console.log('succesfully created new user')
      // firebase
      // .database()
      // .ref('/userProfile')
      // .child(newUser.uid)
      // .set({ email: email });
    });
  }

  signUpWithFacebook(){

  }

  loginWithGoogle(): Promise<any>{
     return this.googlePlus.login({
      'webClientId': '325159181067-9dict7lmn07bniiv6nupl9c18uvqvf1l.apps.googleusercontent.com',
      'offline': false
    })
  }
  loginToFirebaseWithToken(token): Promise<void>{
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(token)
      return firebase.auth().signInWithCredential(googleCredential)
  }
}