$(function () {
  $.ajaxPrefilter(function (options) {
    options.headers = {
      Authorization: window.localStorage.getItem("token"),
    };
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    options.complete = function (res) {
      if (res.responseJSON.status === 1) {
        window.location.href = "../../login.html";
        window.localStorage.removeItem("token");
      }
    };
  });
});
// 问题1 为什么他们的传入数据格式不一样
// 问题2 为什么complete可以检测token的取值是否正确
