import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCpLDBv1bfuq8kSArh7ATnZhRTMFt4HIYY",
    authDomain: "fir-89253.firebaseapp.com",
    projectId: "fir-89253",
    storageBucket: "fir-89253.appspot.com",
    messagingSenderId: "138196254814",
    appId: "1:138196254814:web:1c8a65a6e667a5ece734cf"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Thay thế 'loaiPhong' bằng khóa hoặc cấu trúc thích hợp trong cơ sở dữ liệu của bạn
const dataRef = ref(db, 'loaiPhong');

// Hàm để lấy và hiển thị dữ liệu
async function fetchDataAndDisplay() {
  const snapshot = await get(dataRef);
  const data = snapshot.val();
  if (data) {
    // Bạn có thể cập nhật trang "trangchu.html" với dữ liệu ở đây
    // Ví dụ, cập nhật danh sách phòng với dữ liệu từ Firebase
    // Bạn cần có một phần tử HTML (ví dụ, một <ul>) nơi bạn muốn hiển thị dữ liệu.
    // Lặp qua dữ liệu và cập nhật HTML tương ứng.

    const roomList = document.getElementById("roomList"); // Thêm một phần tử HTML với ID này

    for (const key in data) {
      const room = data[key];
      const listItem = document.createElement("li");
      listItem.textContent = `Loại Phòng: ${room.loaiPhong}, Giá: ${room.giaChoThue}`;
      roomList.appendChild(listItem);
    }
  }
}

// Gọi hàm fetchDataAndDisplay để lấy và hiển thị dữ liệu
fetchDataAndDisplay();
