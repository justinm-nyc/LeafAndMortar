(function() {
  "use strict";

  Vue.component('directory-filters', {
    data: function(){
      return {
        search: {
          name: '',
          title: '',
          intern: false
        }
      }
    },
    titles: window.LMDirectory.titles,
    template: '<form action="" id="directory-filters"> \
    <div class="group"> \
      <label for="txt-name">Name:</label> \
      <input type="text" name="name" value="" placeholder="Name of employee" id="txt-name" v-model.trim="search.name"> \
    </div> \
    <div class="group"> \
      <label for="sel-title">Job Title:</label> \
      <select name="sel-title" id="sel-title" v-model="search.title"> \
        <option value="">- Select -</option> \
        <option v-for="title in $options.titles" :value="title.key"> \
        {{ title.display }} \
        </option> \
      </select> \
    </div> \
    <div class="group"> \
      <label><input type="checkbox" value="1" v-model="search.intern"> Intern</label> \
    </div> \
  </form>'
  });

  Vue.component('directory-people', {
    props: ["people"],
    template: '<div class="results"> \
    <div class="person" v-for="person in people"> \
    <h3> {{ person.name }}, {{ person.title }}</h3> \
    <p> \
      <img class="size-medium wp-image-14 alignright" :src="person.img" :alt="person.name" width="300" height="300"  sizes="(max-width: 300px) 100vw, 300px" /> \
      {{ person.bio }} \
    </p> \
    </div> \
    </div>'
  });

  var Directory = new Vue({
    el: '#directory-root',
    data: {
      people: window.LMDirectory.people
    }
  });
})();
