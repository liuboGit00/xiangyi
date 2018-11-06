var validatorAll = (rule, value, callback) => {
  //表单验证
  for (let key in RegExp) {
    if (key == rule.field) {
      $(".el-form").find(".el-form-item").each(function (index, item) {
        if ($(this).find("input").attr("prop") == key) {
          if (RegExp[rule.field].pattern.test($(this).find("input").val())) {
            callback();
          } else {
            callback(new Error(RegExp[rule.field].message));
          }
        }
      })
    }
  }
};

var RegExp = {
  number: {
    pattern: /^\d+$/,
    message: "输入内容必须为数字！"
  },
  zh_en: {
    pattern: /[\u4e00-\u9fa5]/,
    message: "输入内容必须为中文！"
  },
  email: {
    pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
    message: "输入内容必须为email格式！"
  },
  userName: {
    pattern: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/,
    message: "输入内容必须为正确的用户名！"
  },
  // /[\u4E00-\u9FA5A-Za-z0-9]{1,15}/
  maxLength15: {
    pattern: /^[\u4e00-\u9fff A-Za-z0-9]{0,15}$/,
    message: '标题不可超过15个字'
  }
}


export default {
  // 自定义验证规则
  maxLength15: [{ validator: validatorAll, trigger: ['blur', 'change'] }],    //报告标题不能超过15个字
  number: [{ required: true,validator: validatorAll, trigger: ['blur', 'change'] }],    //报告标题不能超过15个字
}