<template>
    <ul class="l_tree" >
        <li class="l_tree_branch" v-for="(item,index) in model" :key="item.Id">
            <div class="l_tree_click">
                <button type="button" class="l_tree_children_btn" v-if="item.children"  @click="toggle(item)">{{ !item.show ? '-' : '+' }}</button>
                <span class="l_folder" v-if="item.children"><img :src="!item.show ? openIcon : closeIcon" alt="">{{ item.displayName }}</span>
                <span class="l_folder" v-if="!item.children"  @click="toParent(item.displayId)" ><img :src="fileIcon" alt="">{{ item.displayName }}</span>
            </div>
            <ew-tree v-show="!item.show" v-if="item.children" :model="item.children"></ew-tree>
        </li>
    </ul>

</template>

<script>
    import openIcon from '../assets/images/AR/openIcon.png'
    import closeIcon from '../assets/images/AR/closeIcon.png'
    import fileIcon from '../assets/images/AR/fileIcon.png'
    export default {
        name:'ew-tree',
        data(){
            return{
                openIcon,
                closeIcon,
                fileIcon,
            }
        },
        props: {
            model: { }
        },
        methods: {
            toggle(item){
                var idx = this.model.indexOf(item)
                this.$set(this.model[idx], 'show', !item.show)
            },
            toParent(id){
                console.log(id,'sssssssssss');
               this.eventbus.$emit('nodeId',id)

            },
        }
    }
</script>

<style scoped>
    .l_tree {
        /*width: calc(100% - 44px);*/
        height: 100%;
        padding-left:10px;
    }
    .l_tree_branch {
        width: 100%;
        height: 100%;
        display: block;
        padding: 6px 10px;
        position: relative;
    }
    .l_tree_branch .l_tree_click{
        cursor:pointer;
    }
    .l_tree_branch .l_tree_children_btn {
        width: 16px;
        height: 16px;
        background-color: unset;
        border:1px solid #1EE4EF;
        font-size: 16px;
        font-weight:normal;
        color: #1EE4EF;
        display: flex;
        justify-content: center;
        line-height:12px;
        float:left;
        outline: none;
        cursor: pointer;
    }
    .l_folder{
        padding-left:5px;
        color:#16ECF0;
    }
    .l_folder img{
        margin:-5px 5px 0px 5px;
    }

    ul.l_tree:before {
        content: '';
        border-left: 1px dashed #1EE4EF;
        height: calc(100%);
        position: absolute;
        left: 10px;
        top: 0px;
    }

    .l_tree .l_tree_branch:last-child::before {
        content: '';
        width: 3px;
        height: calc(100% - 16px);
        display: block;
        background-color: #09254C;
        position: absolute;
        bottom: 0;
        left: 0px;
    }

    .l_tree,
    .l_tree_branch {
        position: relative;
    }

    .l_tree_branch::after {
        content: '';
        width: 8px;
        height: 0;
        border-bottom: 1px dashed #1EE4EF;
        position: absolute;
        right: calc(100% - 9px);
        top: 15px;
    }

    .l_tree_container>.l_tree::before,
    .l_tree_container>.l_tree>.l_tree_branch::after {
        display: none;
    }
</style>
