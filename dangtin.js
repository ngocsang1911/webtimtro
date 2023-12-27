import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

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
if (!email) {
  // Người dùng đã đăng nhập, thực hiện hành động phù hợp (ví dụ: chuyển hướng đến trang đã đăng nhập)
  console.log("Đã đăng nhập với tên người dùng: " + email);
  window.location.href = "trangchu.html";
}
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
const storage = getStorage(app);
// document.addEventListener("click", function () {
const registerButton = document.getElementById("submit");

registerButton.addEventListener("click", async function (e) {
  e.preventDefault();

  // const username = document.querySelector("#username").value;
  // const phone = document.querySelector("#phone").value;
  // const password = document.querySelector("#password").value;

  const loaiPhong = document.getElementById("loaiPhong").value;
  const roomData = {
    soLuongPhong: document.getElementById("soLuongPhong").value,
    sucChua: document.getElementById("sucChua").value,
    gioiTinh: document.getElementById("gioiTinh").value,
    dienTich: document.getElementById("dienTich").value,
    diaChi: document.getElementById("diaChi").value,
    diaChiIframe: document.getElementById("diaChiIframe").value,
    giaChoThue: document.getElementById("giaChoThue").value,
    tienich: {
      WC_Rieng: document.getElementById("tienIchWC").checked,
      AnNinh: document.getElementById("tienIchAnNinh").checked,
      GioGiacTuDo: document.getElementById("tienIchGioGiac").checked,
      Wifi: document.getElementById("tienIchWifi").checked,
      ChoDeXe: document.getElementById("choDeXe").checked,
    },
    tienDien: document.getElementById("tienDien").value,
    tienNuoc: document.getElementById("tienNuoc").value,
    // anh: document.getElementById("anh").value,
    soDienThoai: document.getElementById("soDienThoai").value,
    tieuDeBaiDang: document.getElementById("tieuDeBaiDang").value,
    noiDungMoTa: document.getElementById("noiDungMoTa").value,
    gioMoCua: document.getElementById("gioMoCua").value,
    email: email,
  };

  const anhInput = document.getElementById("anh");
  const file = anhInput.files[0];
  if (file) {
    try {
      // Tạo tham chiếu trong Firebase Storage
      const imagesRef = storageRef(storage, "roomImages/" + file.name);

      // Upload ảnh lên Firebase Storage
      //   await uploadString(imagesRef, file);
      await uploadBytes(imagesRef, file);

      // Lấy snapshot của ảnh đã upload để có thêm thông tin
      const downloadURL = await getDownloadURL(imagesRef);

      // Lấy URL của ảnh đã upload

      // Thêm URL ảnh vào dữ liệu phòng
      roomData.anh = downloadURL;

      // Tạo một tham chiếu đến bảng "rooms" và thêm dữ liệu mới với ID ngẫu nhiên
      const roomsCollection = collection(db, "rooms");
      await addDoc(roomsCollection, {
        [loaiPhong]: roomData,
      });
      alert("Đăng tin thành công");
      console.log("Dữ liệu và ảnh đã được tải lên Firebase thành công.");
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu và ảnh lên Firebase:", error);
    }
  } else {
    alert("Vui lòng chọn một ảnh.");
  }
});
