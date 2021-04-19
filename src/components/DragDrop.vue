<template>
<tbody>
    <div class="drop display-inline align-center" @dragover.prevent @drop="onDrop">
        <label v-if="!image" 
        :class="[isDrag ? 'classDrug' : '', 'btn' , 'display-inline']" 
        @dragenter="isDrag = true"
        @dragleave="isDrag = false">
            Перетащите или загрузите аватар
            <input type="file" name="image" class="panel" @change="onChange">
        </label>
    </div>
</tbody>
</template>
   	
<script>
export default {
    data(){
      return{
        image: '',
        isDrag:false
      }
    },
    methods: {
        onDrop: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var files = e.dataTransfer.files;
            this.createFile(files[0]);
        },
        onChange(e) {
            var files = e.target.files;
            this.createFile(files[0]);
        },
        createFile(file) {
            if (!file.type.match('image.*')) {
                alert('Select an image');
                this.isDrag = false
                return;
            }
            var reader = new FileReader();
            var vm = this;

            reader.onload = function(e) {
                vm.image = e.target.result;
            }

            this.$emit('upload_avatar',file)      
        },
        removeFile() {
            this.image = '';
        }
    }
}
</script>

<style scoped>

*{
    font-size: 16px;
}

.btn {
    height: 100%;
    width: 100%;
    background-color: #d3394c;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-weight: bold;
    padding: 10px;
    position: relative;
    transition: 0.5s;
}

.btn:hover {
    background-color: #722040;
}

input[type="file"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
}

.align-center {
    text-align: center;
}

.display-inline {
    display: inline-block;
    vertical-align: middle;
    border-radius: 5px;
}

.img{
    border: 1px solid #f6f6f6;
    display: inline-block;
    height: auto;
    max-height: 80%;
    max-width: 80%;
    width: auto;
}

.drop{
    margin-top: 15px;
    background-color: #f2f2f2;
    height: 100%;
    width: 100%;
}

.drop{
    background-color: #080808;
}

.classDrug{
    background-color: #722040;
}

</style>