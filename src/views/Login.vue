<template>
  <div class="login">
    <div>
      <img
        class="display-block center"
        src="../assets/nerd-face_1f913.png"
        alt=""
      />
    </div>
    <div>
      <h1 class="text-center">
        Welcome to Nead Bro.
      </h1>
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
        <el-form-item prop="pass" class="form-item" label="" label-width="0">
          <label for="">Email address</label>
          <el-input
            type="text"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="form-item" label-width="0">
          <label for="">Password</label>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
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
export default {
  name: "login",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
