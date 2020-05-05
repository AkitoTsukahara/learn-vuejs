new Vue({
    el: '#app',
    data: {
        items: null,
        keyword: '',
        message: ''
    },
    mounted: function(){
        axios.get('https://qiita.com/api/v2/items')
            .then(function(response){
                this.bpi = response.data.bpi
            }.bind(this))
            .catch(function (error) {
                this.hasError = true
            }.bind(this))
            .finally(function (){
                this.loading = false
            }.bind(this))
    },
    watch: {
        keyword: function(newKeyword, oldKeyword){
            //console.log(newKeyword)
            this.message = 'Waiting for you ti stop typing...'
            this.debouncedGetAnswer()
        }
    },
    created: function(){
        // this.keyword = 'JavaScript'
        // this.getAnswer(this.keyword)
        this.debouncedGetAnswer = _.debounce(this.getAnswer,1000)
    },
    methods: {
        getAnswer: function(){
            if(this.keyword ===""){
                this.items = null
                this.message = ''
                return
            }

            this.message = 'Loading ...'
            var vm = this
            var params = { page: 1, per_page: 20, query: this.keyword }
            axios.get('https://qiita.com/api/v2/items', {params})
                .then(function(response){
                    vm.items = response.data

                })
                .catch(function (error) {
                    vm.message = 'Error:'+error
                })
                .finally(function(){
                    vm.message = ''
                })
        }
    }
})