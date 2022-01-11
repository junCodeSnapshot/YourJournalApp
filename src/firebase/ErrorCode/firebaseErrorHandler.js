export const firebaseErrorHandler = (err) => {
    switch (err) {
        case 'auth/user-not-found':
            return "User not Found!"
        case 'auth/wrong-password':
            return "Incorrect email or password!"
        case 'auth/email-already-in-use':
            return "The email is already in use!"
        default:
            return "Ok";
    }
}