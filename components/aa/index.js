Component({
  mixins: [],
  data: {y:2},  // 组件内部数据
  props:{x:1},  // 可给外部传入的属性添加默认值
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onMyClick(ev){
        console.log(this.is, this.$id);
    },
  },
});
