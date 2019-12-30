<template>
  <div class="manage">
    <h1>{{ content.header }}</h1>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";

import userSvc from "../service/user.service";

export default {
  name: "manage",
  setup() {
    const content = reactive({ header: "" });

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

    return { content };
  }
};
</script>
