var UserProfile = (function () {
  var userInfo = {};

  var getUserInfo = function () {
    return JSON.parse(localStorage.getItem("userInfo")); // Or pull this from cookie/localStorage
  };

  var setUserInfo = function (userInfo) {
    userInfo = localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  return {
    getUserInfo: getUserInfo,
    setUserInfo: setUserInfo,
  };
})();

export default UserProfile;
