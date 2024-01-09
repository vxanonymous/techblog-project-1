<template>
  <div>
    <HeaderVue />
    <div class="container mt-4 mb-4" style="min-height: 100vh;">
        <b-table hover :fields="fields" :items="items" bordered responsive="sm" primary-key="Content">
            <template #cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template #cell(Content)="data">
                <a :href="`#/blog/${data.value}`" target="_blank">Click to read</a>
            </template>
            <template #cell(action)="data">
                <b-button class="bg-warning mr-1" @click="editBlog(data.item.Content)">Edit</b-button>
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
import { getBlogsByUserId } from '@/services/services';
import jwt_decode from "jwt-decode";
import { deleteBlog } from '@/services/services';

export default {
    name: "BlogManagement",
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
        getBlogsByUserId(jwt_decode(localStorage.getItem('token')).id).then((res) => {
            const tmp = res.data;
            this.items = Array.from(tmp).map(item => {
                return {
                    Title: item.title,
                    Content: item._id,
                    Author: item.author.username,
                    "Created At": item.date.substring(0, 10),
                    Status: item.status,
                    _cellVariants: (item.status === 'PUBLISHED') ? { Status: 'success' } : { Status: 'info' }
                }
            });
        });
    },
    methods: {
        editBlog(id) {
            let reouterEdit = this.$router.resolve({path: '/blog/edit/' + id});
            window.open(reouterEdit.href, '_blank');
        },

        removeBlog(id) {
            deleteBlog(id).then((res) => {
                if(res.status == 200 && res.data.acknowledged == true) {
                    this.items = this.items.filter(x => x.Content != id);
                }
            });
        }
    }
}
</script>

<style>

</style>