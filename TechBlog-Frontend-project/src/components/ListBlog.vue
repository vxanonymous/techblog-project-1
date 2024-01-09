<template>
  <div class="mt-5 mb-5 d-flex justify-content-between" id="list-blog-container">
    <div style="border-right: 1px solid gray;" class="pr-4">
      <article class="" v-for="blog, key in list_blog" :key="key">
        <div>
          <img
            class="shadow p-3 mb-5 bg-white rounded"
            style="width: 100%; max-height: 500px; border-radius: 20px"
            :src="blog.thumbnail"
            alt=""
          />
        </div>
        <div>
          <a id="title-blog" :href="'#/blog/' + blog._id">{{ blog.title }}</a>
        </div>
        <div class="ml-3 mb-4 d-flex justify-content-start align-items-center">
          <i style="opacity: 0.5" class="mr-5"><small>{{ blog.date.substring(0,10) }}</small></i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-file-earmark-person"
            viewBox="0 0 16 16">
            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
          </svg>
          <span style="font-weight: 700" class="ml-2">{{ blog.author.username }}</span>
        </div>
        <div>
          <div style="text-indent: 2%;">
            <div>{{handleShortIntro(blog.content)}}...<a :href="'#/blog/' + blog._id" class="read_more ml-2">Read more</a></div>
          </div>
        </div>
        <hr style="margin-bottom: 0" class="mb-5" />
      </article>
      <div v-if="list_blog.length == 0" class="mt-5" style=" font-weight: 700; font-style: italic;">No blogs to load!</div>
      <div class="d-flex w-100 justify-content-center">
        <b-pagination v-model="currentPage" pills :total-rows="totalPage" :per-page="perPage" aria-controls="list_blog"></b-pagination>
      </div>
    </div>
    <div style="position: relative; overflow: visible; box-sizing: border-box; min-height: 1px; max-width: 30%; min-width: 20%;" class="ml-4">
      <h6 style="border-bottom: 1px solid #cbccc6;" class="pb-2 mb-4">Recent posts</h6>
      <div>
        <div v-for="(recentBlog, key) in recentBlogs" :key="key" class="mb-3">
            <svg v-if="key == 0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
            </svg>
            <svg v-if="key == 1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-2-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z"/>
            </svg>
            <svg v-if="key == 2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-3-circle" viewBox="0 0 16 16">
                <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z"/>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"/>
            </svg>
            <svg v-if="key == 3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-4-circle" viewBox="0 0 16 16">
                <path d="M7.519 5.057c.22-.352.439-.703.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265ZM6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z"/>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z"/>
            </svg>
            <svg v-if="key == 4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-5-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm15 0A8 8 0 1 0 0 8a8 8 0 0 0 16 0Zm-8.006 4.158c-1.57 0-2.654-.902-2.719-2.115h1.237c.14.72.832 1.031 1.529 1.031.791 0 1.57-.597 1.57-1.681 0-.967-.732-1.57-1.582-1.57-.767 0-1.242.45-1.435.808H5.445L5.791 4h4.705v1.103H6.875l-.193 2.343h.064c.17-.258.715-.68 1.611-.68 1.383 0 2.561.944 2.561 2.585 0 1.687-1.184 2.806-2.924 2.806Z"/>
            </svg>
            <a :href="'#/blog/' + recentBlog._id" style="text-decoration: none;" class="recent-blogs ml-2">{{recentBlog.title}}</a>
            <br>
        </div>
      </div>
      <br>
      <h6 style="border-bottom: 1px solid #cbccc6;" class="pb-2 mb-4">#Tags</h6>
      <div>
        <b-button v-for="(tag, key) in tags" :key="key" variant="outline-dark" size="sm" class="mr-2">{{ tag }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentBlogs } from "../services/services";
import { getTags } from "../services/services";

export default {
  name: "ListBlog",
  data() {
    return {
      recentBlogs: [],
      currentPage: 1,
      perPage: 10,
      tags: []
    };
  },
  props: {
    list_blog: Array,
    totalPage: Number
  },
  created() {
    getRecentBlogs().then((res) => {
        if (res.status == 200) {
            this.recentBlogs = res.data;
        }
    });

    getTags().then((res) => {
      if (res.status == 200) {
        this.tags = res.data
      }
    })
  },
  methods: {
    handleShortIntro(str) {
        const tag = document.createElement('div');
        tag.innerHTML = str;
        return tag.textContent.substring(0, 400);
    },

    getBlogs(page) {
      this.$emit('getBlogsByPage', page - 1)
    }
  },
  watch: {
    currentPage: function() {
      this.getBlogs(this.currentPage)
    }
  }
};
</script>

<style>
#list-blog-container {
    width: 90%;
    margin: auto
}

#title-blog {
  color: black;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  width: 100%;
}

#title-blog:hover {
  color: #00bbff;
}

.read_more {
    color: #00bbff;
    text-decoration: none;
    font-weight: 600;
}
.read_more:hover {
    color: #00bbff;
    text-decoration: none;
}

.recent-blogs {
    color: black;
    font-weight: 600;
}

.recent-blogs:hover {
    color: #00bbff;
}

.vspButton {
		height: 22px;
		padding: 2px 7px;
		font-size: 12px;
		display: inline-block;
		margin-bottom: 0;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-image: none;
		border: 1px solid;
		border-radius: 4px;
		background-color: transparent;
	}
	.vspButton-selected{
		background-color: #31b0d5;
	}
</style>