<template>
  <div class="login">
    <div>
      <img
        class="display-block center"
        src="../assets/nerd-face_1f913.png"
        alt
      />
    </div>
    <div>
      <h1 class="text-center">Welcome to Nead Bro.</h1>
    </div>
    <div id="form" class="center">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="email" class="form-item" label label-width="0">
          <label for>Email address</label>
          <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item" label-width="0">
          <label for>Password</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="submit-button">
          <el-button
            type="success"
            class="form-item"
            @click="submitForm('ruleForm')"
            >Sign in</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import {
  stripSpecialChar,
  validateEmail,
  validatePW
  //validateVCode
} from "@u/validate.js";

export default {
  name: "login",
  setup(props, context) {
    const ruleForm = reactive({
      email: "",
      password: "",
      code: ""
    });

    const chekEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Email cannot be empty."));
      } else if (!validateEmail(value)) {
        callback(new Error("Email format is not correct."));
      } else {
        callback();
      }
    };

    const checkPW = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter password."));
      } else {
        ruleForm.password = stripSpecialChar(value);
        value = ruleForm.password;
        if (!validatePW(value)) {
          callback(
            new Error(
              "Password must contains both char and number, 6~20 digits."
            )
          );
        } else {
          callback();
        }
      }
    };

    const rules = reactive({
      email: [{ validator: chekEmail, trigger: "blur" }],
      password: [{ validator: checkPW, trigger: "blur" }]
      //code: [{ validator: validateCode, trigger: "blur" }]
    });

    const submitForm = formName => {
      context.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const resetForm = formName => {
      context.$refs[formName].resetFields();
    };

    return {
      ruleForm,
      rules,
      submitForm,
      resetForm
    };
  }
};
</script>
<style lang="scss" scoped>
.login {
  margin-top: 50px;
  height: 900px;
}
.display-block {
  display: block;
}
.center {
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
#form {
  width: 400px;
  height: 300px;
  border: 1px solid #d8dee2;
  background-color: white;
  border-radius: 9px;
  padding: 20px;
}
.form-item {
  display: inline-block;
  width: 100%;
  margin-left: 0;
  margin-bottom: 20px;
}
label {
  font-family: Arial;
  font-size: 18px;
  font-weight: normal;
}
.submit-button {
  margin-top: 20px;
}
</style>
