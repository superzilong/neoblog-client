<template>
  <div class="manage">
    <h1>{{ content.header }}</h1>
    <el-button type="primary" size="medium" @click="handleOpen">New</el-button>
    <el-dialog
      title="New Blog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="closeOnClickModal"
      width="1200px"
      top="50px"
      :before-close="handleClose"
      :destroy-on-close="destroyOnClose"
    >
      <md-edit ref="edit" :init-input="initText"></md-edit>
      <div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="handleConfirm">Confirm</el-button>
          <el-button type="danger" @click="dialogVisible = false"
            >Cancel</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import userSvc from "../service/user.service";
import MDEdit from "@c/MDEdit";
import articeSvc from "@/service/article.service";

export default {
  name: "manage",
  components: {
    "md-edit": MDEdit
  },
  setup(props, context) {
    const content = reactive({ header: "" });
    const dialogVisible = ref(false);
    const closeOnClickModal = ref(false);
    const destroyOnClose = ref(false);
    const initText = ref("# Hello");
    onMounted(() => {
      userSvc.getControlPanelContent().then(
        response => {
          content.header = response.data;
        },
        error => {
          content.header = error.response.data.message;
        }
      );
    });
    watch(dialogVisible, (vis, previs) => {
      if (previs && !vis) {
        context.refs.edit.input = "# Hello";
      }
    });
    const handleOpen = () => {
      dialogVisible.value = true;
    };

    const handleClose = done => {
      context.root
        .$confirm("Sure to close？")
        .then(() => {
          done();
        })
        .catch(() => {});
    };
    const handleConfirm = () => {
      //console.log(context.refs.edit.input);
      //console.log(context.refs.edit.compiledMarkdown);
      let myDate = new Date();
      let xmlString = "<div>" + context.refs.edit.compiledMarkdown + "</div>";
      let doc = new DOMParser().parseFromString(xmlString, "text/html");
      let title = doc.getElementsByTagName("h1")[0].innerHTML;
      console.log(xmlString);
      console.log("title: " + title);
      articeSvc
        .createArticle(
          title,
          context.refs.edit.input,
          context.refs.edit.compiledMarkdown,
          "",
          myDate.toLocaleDateString()
        )
        .then(
          response => {
            if (response.data === "success") {
              dialogVisible.value = false;
              alert("publish success!");
            }
          },
          error => {
            console.log(error.toString());
            alert("publish fail!");
          }
        );
    };
    return {
      content,
      dialogVisible,
      initText,
      closeOnClickModal,
      destroyOnClose,
      handleOpen,
      handleClose,
      handleConfirm
    };
  }
};
</script>
