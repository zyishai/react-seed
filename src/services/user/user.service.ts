import { provide } from "../../config/di";
import { authState } from 'rxfire/auth';
import firebase from "firebase";
import { map, share } from "rxjs/operators";
import { FirebaseService } from "../firebase/firebase.service";

@provide({
    behaviour: 'single'
})
export class User {
    private authState$ = authState(firebase.auth());
    private user$ = this.authState$.pipe(
        map((user: firebase.User) => (user ? 
            {
                displayName: user.displayName,
                email: user.email,
                verifiedUser: user.emailVerified,
                photoUrl: user.photoURL,
                phoneNumber: user.phoneNumber,
                uid: user.uid
            } 
            : null)
        )
    );

    constructor(private app: FirebaseService) {}

    public getUser() {
        return this.user$;
    }

    public signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider).then(() => true).catch(() => false);
    }

    public signOut() {
        return firebase.auth().signOut().then(() => true).catch(() => false);
    }
}