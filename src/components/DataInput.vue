<template>
  <v-row>
    <v-col md="3" sm="12">
      <VueFileAgent
        class="upload-block"
        :multiple="false"
        :deletable="false"
        :theme="'list'"
        @select="onFileChange"
        accept="application/json"
        :errorText="{
          size: 'This file is too large to be attached',
        }"
      >
        <template v-slot:file-preview="slotProps">
          <div :key="slotProps.index" class="grid-box-item file-row">
            <button
              type="button"
              class="close remove"
              aria-label="Remove"
              @click="removeFileRecord(slotProps.fileRecord)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <strong>{{ slotProps.fileRecord.name() }}</strong>
            <span class="text-muted">({{ slotProps.fileRecord.size() }})</span>
          </div>
        </template>
        <template v-slot:file-preview-new>
          <div class="text-left my-3" key="new"></div>
        </template>
      </VueFileAgent>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="selectedTarget"
        clearable
        :items="vulnerabilityReport"
        item-text="Target"
        item-value="Target"
        outlined
        label="Select Target"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue"
import VueFileAgent, { FileRecord } from "vue-file-agent"
import { Component, Watch } from "vue-property-decorator"
import { Vulnerability, VulnerabilityReportTarget } from "@/types"

Vue.use(VueFileAgent)

@Component
export default class DataInput extends Vue {
  private selectedTarget = ""

  get selectedVulnerabilities(): Vulnerability[] {
    if (this.selectedTarget) {
      return this.vulnerabilityReport.find(
        (i) => i.Target === this.selectedTarget
      )?.Vulnerabilities
    } else {
      return this.vulnerabilityReport
        .filter((vr) => vr.Vulnerabilities)
        .flatMap((vr) => vr.Vulnerabilities)
    }
  }

  file: FileRecord | Record<string, never> = {}
  private vulnerabilityReport: VulnerabilityReportTarget[] = [
    { Target: "test", Type: "type" },
  ]

  @Watch("selectedTarget")
  public onNewTarget(): void {
    this.$emit("inputChanged", this.selectedVulnerabilities)
  }

  @Watch("file")
  public onFileChange(files: FileRecord[]): void {
    const selectedFile = files[0]
    const reader = new FileReader()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    reader.onload = (e) => {
      if (e?.target?.result && typeof e.target.result === "string") {
        this.vulnerabilityReport.splice(0)
        this.vulnerabilityReport.push(...JSON.parse(e.target.result))
        this.vulnerabilityReport.forEach((vr) =>
          vr.Vulnerabilities?.forEach((v) => (v.Target = vr.Target))
        )
        this.onNewTarget()
      }
    }
    reader.readAsText(selectedFile.file)
  }
}
</script>

<style scoped>
.file-row {
  position: relative;
  z-index: 15;
  line-height: 24px;
  text-align: left;
  background: #eee;
  margin-bottom: 5px;
  padding: 2px 5px;
}

.remove {
  float: right;
  margin-top: -3px;
}

.progress {
  float: right;
  width: 85px;
  height: 10px;
  margin-top: 7px;
  margin-right: 10px;
  background: #fff;
  border: 1px solid #aaa;
}

.progress.completed {
  display: none;
}

.drop-help-text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 2px;
  background: rgba(255, 255, 255, 0.75);
  z-index: 1200;
  font-size: 32px;
  font-weight: bold;
  color: #888;
  align-items: center;
  justify-content: center;
  display: none;
}

.is-drag-over .drop-help-text {
  display: flex;
}

.upload-block {
  border: 2px dashed transparent;
}

.is-drag-over.upload-block {
  border-color: #aaa;
}

.vue-file-agent {
  border: 0 !important;
  box-shadow: none !important;
}
</style>