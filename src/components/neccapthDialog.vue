<template>
    <div>
        <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" width="30%">
            <div class='neccaptch'>
                <neccaptch mode='embed' @emitHandler='emitHandler'></neccaptch>
            </div>
            <div class='dialog-btn neccaptch-btn' @click='Comfirm'>
                确定
            </div>
        </el-dialog>

    </div>
</template>

<script>
import neccaptch from "@/components/m-neccaptch";
export default {
    data() {
        return {
            dialogVisible: false,
            data: "",
            captcha: ""
        };
    },
    components: {
        neccaptch
    },
    props: ["visible"],
    watch: {
        visible: {
            handler(curVal) {
                this.dialogVisible = curVal;
            },
            deep: true
        }
    },
    computed: {},
    methods: {
        emitHandler(data) {
            this.data = data;
            this.captcha = data.validate;
        },
        Comfirm() {
            if (this.captcha) {
                this.captcha = "";
                this.dialogVisible = false;
                this.data.instance.refresh();
                this.$emit("emitHandler", this.data);
            }
        },
        handleClose(done) {
            try {
                this.data.instance.refresh();
                done();
                this.$emit("handleClose");
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {}
};
</script>

<style lang='scss' scoped>
.neccaptch {
    padding-bottom: 20px;
}
.neccaptch-btn {
    display: block;
    width: 160px;
}
</style>
