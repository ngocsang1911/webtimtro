const wrapper = document.querySelector(".wrapper");
const registerlink = document.querySelector(".register-link");

registerlink.addEventListener("click", () => {
  wrapper.classList.add("active");
});

// loginlink.addEventListener("click", () => {
//   wrapper.classList.remove("active");
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCv3cTFTTtz-15TzWSCFXQcc1qlQnLwrtw",
//   authDomain: "web-tim-tro-1600k.firebaseapp.com",
//   projectId: "web-tim-tro-1600k",
//   storageBucket: "web-tim-tro-1600k.appspot.com",
//   messagingSenderId: "945779806923",
//   appId: "1:945779806923:web:4a9adb5fccb0a1cf53414e",
//   measurementId: "G-K0B0ZY53PL",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBk_EKsQwaN9jAgoDeRGEDSzzOewD0T__g",
  authDomain: "capstone-810c4.firebaseapp.com",
  databaseURL:
    "https://capstone-810c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-810c4",
  storageBucket: "capstone-810c4.appspot.com",
  messagingSenderId: "1050127576221",
  appId: "1:1050127576221:web:14144c0b90b03cc4277874",
  measurementId: "G-ZFPZ49LKZJ",
};

const email = localStorage.getItem("email");
if (email) {
  // Người dùng đã đăng nhập, thực hiện hành động phù hợp (ví dụ: chuyển hướng đến trang đã đăng nhập)
  console.log("Đã đăng nhập với tên người dùng: " + email);
  window.location.href = "trangchu.html";
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// document.addEventListener("click", function () {
const registerButton = document.querySelector("#btndangnhap");
// checkLoginStatus();
registerButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const errorMessage = document.querySelector("#error-message");
  const email = document.querySelector("input[type='email']").value;
  const password = document.querySelector("input[type='password']").value;
  try {
    // Sử dụng Firebase Authentication API sau khi đã khởi tạo Firebase SDK
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Đăng ký thành công");
    localStorage.setItem("email", email);
    window.location.href = "trangchu.html";
  } catch (error) {
    errorMessage.style.opacity = "100";
    console.error("Lỗi đăng ký:", error);
    // Hiển thị thông báo lỗi
  }
});
// });
