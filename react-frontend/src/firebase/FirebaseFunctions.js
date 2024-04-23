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
  sendEmailVerification,
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
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email was sent.");
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      alert("No user found with this email. Please register first.");
    } else {
      console.error("Password reset error:", error);
      alert("An error occurred. Please try again later.");
    }
  }
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

async function doFeedback(feedback) {
  // try {
  //   const auth = getAuth();
  //   const email = "wardrobewizardfeedback@gmail.com";
  //   const password = "pass1";
  //   const emailBody = `Feedback message: ${feedback}`;
  //   const credential = EmailAuthProvider.credential(email, password);
  //   await reauthenticateWithCredential(auth, credential);
  //   const feedbackEmail = {
  //     from: email,
  //     to: "recipient@example.com", // change to group email
  //     subject: "User Feedback",
  //     text: emailBody,
  //   };
  //   // console.log("Feedback Email:", feedbackEmail);
  // } catch (error) {
  //   console.error("Feedback error:", error);
  //   alert("An error occurred while sending feedback. Please try again later.");
  // }
}

export {
  doSocialSignIn,
  doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword,
  doFeedback,
};
