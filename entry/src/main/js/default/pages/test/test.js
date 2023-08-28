export default {
    data: {
        selected: [false, false, false]
    },
    onInit() {
        this.title = "Hello World";
    },
    changeAllState() {
        var x;
        var array = [];
        for (x in this.selected) {
            array[x] = true;
        }
        this.selected = array;
        console.log(this.selected);
    }
}
