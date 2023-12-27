import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const userIDToEdit = urlParams.get("userID");
console.log(userIDToEdit);

if (userIDToEdit) {
  // Nếu có giá trị 'userID', thực hiện lấy thông tin user từ Firestore và điền vào biểu mẫu
  try {
    const userDocRef = doc(db, "Users", userIDToEdit);
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      console.log(docSnapshot.data());

      //   // Lấy tất cả các key của đối tượng userData
      //   const userKeys = Object.keys(userData);
      // Kiểm tra xem có key nào không
      // Điền thông tin user vào các ô input trong biểu mẫu
      document.getElementById("username").value = userData?.username;
      document.getElementById("email").value = userData?.email;

      // Thêm sự kiện cho nút "Lưu" để cập nhật thông tin user
      const saveButton = document.getElementById("btn-edituser");
      saveButton.addEventListener("click", async function (e) {
        e.preventDefault();

        // Lấy thông tin đã chỉnh sửa từ các ô input
        const updateduserData = {
          ...userData,
          email: document.getElementById("email").value,
          username: document.getElementById("username").value,
        };
        // Cập nhật thông tin user trong Firestore

        await updateDoc(userDocRef, { ...updateduserData });
        alert("Thông tin user đã được cập nhật thành công.");
        console.log("Thông tin user đã được cập nhật thành công.");
      });
    } else {
      console.log("Không tìm thấy thông tin user cần sửa.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
  }
} else {
  console.log("Không có giá trị 'userID' trong URL.");
}
