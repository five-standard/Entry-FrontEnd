export const handleLogOut = () => { //2뎁스 이상의 페이지에서 로그아웃 되지 않는 오류 해결
  document.cookie = "accessToken=; expires=0; path=/;";
  document.cookie = "name=; expires=0; path=/;";
  window.location.reload();
}