<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Header></Header>
            <Main :todos="todos"></Main>
            <Footer :todos="todos"></Footer>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default {
    name: "App",
    components: {
        Header,
        Main,
        Footer,
    },
    data() {
        return {
            todos: [
                { id: 10001, content: "抽烟", isSel: true },
                { id: 10002, content: "喝酒", isSel: true },
                { id: 10003, content: "烫头", isSel: true },
            ],
        };
    },
};
</script>

<style scoped>
/*app*/
.todo-container {
    width: 600px;
    margin: 0 auto;
}
.todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>