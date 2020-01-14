<template>
  <div id="editor">
    <textarea :value="input" @input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from "marked";
import lodash from "lodash";

export default {
  name: "md-edit",
  data: function() {
    return {
      input: ""
    };
  },

  props: ["initInput"],

  mounted() {
    this.input = this.initInput;
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    }
  },
  methods: {
    update: lodash.debounce(function(e) {
      this.input = e.target.value;
    }, 300)
  }
};
</script>

<style>
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 10px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 10px;
  min-height: 800px;
}
</style>
