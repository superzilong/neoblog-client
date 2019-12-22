/**
 * 过滤特殊字符
 */
export function stripSpecialChar(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return reg.test(value) ? true : false;
}
/**
 * 验证密码 6至20位的字母+数字
 */
export function validatePW(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(value) ? true : false;
}
/**
 * 验证验证码
 */
export function validateVCode(value) {
  let reg = /^[0-9]{6}$/;
  return !reg.test(value) ? true : false;
}
