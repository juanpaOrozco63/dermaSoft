import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(public afAuth: AngularFireAuth) { }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }
  async sendVerificationEmail() {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  async loginFirebase(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    return result;
  }

  async registerFirebase(email: string, password: string) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.sendVerificationEmail();
    return result;
  }

  async logoutFirebase() {
    await this.afAuth.signOut();
  }
  async delete() {
    let user = this.afAuth.currentUser;
    (await user).delete();
  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
