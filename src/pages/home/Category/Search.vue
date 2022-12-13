<template>
    <div>
        <Category :search="searchValue"/>
    </div>
</template>

<script>
import Category from './index.vue';
export default {
    name: 'Search',
    inject: ['emitter'],
    components: {
        Category
    },
    data() {
        return {
            searchValue: ''
        }
    },
    mounted() {
        this.emitter.on("search", (search) => {
            this.searchValue = search;
        });
    }
    
}
</script>