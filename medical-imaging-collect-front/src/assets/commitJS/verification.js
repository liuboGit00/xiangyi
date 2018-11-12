



var RegExp = {
    number: [
        { required: true, message: '请输入内容！', trigger: 'blur' },
        { pattern: /^\d+$/, message: '输入内容必须为数字！', trigger: 'blur' },
    ],
    zh_en: [
        { required: true, message: '请输入内容！', trigger: 'blur' },
        { pattern: /[\u4e00-\u9fa5]/, message: '输入内容必须为中文！', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入email！', trigger: 'blur' },
        { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '输入内容必须为email格式！', trigger: 'blur' },
    ],
    userName: [
      { required: true, message: '请输入用户名！', trigger: 'blur' },
      { pattern: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/, message: '输入内容必须为正确的用户名！', trigger: 'blur' },
    ],
  }

//   function verification(data){
//     for(let i in RegExp){
//         if(i == data){
//             console.log(data)
//             return RegExp[data]
//         }
//     }
//   }


export default RegExp