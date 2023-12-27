function checkLoginStatus() {
  const email = localStorage.getItem("email");
  if (email) {
    // Người dùng đã đăng nhập, thực hiện hành động phù hợp (ví dụ: chuyển hướng đến trang đã đăng nhập)
    console.log("Đã đăng nhập với tên người dùng: " + email);
    window.location.href = "trangchu.html";
    return true;
  } else {
    // Người dùng chưa đăng nhập
    console.log("Chưa đăng nhập");
    return false;
  }
}
export { checkLoginStatus };
