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

const email = localStorage.getItem("email");
if (email) {
  const checkUser = document.getElementById("checkUser");
  checkUser.innerHTML = "";
  const userLink = document.createElement("a");
  userLink.className = "nav-link active";
  userLink.href = "trangchu.html";

  userLink.innerHTML = `
  <span>&#128274;</span> ${email}
    `;
  checkUser.appendChild(userLink);
}

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
    // console.log(roomData[roomKeys[0]]);
    const roomCard = document.createElement("div");
    roomCard.className = "col-md-4 room-card";
    roomCard.innerHTML = `
      <img class="room-image" style="width: 100%; aspect-ratio: 16/9; object-fit: cover" src="${
        roomData[roomKeys[0]].anh
      }" loading="lazy" alt="${roomData[roomKeys[0]].loaiPhong}">
      <h3>${roomKeys[0]}</h3>
      <p>Số Lượng Phòng: ${roomData[roomKeys[0]].soLuongPhong}</p>
      <p>Sức Chứa: ${roomData[roomKeys[0]].sucChua}</p>
      <p>Giới Tính Ưu Tiên: ${roomData[roomKeys[0]].gioiTinh}</p>
      <p>Diện Tích (m²): ${roomData[roomKeys[0]].dienTich}</p>
      <p>Giá Cho Thuê (VNĐ/tháng): ${roomData[roomKeys[0]].giaChoThue}</p>
      <button class="btn btn-primary viewRooms" data-loaiphong="${
        roomData[roomKeys[0]].loaiPhong
      }" data-roomid="${roomData[roomKeys[0]].roomID}">Xem Chi tiết</button>
    `;
    const editButton = roomCard.querySelector(".viewRooms");
    editButton.addEventListener("click", () => {
      console.log(roomData[roomKeys[0]]);
      // Chuyển hướng sang trang sửa phòng với roomID
      window.location.href = `chitietphong.html?roomID=${
        roomData[roomKeys[0]].roomID
      }`;
    });
    // const deleteButton = roomCard.querySelector(".deleteRoomButton");
    // deleteButton.addEventListener("click", async () => {
    //   // Hiển thị thông báo xác nhận
    //   const isConfirmed = confirm("Bạn có chắc chắn muốn xóa phòng này?");

    //   if (isConfirmed) {
    //     try {
    //       const roomIDToDelete = roomData[roomKeys[0]].roomID;
    //       const roomDocRef = doc(db, "rooms", roomIDToDelete);

    //       // Xóa tài liệu từ Firestore
    //       await deleteDoc(roomDocRef);

    //       console.log("Đã xóa phòng:", roomIDToDelete);
    //       // Hoặc thực hiện các bước khác sau khi xóa
    //     } catch (error) {
    //       console.error("Lỗi khi xóa phòng:", error);
    //     }
    //   }
    // });
    roomList.appendChild(roomCard);
  });
}
updateRoomList(roomDataArray);
if (roomDataArray.length === 0) {
  roomList.innerHTML = "<p>Không có phòng nào.</p>";
}

const filterSelect = document.getElementById("filterSelect");

filterSelect.addEventListener("change", () => {
  // Lọc dữ liệu dựa trên giá trị được chọn
  const selectedValue = filterSelect.value;
  console.log(selectedValue);
  const filteredRooms = roomDataArray.filter((room) => {
    const roomKeys = Object.keys(room);
    // Thêm trường roomID vào dữ liệu phòng
    return roomKeys[0].includes(selectedValue);
    // room.loaiPhong.includes(selectedValue)
  });
  // Cập nhật giao diện với danh sách đã lọc
  updateRoomList(filteredRooms);
});
