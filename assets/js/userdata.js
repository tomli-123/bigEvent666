$(function () {
  function update() {
    $.ajax({
      url: "/my/userinfo",
      type: "GET",
      success: function (res) {
        if (res.status === 1) return;
        if (res.status === 0) {
          layui.form.val("get", res.data);
          // var uname;
          // var uname1;
          // uname = res.data.nickname || res.data.username;
          // uname1 = String(uname);
          // uname1 = uname[0].toUpperCase();
          // $(".font").html(uname1).show();
          // $(".img").hide();
          // $("#un").html(uname);
        }
      },
    });
  }
  update();

  // 表单校验
  layui.form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    nickname: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  // 表单submit事件
  layui.form.on("submit(formDemo)", function (data) {
    var data1 = $("#form").serialize();

    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data: data1,
      success: function (res) {
        window.parent.render();
      },
    });
    // console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
    // console.log(data.form); //被执行提交的form对象，一般在存在form标签时才会返回
    console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
  //表单重置事件
  $("#btn").on("click", function (e) {
    e.preventDefault();

    var uname;
    var uname1;
    $.ajax({
      url: "/my/userinfo",
      type: "GET",
      success: function (res) {
        if (res.status === 1) return;
        if (res.status === 0) {
          layui.form.val("get", res.data);
        }
      },
    });
  });
});
