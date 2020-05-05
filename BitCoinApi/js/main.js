new Vue({
    el: '#app',
    data: {
        newItem: '',
        todos: [],
    },
    methods: {
        addItem: function(event){
            // alert();

            //未入力判定
            if(this.newItem == '') return

            let todo = {
                item: this.newItem,
                isDone: false
            };

            this.todos.push(todo)

            //入力内容をリセット
            this.newItem = ''
        },
        deleteItem: function(index){
            this.todos.splice(index,1)
        }
    }
})