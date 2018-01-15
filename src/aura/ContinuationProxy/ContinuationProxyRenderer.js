({
  /*
  render: function (component, hlpr) {
    var ret = this.superRender();
    return ret;
    
  },
  rerender: function (cmp, hlpr) {},
  */
  afterRender: function (component, hlpr) {
    this.superAfterRender();
    console.log("=====> " + component.find("vfFrame"));
	console.log("=====> " + component.find("vfFrame").getElement());
	console.log("=====> " + component.find("vfFrame").getElement().contentWindow);  
  }
  
})