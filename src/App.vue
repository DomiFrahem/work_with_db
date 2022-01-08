<template>
  <v-app>
    <v-main>
      <v-navigation-drawer width="300px" permanent>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Календарь бэкапов
              </v-list-item-title>
              <vc-calendar
                  is-expanded
                  :attributes="attributes"
                  @dayclick="getDate"
                  return_key
              ></vc-calendar>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider/>
        <ListBackup
          :selectedFiles="selectedFiles"
        />
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>



import axios from "axios";
import ListBackup from "@/components/ListBackup";

export default {
  name: 'App',

  components: {
    ListBackup
  },

  data: () => ({
    listDate: JSON,
    attributes: [],
    date: new Date(),
    selectedFiles: [],
  }),

  mounted() {
    axios
        .get("http://127.0.0.1:5000/get_date_exists_backup")
        .then(response => {
          const json = response.data
          this.listDate = json
          this.attributes = Object.keys(json).map(element => {
            return {
              'key': element,
              'bar': true,
              dates: new Date(json[element].year + 0, json[element].month - 1, json[element].day + 0)
            }
          })
        }).catch(error => console.log(error))
  },
  methods: {
    getDate(data) {
      const key = data.attributes[0].key
      this.selectedFiles = this.listDate[key].files
      console.log(this.listDate[key].files)
    },
    selectedBackup(data, item){
      axios
        .get("http://127.0.0.1:5000/getTables/"+data+"/"+item)
        .then(response => {
          console.log(response)
          this.listTable = response.data
        })
        .catch(error => console.log(error))
      console.log(data, item)
    }
  }
};
</script>
