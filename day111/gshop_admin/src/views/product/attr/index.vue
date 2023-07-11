<template>
    <div>
        <el-card shadow="hover">

            <CategorySelector></CategorySelector>
        </el-card>
        <el-card shadow="hover" style="margin-top:10px">
            <div v-if="isShowEditAttr">
                <!-- 按钮 -->
                <el-button type="primary" :icon="Plus" @click="addAttrShow">添加属性</el-button>
                <!-- 表格 -->
                <el-table v-loading="loading" :data="attrList" stripe border style="width: 100%">
                    <el-table-column type="index" label="序号" width="80" align="center" />
                    <el-table-column prop="attrName" label="属性名称" width="150" />
                    <el-table-column prop="attrValueList" label="属性值列表">
                        <template #default="{ row, $index }">
                            <el-tag type="success" v-for="(item, index) in row.attrValueList" :key="index">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="150">
                        <template #default="{ row, $index }">
                            <el-button size="small" type="primary" :icon="Edit" @click="updateAttrShow(row)"></el-button>
                            <el-button size="small" type="danger" :icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-else>
                <!-- 添加或者修改平台属性值的界面 -->
                <el-form inline>
                    <el-form-item label="属性名">
                        <el-input type="text" placeholder="请输入属性名字" v-model="attr.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 两个按钮 -->
                <div style="margin-bottom: 20px;">
                    <el-button :icon="Plus" type="primary" :disabled="!attr.attrName"
                        @click="addAttrValue">添加属性值</el-button>

                    <el-button @click="isShowEditAttr = true">取消</el-button>
                </div>
                <!-- 表格 -->
                <el-table :data="attr.attrValueList" stripe border style="width: 100%">
                    <el-table-column type="index" label="序号" width="80" align="center" />

                    <el-table-column prop="valueName" label="属性名称">
                        <template #default="{ row, $index }">
                            <el-input :ref="(input: any) => inputRef[$index] = input" size="small" type="text"
                                v-if="row.isShowEdit" @blur="attrSpanShow(row, $index)" v-model="row.valueName"></el-input>
                            <span v-else style="display:inline-block;width: 100%;" @click="attrInputShow(row, $index)">{{
                                row.valueName }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template #default="{ row, $index }">
                            <!-- 气泡确认框组件 -->
                            <el-popconfirm :title='`您确认要删除${row.valueName}吗`'
                                @confirm="attr.attrValueList.splice($index, 1)">
                                <template #reference>
                                    <el-button type="danger" :icon="Delete" size="small"></el-button>
                                </template>
                            </el-popconfirm>

                        </template>

                    </el-table-column>
                </el-table>

                <!-- 两个按钮 -->
                <div style="margin-top: 20px;">
                    <el-button type="primary" @click="save"
                        :disabled="!attr.attrName || !attr.attrValueList.length">保存</el-button>
                    <el-button @click="isShowEditAttr = true">取消</el-button>

                </div>


                <!-- <el-table-column label="操作" width="150">
                        <template #default="{ row, $index }">
                            <el-button size="small" type="primary" :icon="Edit" @click="updateAttrShow(row)"></el-button>
                            <el-button size="small" type="danger" :icon="Delete"></el-button>
                        </template>
                    </el-table-column> -->

            </div>

        </el-card>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Attr'
}
</script>
<script lang="ts" setup>
// 引入分类组件
import CategorySelector from '@/components/CategorySelector/index.vue'
// 引入图标相关组件
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

// 引入接口
import { getAttrInfoListApi, addOrUpdateAttrInfoApi } from '@/api/product/attr'

// 
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import type { AttrInfoListModel, AttrInfoModel, AttrValueModel } from '@/api/product/model/attrModel'
import { useCategoryStore } from '@/stores/category'
// 引入lodash
import cloneDeep from 'lodash/cloneDeep'
import { ElMessage } from 'element-plus'
// 获取分类信息的仓库对象
const categoryStore = useCategoryStore()
// 定义加载的效果标识
const loading = ref<boolean>(false)
// 用来存储平台属性对象数组列表
const attrList = ref<AttrInfoListModel>([])

// 定义一个方法用来获取平台属性列表数据
const getAttrList = async () => {

    attrList.value = await getAttrInfoListApi({
        category1Id: categoryStore.category1Id,
        category2Id: categoryStore.category2Id,
        category3Id: categoryStore.category3Id
    })
}

// 监视
watch(() => categoryStore.category3Id, async (category3Id) => {
    // 判断三级分类的数据是否有意义
    if (!category3Id) {
        // 如果没有数据，干掉平台属性数组列表数据
        attrList.value = []
        // 后面的代码不执行
        return
    }
    // 调用接口，发送请求，获取平台属性数组列表数据
    getAttrList()
}, { immediate: true })

// 定义一个标识用来控制平台属性数组列表的显示和隐藏
const isShowEditAttr = ref<boolean>(true)
// 定义一个平台属性对象数据，用来做添加或者修改平台属性的时候存储对应的对象数据
const attr = reactive<AttrInfoModel>({
    id: undefined,
    attrName: '',
    categoryId: -1,//平台属性对应的分类的id
    categoryLevel: 3,//对应的分类的级别
    attrValueList: [],//平台属性只对象数组
})
// 添加属性修改按钮的点击事件对应的回调函数
const addAttrShow = () => {
    Object.assign(attr, {
        id: undefined,
        attrName: '',
        categoryId: categoryStore.category3Id,//平台属性对应的分类的id
        categoryLevel: 3,//对应的分类的级别
        attrValueList: [],//平台属性只对象数组
    })
    isShowEditAttr.value = false
}
// 修改属性按钮的点击事件对应的回调函数
const updateAttrShow = (row: AttrInfoModel) => {
    //    把要修改的平台属性对象拷贝到attr这个空的平台属性对象中

    Object.assign(attr, cloneDeep(row)) //深拷贝
    isShowEditAttr.value = false
}
// 用来收集文本框的对象的
const inputRef = ref<HTMLInputElement[]>([])
// 文本框失去焦点事件的回调函数---查看模式
const attrSpanShow = (row: AttrValueModel, index: number) => {
    //    判断文本框中的数据是否存在 --- 平台属性只对象中的属性值名字是否存在
    if (!row.valueName) {
        attr.attrValueList.splice(index, 1)
    }

    row.isShowEdit = false
}
// span标签点击事件的回调函数 --- 编辑模式
const attrInputShow = (row: AttrValueModel, index: number) => {
    row.isShowEdit = true
    // 设置当前出现的文本框自动的获取焦点
    nextTick(() => {
        inputRef.value[index].focus()
    })
}

// 添加属性值按钮的点击事件对应的回调函数
const addAttrValue = () => {
    // 为数组添加一个对象数据
    attr.attrValueList.push({
        attrId: attr.id as number,
        valueName: '',
        isShowEdit: true,
    })
    nextTick(() => {
        // 设置文本框自动的获取焦点
        inputRef.value[attr.attrValueList.length - 1].focus()
    })
}

// 点击保存按钮的点击事件对应的回调函数
const save = async () => {
    // 重新的更新一下三级分类的id
    attr.categoryId = categoryStore.getCategory3Id as number

    // 判断平台属性名字是否有值
    if (attr.attrName.length === 0) {
        // 提示用户
        ElMessage.warning('平台属性名字不能为空')
        return
    }
    // 判断平台属性值是否有值  
    // 平台属性值对象数组中的数据的过滤操作
    attr.attrValueList = attr.attrValueList.filter(item => {
        if (!item.valueName) return false
        // 删除一个属性
        delete item.isShowEdit // 做编辑和切换的一个标识
        return true
    })
    try {
        await addOrUpdateAttrInfoApi(attr) //调用接口
        ElMessage.success('操作成功') //提示信息
        isShowEditAttr.value = true //关闭当前界面
        getAttrList() // 刷新
    } catch (error: any) {
        ElMessage.error(error.message || '操作失败') //提示信息        
    }
}




</script>
<style scoped></style>