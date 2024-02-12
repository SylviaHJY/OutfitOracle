import {
  getAuth,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  updatePassword,
} from "firebase/auth";

async function doSocialSignIn(provider, auth) {
  let providerInstance;
  if (provider === "google") {
    providerInstance = new GoogleAuthProvider();
  } else {
    throw new Error(`Unsupported provider: ${provider}`);
  }
  const result = await signInWithPopup(auth, providerInstance);
  return result.user;
}


async function doPasswordReset(email) {
  let auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}

async function doPasswordUpdate(password) {
  await updatePassword(password);
}

async function doSignOut() {
  let auth = getAuth();
  await signOut(auth);
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = EmailAuthProvider.credential(email, oldPassword);
  await reauthenticateWithCredential(credential);
  await updatePassword(newPassword);
  await doSignOut();
}

export {
  doSocialSignIn,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
};