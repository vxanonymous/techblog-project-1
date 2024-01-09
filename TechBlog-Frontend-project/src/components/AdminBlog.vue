<template>
  <div>
    <HeaderVue />
    <div class="container mt-4 mb-4">
        <b-table hover :fields="fields" :items="items" bordered responsive="sm" primary-key="Content" style="min-height: 100vh;">
            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template #cell(Content)="data">
                <a :href="`#/blog/${data.value}`" target="_blank">Click to read</a>
            </template>
            <template #cell(action)="data">
                <b-button class="bg-success mr-1" @click="approveBlog(data.item.Content)">Approve</b-button>
                <b-button class="bg-secondary mr-1" @click="rejectBlog(data.item.Content)">Reject</b-button>
                <b-button class="bg-danger" @click="removeBlog(data.item.Content)">Delete</b-button>
            </template>
        </b-table>
    </div>
    <FooterVue/>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import FooterVue from './Footer.vue';
import { getAllBlogs, updateBlog, deleteBlog } from '@/services/services';

export default {
    name: "AdminBlog",
    components: {HeaderVue, FooterVue},
    data() {
        return {
            sortBy: 'Status',
            sortDesc: false,
            fields: [
                'index',
                {
                    key: "Title",
                    label: "Title",
                    sortable: false
                },
                {
                    key: "Content",
                    label: "Content",
                    sortable: false
                },
                {
                    key: "Author",
                    lable: "Author",
                    sortable: true
                },
                {
                    key: "Created At",
                    label: "Created At",
                    sortable: true
                },
                {
                    key: "Status",
                    label: "Status",
                    sortable: true
                },
                'action'
            ],

            items: []
        }
    },
    created() {
        getAllBlogs().then((res) => {
            const tmp = res.data;
            this.items = Array.from(tmp).map(item => {
                return {
                    Title: item.title,
                    Content: item._id,
                    Author: item.author.username,
                    "Created At": item.date.substring(0, 10),
                    Status: item.status,
                    _cellVariants: (item.status === 'PUBLISHED') ? { Status: 'success' } : { Status: 'secondary' }
                }
            });
        });
    },
    methods: {
        approveBlog(id) {
            updateBlog(id, {status: "PUBLISHED"}).then((res) => {
                if (res.status == 200 && res.data.acknowledged == true) {
                    this.items.filter(x => x.Content == id).map(y => {
                        y.Status = "PUBLISHED";
                        y._cellVariants = { Status: 'success' };
                    })
                }
            });
        },

        rejectBlog(id) {
            updateBlog(id, {status: "PENDING"}).then((res) => {
                if (res.status == 200 && res.data.acknowledged == true) {
                    this.items.filter(x => x.Content == id).map(y => {
                        y.Status = "PENDING";
                        y._cellVariants = { Status: 'secondary' };
                    })
                }
            });
        },

        removeBlog(id) {
            deleteBlog(id).then((res) => {
                if(res.status == 200 && res.data.acknowledged == true) {
                    this.items = this.items.filter(x => x.Content != id);
                }
            })
        }
    }
}
</script>

<style>

</style>