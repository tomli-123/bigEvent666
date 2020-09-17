$(function () {
  // 表单验证
  layui.form.verify({
    newPwd: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!/(^[\S]{6,12}$)/.test(value)) {
        return "密码必须6到12位，且不能出现空格";
      }
      if ($("#old").val() === value) {
        return "新密码与旧密码不能一致";
      }
    },
    renewPwd: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!/(^[\S]{6,12}$)/.test(value)) {
        return "密码必须6到12位，且不能出现空格";
      }
      if ($("#new").val() !== value) {
        return "确认密码失败";
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    oldPwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  });
  // submit事件
  layui.form.on("submit(reset)", function (data) {
    var data1 = $("#formInfo").serialize();

    $.ajax({
      url: "/my/updatepwd",
      type: "POST",
      data: data1,
      success: function (res) {
        if (res.status === 0) {
          var layer = layui.layer;

          layer.msg(res.message);
        }
      },
    });
    // console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
    // console.log(data.form); //被执行提交的form对象，一般在存在form标签时才会返回
    // console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
  //表单重置事件
  $("#btn-reset").on("click", function (e) {
    e.preventDefault();
    $("#formInfo")[0].reset();
  });
});
