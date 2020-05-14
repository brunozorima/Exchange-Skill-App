 <!-- <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
            <button v-on:click="submitFile()">Submit</button>
        </div> -->
    </div>
</template>
<script>
import  { mapState } from 'vuex';

    export default {
        data() {
            return {
                file: null
            }
        },
        computed: {
            ...mapState(['account'])
        }, 
        methods:{
            handleFileUpload(){
                this.file = event.target.files[0];
            },
            submitFile(){
                let formData = new FormData();
                formData.append('file', this.file);
                //backend handling to be implemented
                alert("To be implemented")
            }
        }
    }
</script>