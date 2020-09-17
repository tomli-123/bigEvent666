$(function () {
  // 表单转换
  $(".reg-box").hide();
  $(".reg >a").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $(".login >a").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 表单校验

  window.layui.form.verify({
    reusername: function (value, item) {
      //value：表单的值、item：表单的DOM对象

      if ($("#pwd").val() !== value) {
        return "密码确认错误1";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    username: [/^[a-zA-Z0-9_-]{4,16}$/, "4到16位（字母，数字，下划线，减号）"],
    password: [
      /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
      "密码至少包含 数字和英文，长度6-20",
    ],
  });

  // 注册请求
  $("#reg-box").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: data,

      // data: {
      //   username: $("#usern").val(),
      //   password: $("#pwd").val(),
      // },
      success: function (res) {
        if (res.status === 0) {
          $(".login >a").click();
          // Headers({
          //   token: res.token,
          // });
        }
        var layer = layui.layer;
        layer.msg(res.message);
      },
    });
  });
  // 登录请求
  $("#login-box").on("submit", function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    // var newToken =
    $.ajax({
      type: "post",
      url: "/api/login",
      data: data,

      // data: {
      //   username: $("#usern1").val(),
      //   password: $("#pwd1").val(),
      // },
      success: function (res) {
        if (res.status === 0) {
          window.location.href = "../../index.html";
          var token = res.token || "";
          window.localStorage.setItem("token", token);
        }
        var layer = layui.layer;
        layer.msg(res.message);
      },
    });
  });
});
