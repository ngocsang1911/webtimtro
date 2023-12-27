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

const roomsCollectionRef = collection(db, "rooms");

const querySnapshot = await getDocs(roomsCollectionRef);

const roomDataArray = querySnapshot.docs.map((doc) => {
  // Lấy dữ liệu từ document
  const roomData = doc.data();
  const roomKeys = Object.keys(roomData);
  // Thêm trường roomID vào dữ liệu phòng
  roomData[roomKeys[0]].roomID = doc.id;

  return roomData;
});

function updateRoomList(rooms) {
  console.log(rooms);
  const roomList = document.getElementById("roomList");
  roomList.innerHTML = ""; // Xóa nội dung cũ

  rooms.forEach((roomData) => {
    const roomKeys = Object.keys(roomData);
    console.log(roomKeys);
    // console.log(roomData[roomKeys[0]]);
    const roomCard = document.createElement("tr");
    roomCard.innerHTML = `
        <td>
        <p>${roomKeys[0]}</p>
        <p>Tiêu đề: ${roomData[roomKeys[0]].tieuDeBaiDang}</p>
        </td>
        <td><img src="${
          roomData[roomKeys[0]].anh
        }" alt="" style="width: 100px; height: 100px; object-fit: cover;"></td>
        <td>${roomData[roomKeys[0]].giaChoThue}</td>
        <td>${roomData[roomKeys[0]].soDienThoai}</td>
        <td>
        <button class="btn btn-primary editRooms" data-loaiphong="${
          roomData[roomKeys[0]].loaiPhong
        }" data-roomid="${roomData[roomKeys[0]].roomID}">Sửa Phòng</button>
        <button class="btn btn-danger deleteRoomButton" data-loaiphong="${
          roomData[roomKeys[0]].loaiPhong
        }" data-roomid="${roomData[roomKeys[0]].roomID}">Xóa Phòng</button>
        </td>
    `;
    const editButton = roomCard.querySelector(".editRooms");
    editButton.addEventListener("click", () => {
      console.log(roomData[roomKeys[0]]);
      // Chuyển hướng sang trang sửa phòng với roomID
      window.location.href = `EditRoomAdmin.html?roomID=${
        roomData[roomKeys[0]].roomID
      }`;
    });
    const deleteButton = roomCard.querySelector(".deleteRoomButton");
    deleteButton.addEventListener("click", async () => {
      // Hiển thị thông báo xác nhận
      const isConfirmed = confirm("Bạn có chắc chắn muốn xóa phòng này?");

      if (isConfirmed) {
        try {
          const roomIDToDelete = roomData[roomKeys[0]].roomID;
          const roomDocRef = doc(db, "rooms", roomIDToDelete);

          // Xóa tài liệu từ Firestore
          await deleteDoc(roomDocRef);
          console.log("Đã xóa phòng:", roomIDToDelete);
          alert("Xóa phòng thành công");
          window.location.reload();
          // Hoặc thực hiện các bước khác sau khi xóa
        } catch (error) {
          console.error("Lỗi khi xóa phòng:", error);
        }
      }
    });
    roomList.appendChild(roomCard);
  });
}
updateRoomList(roomDataArray);
if (roomDataArray.length === 0) {
  roomList.innerHTML = "<p>Không có phòng nào.</p>";
}
