<template>
    <iframe :src="src" frameborder="0" style="width: 100%; height: 100%;">
    </iframe>
</template>

<script>
    export default {
        name: 'Index',
        data: function () {
            return {
                src: jekyll_data.homeSrc,
            }
        }
    }
</script>