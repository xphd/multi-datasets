<template>
  <div>
    <p>MultiDatasets</p>
    <ul>
      <li v-for="(dataset, index) in datasets" :key="index">
        <input type="radio" :value="dataset" v-model="selected_dataset">
        {{dataset}}
      </li>
    </ul>
    <button @click="setDataset">Set Dataset</button>
  </div>
</template>

<script>
export default {
  name: "multi-datasets",
  data() {
    return {
      datasets: null, // []
      selected_dataset: null
    };
  },
  methods: {
    setDataset() {
      console.log(this.selected_dataset);
      this.$socket.emit("setDatasetReq", this.selected_dataset);
      console.log("Emit setDatasetReq");
    }
  },
  mounted() {
    console.log("Emit getDatasetsReq");
    this.$socket.emit("getDatasetsReq");
  },
  sockets: {
    getDatasetsRes(datasets) {
      this.datasets = datasets;
      // console.log(this.datasets);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>