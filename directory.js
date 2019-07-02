(function() {
  "use strict";

  Vue.component('directory-filters', {
    template: '<form action="" id="directory-filters"><p>Insert filters here</p></form>'
  });

  Vue.component('directory-people', {
    template: '<p>Insert people here</p>'
  });

  var Directory = new Vue({
    el: '#directory-root',
    data: {
      people: window.LMDirectory.people
    }
  });
})();
