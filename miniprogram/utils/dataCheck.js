//特殊字符验证
function haveSpechars(val) {
  const txt = /[ ,\\`,\\~,\\!,\\@,#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,"]/;
  if (txt.test(val)) {
    return true; //有特殊字符返回真
  } else return false;
}

//学号验证  此处还需完善
function isUid(val) {
  const id = /^\d{8}$/;
  if (id.test(val)) {
    return true;
  } else {
    return false;
  }
}
//手机号验证
function isTel(num) {
  return /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(num);
}

//邮箱验证
function isEmail(val) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
}

// 表单验证时用  检验是否为正整数
function checkRate(number) {
  const re = /^[1-9]\d*/; //判断正整数/[1−9]+[0−9]∗]∗/   
  console.log('正整数校验 开始', number);
  if (!re.test(number) || number == 0) {
    console.log('正整数校验 失败');
    return false;
  }
  console.log('正整数校验 成功');
  return true;
}

module.exports = {
  checkRate: checkRate,
  isUid: isUid,
  haveSpechars: haveSpechars,
  isEmail: isEmail,
  isTel: isTel,
}