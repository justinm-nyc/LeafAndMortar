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
      <input type="text" name="name" value="" placeholder="Name of employee" id="txt-name" v-model.trim="search.name" @input="notifyFilterUpdate"> \
    </div> \
    <div class="group"> \
      <label for="sel-title">Job Title:</label> \
      <select name="sel-title" id="sel-title" v-model="search.title" @change="notifyFilterUpdate"> \
        <option value="">- Select -</option> \
        <option v-for="title in $options.titles" :value="title.key"> \
        {{ title.display }} \
        </option> \
      </select> \
    </div> \
    <div class="group"> \
      <label><input type="checkbox" value="1" v-model="search.intern" @change="notifyFilterUpdate"> Intern</label> \
    </div> \
    <div class="group"> \
      <input type="reset" value="Result" @click="resetFilters"/> \
    </div> \
  </form>',

  methods: {
    notifyFilterUpdate: function(){
      this.$emit('filter-people', this.search);
    },
    resetFilters: function() {
      this.search = {
        name: "",
        title: "",
        intern: false
      };

      this.notifyFilterUpdate()
    }
  }
  });

  Vue.component('directory-people', {
    props: ["people"],
    template: 
    '<div class="results"> \
    <transition-group enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"> \
    <div class="person" v-for="person in people" :key="person.id"> \
    <h3> {{ person.name }}, {{ person.title }}</h3> \
    <p> \
      <img class="size-medium wp-image-14 alignright" :src="person.img" :alt="person.name" width="300" height="300"  sizes="(max-width: 300px) 100vw, 300px" /> \
      {{ person.bio }} \
    </p> \
    </div> \
    </transition-group> \
    </div>'
  });

  var Directory = new Vue({
    el: '#directory-root',
    data: {
      people: window.LMDirectory.people
    },
    methods: {
      updatePeopleList: function(params){
        this.people = window.LMDirectory.people.filter(
          function(person) {
            return (
              (!params.intern || params.intern && person.intern) &&
              (params.name === "" ||
                person.name.toLowerCase().indexOf(params.name.toLowerCase()) !==
                -1) &&
              (params.title === "" || person.title_cat === params.title)
            );
          }
        );
        
      }
    }
  });
})();
