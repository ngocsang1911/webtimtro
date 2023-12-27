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
const roomIDToEdit = urlParams.get("roomID");

if (roomIDToEdit) {
  // Nếu có giá trị 'roomID', thực hiện lấy thông tin phòng từ Firestore và điền vào biểu mẫu
  try {
    const roomDocRef = doc(db, "rooms", roomIDToEdit);
    const docSnapshot = await getDoc(roomDocRef);
    if (docSnapshot.exists()) {
      const roomData = docSnapshot.data();
      console.log(docSnapshot.data());

      // Lấy tất cả các key của đối tượng roomData
      const roomKeys = Object.keys(roomData);
      // Kiểm tra xem có key nào không
      // Điền thông tin phòng vào các ô input trong biểu mẫu
      document.getElementById("loaiPhong").value = roomKeys[0];
      document.getElementById("soLuongPhong").value =
        roomData[roomKeys[0]].soLuongPhong;
      document.getElementById("sucChua").value = roomData[roomKeys[0]].sucChua;
      document.getElementById("gioiTinh").value =
        roomData[roomKeys[0]].gioiTinh;
      document.getElementById("dienTich").value =
        roomData[roomKeys[0]].dienTich;
      document.getElementById("giaChoThue").value =
        roomData[roomKeys[0]].giaChoThue;

      // Thêm sự kiện cho nút "Lưu" để cập nhật thông tin phòng
      const saveButton = document.getElementById("btn-editphong");
      saveButton.addEventListener("click", async function (e) {
        e.preventDefault();

        // Lấy thông tin đã chỉnh sửa từ các ô input
        const updatedRoomData = {
          ...roomData[roomKeys[0]],
          soLuongPhong: document.getElementById("soLuongPhong").value,
          sucChua: document.getElementById("sucChua").value,
          gioiTinh: document.getElementById("gioiTinh").value,
          dienTich: document.getElementById("dienTich").value,
          giaChoThue: document.getElementById("giaChoThue").value,
          // Các trường thông tin khác tương tự
        };
        // Cập nhật thông tin phòng trong Firestore

        await updateDoc(roomDocRef, {
          [roomKeys[0]]: updatedRoomData,
        });
        alert("Thông tin phòng đã được cập nhật thành công.");
        console.log("Thông tin phòng đã được cập nhật thành công.");
      });
    } else {
      console.log("Không tìm thấy thông tin phòng cần sửa.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng:", error);
  }
} else {
  console.log("Không có giá trị 'roomID' trong URL.");
}
