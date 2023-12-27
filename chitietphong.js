import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  collection,
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
const modalBookRoom = document.getElementById("modalBookRoom");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("roomID");
console.log(roomID);
// http://127.0.0.1:5500/demo/chitietphong.html?roomID=DGwOwGNAbEYncQIVxxhh

if (roomID) {
  // Nếu có giá trị 'roomID', thực hiện lấy thông tin phòng từ Firestore và điền vào biểu mẫu
  try {
    const roomDocRef = doc(db, "rooms", roomID);
    const docSnapshot = await getDoc(roomDocRef);
    if (docSnapshot.exists()) {
      const roomData = docSnapshot.data();
      console.log(docSnapshot.data());

      // Lấy tất cả các key của đối tượng roomData
      const roomKeys = Object.keys(roomData);
      console.log(roomData[roomKeys[0]]);

      const detailRoom = document.getElementById("room-detail");
      detailRoom.innerHTML = "";
      const roomCard = document.createElement("div");
      roomCard.innerHTML = `
        <h1 class="title">${roomData[roomKeys[0]]?.tieuDeBaiDang}</h1>
        <p class="address">Địa chỉ: ${roomData[roomKeys[0]]?.diaChi}</p>
        <div class="info_price">
          <p class="">
            <span class="price">${
              roomData[roomKeys[0]]?.giaChoThue
            } triệu/tháng</span>
            <span class="acreage">${roomData[roomKeys[0]]?.dienTich}m2</span>
          </p>
          <p class="save_story">Lưu tin này</p>
        </div>
  
        <div class="container_product">
          <div class="image_detail">
            <img
              src="${roomData[roomKeys[0]]?.anh}"
              alt=""
              style="width: 100%; aspect-ratio: 16/9"
            />
          </div>
          <div class="profile">
            <div class="profile_model">
              <div class="profile_avt">
                <img
                  src="/demo/img/bg login.jpg"
                  alt=""
                  style="
                    width: 25%;
                    aspect-ratio: 1/1;
                    border-radius: 100rem;
                    object-fit: cover;
                  "
                />
                <div style="display: flex; flex-direction: column">
                  <span>Quang</span>
                  <a href="#">Xem trang cá nhân</a>
                  <p>Hoạt động gần đây</p>
                </div>
              </div>
  
              <button type="button" class="btn btn-primary">${
                roomData[roomKeys[0]]?.soDienThoai
              }</button>
              <button type="button" class="btn btn-secondary">Nhắn zalo</button>
            </div>
            <div class="profile_button">
            ${
              email === roomData[roomKeys[0]]?.email
                ? `<button class="btn btn-primary editRoomButton" style="width: 48%">
                Sửa
              </button>
              <button class="btn btn-danger deleteRoomButton" style="width: 48%">
                Xóa
              </button>`
                : `<button class="btn btn-primary btnbookroom" style="width: 48%">
                Đặt phòng
              </button> `
            }
            </div>
            <ul style="margin-top: 20px">
            <li>An Ninh: ${
              roomData[roomKeys[0]]?.tienich?.AnNinh === true ? "Có" : "Không"
            }</li>
            <li>Chỗ để xe: ${
              roomData[roomKeys[0]]?.tienich?.ChoDeXe === true ? "Có" : "Không"
            }</li>
            <li>Giờ giấc tự do: ${
              roomData[roomKeys[0]]?.tienich?.GioGiacTuDo === true
                ? "Có"
                : "Không"
            }</li>
            <li>WC riêng: ${
              roomData[roomKeys[0]]?.tienich?.WC_Rieng === true ? "Có" : "Không"
            }</li>
            <li>Wifi: ${
              roomData[roomKeys[0]]?.tienich?.Wifi === true ? "Có" : "Không"
            }</li>
           
          </ul>
          </div>
        </div>
  
        <div class="description_product" style="margin-top: 20px">
          
          <h3 style="text-decoration: underline; padding-top: 20px">
            Thông tin mô tả
          </h3>
          <p
            style="padding: 10px; background-color: #f5f5f5; border-radius: 10px"
          >
            <span
              >${roomData[roomKeys[0]]?.noiDungMoTa}</span
            >
          </p>
          <h3 style="text-decoration: underline; padding-top: 20px">
            Vị trí trên bản đồ
          </h3>
          
          ${roomData[roomKeys[0]]?.diaChiIframe}
        </div>
    `;

      detailRoom.appendChild(roomCard);
      // Kiểm tra xem có key nào không
      // Điền thông tin phòng vào các ô input trong biểu mẫu

      if (email === roomData[roomKeys[0]]?.email) {
        const editButton = document.querySelector(".editRoomButton");
        editButton.addEventListener("click", () => {
          // Chuyển hướng sang trang sửa phòng với roomID
          window.location.href = `suaphong.html?roomID=${roomID}`;
        });

        const deleteButton = document.querySelector(".deleteRoomButton");
        deleteButton.addEventListener("click", async () => {
          // Hiển thị thông báo xác nhận
          const isConfirmed = confirm("Bạn có chắc chắn muốn xóa phòng này?");

          if (isConfirmed) {
            try {
              const roomDocRef = doc(db, "rooms", roomID);

              // Xóa tài liệu từ Firestore
              await deleteDoc(roomDocRef);
              window.location.href = `trangchu.html`;
              console.log("Đã xóa phòng:", roomID);
              // Hoặc thực hiện các bước khác sau khi xóa
            } catch (error) {
              console.error("Lỗi khi xóa phòng:", error);
            }
          }
        });
      } else {
        const btnBookRoom = document.querySelector(".btnbookroom");
        btnBookRoom.addEventListener("click", () => {
          console.log(modalBookRoom);
          modalBookRoom.classList.add("modalBookRoom_show");
        });
        modalBookRoom.addEventListener("click", (e) => {
          if (e.target.classList.contains("modalBookRoom")) {
            modalBookRoom.classList.remove("modalBookRoom_show");
          }
        });
      }
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin phòng:", error);
    window.location.href = `trangchu.html`;
  }
} else {
  console.log("Không có giá trị 'roomID' trong URL.");
  window.location.href = `trangchu.html`;
}

const btn_submit_bookroom = document.querySelector("#btn_submit_bookroom");
btn_submit_bookroom.addEventListener("click", async () => {
  const bookRoomCollection = collection(db, "book_rooms");

  const phone_bookroom = document.querySelector("#phone_bookroom").value;
  const fullname_bookroom = document.querySelector("#fullname_bookroom").value;
  const email_bookroom = document.querySelector("#email_bookroom").value;
  if (
    phone_bookroom === "" ||
    fullname_bookroom === "" ||
    email_bookroom === ""
  ) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  try {
    await addDoc(bookRoomCollection, {
      phone: phone_bookroom,
      fullname: fullname_bookroom,
      email: email_bookroom,
      roomID: roomID,
    });
    alert("Đặt phòng thành công");
    modalBookRoom.classList.remove("modalBookRoom_show");
  } catch (error) {
    console.log(error);
    alert("Đặt phòng thất bại");
  }
});
