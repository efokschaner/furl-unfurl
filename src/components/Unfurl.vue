<template>
  <div class="unfurl">
    <div v-if="!furledFragment">
      <textarea v-model="manualInputFurledFragment" placeholder="Paste furled data here. Might take a while to unfurl" class="furled-data"></textarea>
    </div>
    <div v-if="asyncComputedDownloadUri">
      <a v-bind:href="asyncComputedDownloadUri" v-bind:download="furledFragment.name">Download {{ furledFragment.name }}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'unfurl',
  components: {
  },
  data () {
    return {
      manualInputFurledFragment: null,
      asyncComputedDownloadUri: null
    }
  },
  computed: {
    furledFragment () {
      if (this.$route.query.name && this.$route.query.data) {
        return { name: decodeURIComponent(this.$route.query.name), data: decodeURIComponent(this.$route.query.data) }
      } else if (this.manualInputFurledFragment) {
        var pairs = this.manualInputFurledFragment.split('&')
        return { name: decodeURIComponent(pairs[0].split('=')[1]), data: decodeURIComponent(pairs[1].split('=')[1]) }
      }
    }
  },
  watch: {
    furledFragment: {
      handler (val) {
        if (val && val.name && val.data) {
          window.fetch(val.data)
          .then(res => res.blob())
          .then(blob => {
            // Force the mime type to force it to download without weirdness
            var fixedTypeBlob = new window.Blob([blob], {type: 'application/octet-stream'})
            this.asyncComputedDownloadUri = window.URL.createObjectURL(fixedTypeBlob)
          })
        }
      },
      immediate: true
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.furled-data {
  display: block;
  overflow-x: auto;
}
</style>
