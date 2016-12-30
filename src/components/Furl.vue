<template>
  <div class="furl">
    <div v-if="!furledUrl">
      <div class="file-drop"
        v-on:dragover.prevent="$event.dataTransfer.dropEffect = 'copy'"
        v-on:drop.prevent="onFileSelected($event.dataTransfer.files)"
        v-on:dragenter="$event.target.classList.add('file-drop-receiving')"
        v-on:dragleave="$event.target.classList.remove('file-drop-receiving')"
        >
        <span>Drop a file here</span>
      </div>
      <input type="file" v-on:change="onFileSelected($event.target.files)">
    </div>
    <div v-if="furledUrl">
      <h2>Use this link to unfurl the file</h2>
      <a class="furled-url" v-bind:href="furledUrl">{{ furledUrl }}</a>
      <h2>OR if the link is too large, paste this at: <a v-bind:href="unFurlPath">{{ unFurlPath }}</a></h2>
      <span class="furled-url">{{ furledFragment }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'furl',
  components: {
  },
  data () {
    return {
      furledFragment: null
    }
  },
  computed: {
    unFurlPath: function () {
      return window.location.toString() + 'unfurl'
    },
    furledUrl: function () {
      return this.furledFragment && (this.unFurlPath + '?' + this.furledFragment)
    }
  },
  methods: {
    onFileSelected: function (files) {
      // TODO error UI for multiple files.
      var file = files[0]
      var reader = new window.FileReader()
      reader.onprogress = (event) => {
        var percentage = 100 * event.loaded / event.total
        console.log(percentage)
      }
      reader.onload = (event) => {
        this.furledFragment = 'name=' + encodeURIComponent(file.name) + '&data=' + encodeURIComponent(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.file-drop {
  min-height: 40px;
  border: 2px dashed #bbb;
  padding: 3px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-drop-receiving {
  min-height: 40px;
  border: 4px dashed #333;
  padding: 1px;
}

.furled-url {
  display: block;
  overflow-x: auto;
}
</style>
