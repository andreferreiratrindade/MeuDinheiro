<template>
  <div class="q-pa-md column items-start q-gutter-y-md">
    <q-file
      :value="files"
      @input="updateFiles"
      label="Selecionar arquivos"
      outlined
      multiple
      :clearable="!isUploading"
      style="max-width: 400px"
    >
      <template v-slot:file="{ index, file }">
        <q-chip
          class="full-width q-my-xs"
          :removable="isUploading && uploadProgress[index].percent < 1"
          square
        >
          <q-linear-progress
            class="absolute-full full-height"
            :value="uploadProgress[index].percent"
            :color="uploadProgress[index].color"
            track-color="grey-2"
          />

          <q-avatar>
            <q-icon :name="uploadProgress[index].icon" />
          </q-avatar>

          <div class="ellipsis relative-position">
            {{ file.name }}
          </div>

          <q-tooltip>
            {{ file.name }}
          </q-tooltip>
        </q-chip>
      </template>

      <template v-slot:after v-if="canUpload">
        <q-btn
          color="primary"
          dense
          icon="cloud_upload"
          round
          @click="upload"
          :disable="!canUpload"
          :loading="isUploading"
        />
      </template>
    </q-file>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IOrdemService } from "../services/interfaces/IOrdemService";
import { injectable, inject } from "inversify";
import { TYPES } from "src/config/types";
import myContainer from "src/config/inversify.config";
import { Func } from "mocha";
@Component
export default class UploadArquivo extends Vue {
  files: any = null;
  uploadProgress: Array<any> = [];
  uploading: any = null;
  _ordemService!: IOrdemService;

  get isUploading(): Boolean {
    return this.uploading !== null;
  }

  get canUpload(): Boolean {
    return this.files !== null;
  }

  @Prop({ type: Function, default: () => false })
  readonly refresh!: Function;

  cancelarArquivo(index: any) {
    this.uploadProgress[index] = {
      ...this.uploadProgress[index],
      error: true,
      color: "orange-2",
    };
  }

  updateFiles(files: any[]) {
    this.files = files;
    this.uploadProgress = (files || []).map((file) => ({
      error: false,
      color: "green-2",
      percent: 0,
      file: file,
      icon:
        file.type.indexOf("video/") === 0
          ? "movie"
          : file.type.indexOf("image/") === 0
          ? "photo"
          : file.type.indexOf("audio/") === 0
          ? "audiotrack"
          : "insert_drive_file",
    }));
  }

  upload() {
    const allDone = this.uploadProgress.every(
      (progress) => progress.percent === 1
    );

    this.uploadProgress = this.uploadProgress.map((progress) => ({
      ...progress,
      error: false,
      color: "green-2",
      percent: allDone === true ? 0 : progress.percent,
    }));

    this.__updateUploadProgress();
  }

  __updateUploadProgress() {
    this.uploadProgress.forEach((element) => {
      this.uploading = true;

      this._ordemService.extrairOrdensDeArquivo(element.file).finally(()=>{
        this.uploading = null;
        this.files = null;
        this.refresh();
      });
    });
  }

  created() {
    this._ordemService = myContainer.myContainer.get<IOrdemService>(
      TYPES.OrdemService
    );
  }
}
</script>