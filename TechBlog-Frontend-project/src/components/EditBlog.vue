<template>
  <div>
    <HeaderVue />
    <div class="container mt-5 mb-3">
      <b-form-group class="w-50">
        <b-form-input
            required
            :state="validateTitle"
            placeholder="Title"
            v-model="title"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateTitle"
            >Invalid title!</b-form-invalid-feedback
        >
      </b-form-group>
      <div class="d-flex">
        <div class="mr-5">
            <input
                required
                type="file"
                id="img-input"
                :state="validateThumbnail"
                name="img"
                accept="image/*"
                @change="inputImage"
            />
            <b-form-invalid-feedback :state="validateThumbnail"
                >Invalid thumbnail!</b-form-invalid-feedback
            >
            <div class="text-preview mt-4">
                <img
                    id="img-preview"
                    :src="this.thumbnail"
                    alt=""
                    v-if="this.thumbnail"
                    />
                <p v-else>Image Preview</p>
            </div>
        </div>
        
      </div>
      <div class="mt-2 mb-3 w-50">
        <label for="">Type new tag</label>
        <b-form-tags input-id="tags-separators" v-model="tags" separator=" ,;" size="md"></b-form-tags>
      </div>

      <b-tabs content-class="mt-3" align="right">
        <b-tab title="Visual">
          <b-form>
            <vue-editor
                placeholder="Write down ..."
                :state="validateContent"
                v-model="content"
                useCustomImageHandler
                @image-added="handleImageAdded"
            />
            <b-form-invalid-feedback :state="validateContent"
                >Invalid content!</b-form-invalid-feedback
            >
            <div
                style="display: flex; justify-content: space-around"
                class="mt-5"
            >
                <b-button variant="outline-primary" v-on:click="updateBlog"
                    >Update</b-button
                >
                <router-link to="/"
                    ><b-button variant="outline-danger"
                    >Cancel</b-button
                    ></router-link
                >
            </div>
          </b-form>
        </b-tab>
        <b-tab title="Text">
            <textarea
                style="width: 100%; height: 60vh; border: 1px solid gray"
                v-model="content"
                class="p-3"
            ></textarea>
        </b-tab>
      </b-tabs>
    </div>
    <FooterVue/>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import HeaderVue from "./Header.vue";
import { uploadImage } from "../services/services";
import FooterVue from "./Footer.vue";
import Footer from "./Footer.vue";
import { getDetailBlog } from "../services/services";
import { updateBlog } from "../services/services";

export default {
    components: { VueEditor, HeaderVue, FooterVue, Footer },
    data() {
        return {
            title: "",
            content: null,
            thumbnail: "",
            thumbnailFile: null,
            validateTitle: null,
            validateThumbnail: null,
            validateContent: null,
            tags: []
        };
    },
    methods: {
        handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                uploadImage(formData).then((res) => {
                if (res.status != 200) {
                    this.$bvModal.msgBoxOk("Upload image fail!", {
                    size: "sm",
                    buttonSize: "sm",
                    centered: true,
                    });
                } else {
                    const url = res.data.url;
                    Editor.insertEmbed(cursorLocation, "image", url);
                }
                });
            } catch (error) {
                this.$bvModal.msgBoxOk(error.message, {
                size: "sm",
                buttonSize: "sm",
                centered: true,
                });
            }
            resetUploader();
        },

        updateBlog() {
            this.validateData();
            if (
                this.validateTitle == false ||
                this.validateThumbnail == false ||
                this.validateContent == false
            ) {
                // TODO
            } else {
                const blog = {
                    title: this.title,
                    content: this.content,
                    thumbnail: this.thumbnail,
                    tags: this.tags
                };

                updateBlog(this.$route.params.id, blog)
                    .then((res) => {
                        console.log(res)
                    if (res.status == 200) {
                        this.$bvModal.msgBoxOk("Successful!", {
                        size: "sm",
                        buttonSize: "sm",
                        centered: true,
                        });
                    } else {
                        this.$bvModal.msgBoxOk("Fail!", {
                        size: "sm",
                        buttonSize: "sm",
                        centered: true,
                        });
                    }
                    })
                    .catch((error) => {
                    this.$bvModal.msgBoxOk(error.message, {
                        size: "sm",
                        buttonSize: "sm",
                        centered: true,
                    });
                });
            }
        },

        inputImage() {
            const file = document.getElementById("img-input").files[0];
            this.thumbnail = URL.createObjectURL(file);
            this.thumbnailFile = file;
        },

        validateData() {
            if (this.title == "") {
                this.validateTitle = false;
            } else {
                this.validateTitle = true;
            }

            if (this.thumbnail == "") {
                this.validateThumbnail = false;
            } else {
                this.validateThumbnail = true;
            }

            if (this.content == "") {
                this.validateContent = false;
            } else {
                this.validateContent = true;
            }
        },
    },
    created() {
        getDetailBlog(this.$route.params.id).then((res) => {
            console.log(res.data)
            if (res.status == 200) {
                this.title = res.data.title;
                this.thumbnail = res.data.thumbnail;
                this.content = res.data.content;
                this.tags = res.data.tags;
            }
        })
    }
}
</script>

<style>

</style>