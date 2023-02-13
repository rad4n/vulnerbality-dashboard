<template>
  <div>
    <v-container fluid>
      <DataTable
        v-if="reportLoaded"
        :selectedVulnerabilities="selectedVulnerabilities"
      ></DataTable>
      <v-row v-else class="my-2"
        ><v-col>
          <v-alert border="top" colored-border type="info" elevation="2">
            There is no data to display yet. Try to load a trivy report by using
            the file uploader above.
          </v-alert></v-col
        ></v-row
      >
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import { Vulnerability } from "@/types"
import DataTable from "@/components/DataTable.vue"
import { Component, Prop } from "vue-property-decorator"

@Component({
  components: {
    DataTable,
  },
})
export default class ListReport extends Vue {
  @Prop() private presetUrl?: string
  private selectedVulnerabilities: Vulnerability[] = []
  private reportLoaded = false
}
</script>
