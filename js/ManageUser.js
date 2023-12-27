import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import {
  deleteDoc,
  doc,
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

const usersCollectionRef = collection(db, "Users");

const querySnapshot = await getDocs(usersCollectionRef);

const userDataArray = querySnapshot.docs.map((doc) => {
  // Lấy dữ liệu từ document
  const userData = doc.data();
  userData.userID = doc.id;

  return userData;
});

function updateRoomList(users) {
  console.log(users);
  const roomList = document.getElementById("roomList");
  roomList.innerHTML = ""; // Xóa nội dung cũ

  users.forEach((userData) => {
    // const userKeys = Object.keys(userData);
    console.log(userData);
    // console.log(userData[userKeys[0]]);
    const userCard = document.createElement("tr");
    userCard.innerHTML = `
        <td>
        ${userData?.userID}
        </td>
        <td>
        ${userData?.username}
        </td>
        <td>${userData?.email}</td>
        <td>
        <button class="btn btn-primary editusers" data-loaiphong="${userData.userID}" data-userID="${userData.userID}">Sửa User</button>
        <button class="btn btn-danger deleteUser" data-loaiphong="${userData.userID}" data-userID="${userData.userID}">Xóa User</button>
        </td>
    `;
    const editButton = userCard.querySelector(".editusers");
    editButton.addEventListener("click", () => {
      console.log(userData?.userID);
      // Chuyển hướng sang trang sửa user với userID
      window.location.href = `EditUserAdmin.html?userID=${userData?.userID}`;
    });
    const deleteButton = userCard.querySelector(".deleteUser");
    deleteButton.addEventListener("click", async () => {
      // Hiển thị thông báo xác nhận
      const isConfirmed = confirm("Bạn có chắc chắn muốn xóa user này?");

      if (isConfirmed) {
        try {
          const userIDToDelete = userData?.userID;
          const userDocRef = doc(db, "Users", userIDToDelete);

          // Xóa tài liệu từ Firestore
          await deleteDoc(userDocRef);
          console.log("Đã xóa user:", userIDToDelete);
          alert("Xóa user thành công");
          window.location.reload();
          // Hoặc thực hiện các bước khác sau khi xóa
        } catch (error) {
          console.error("Lỗi khi xóa user:", error);
        }
      }
    });
    roomList.appendChild(userCard);
  });
}
updateRoomList(userDataArray);
if (userDataArray.length === 0) {
  roomList.innerHTML = "<p>Không có user nào.</p>";
}
