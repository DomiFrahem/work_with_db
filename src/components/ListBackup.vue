<template>
  <v-list
      nav
      dense
  >
    <v-list-group
        v-for="(file, index) in selectedFiles"
        :key="index"
        @click="selectedDatabase"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            {{ file.split(/\-(\w+)\./)[1] }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list>
        <v-list-group
            sub-group
            v-model="openedTable"
            @click="getTables(file)"
        >
          <template v-slot:activator>
            <v-img
                v-if="(listTable.length === 0 && openedTable)"
                src="@/assets/Iphone-spinner-2.gif"
                width="30px"
                height="30px"
                class="mr-2"
            />

            <v-list-item-title>tables</v-list-item-title>
          </template>
          <v-list-item-group>
            <v-list-item v-for="(name, index) in listTable" :key="index">
              <v-list-item-content>
                <v-list-item-title small v-text="name"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>

        <v-list-group
            sub-group
            v-model="openedView"
            @click="getViews(file)"
        >
          <template v-slot:activator>
            <v-img
                v-if="(listViews.length === 0 && openedView)"
                src="@/assets/Iphone-spinner-2.gif"
                width="30px"
                height="30px"
                class="mr-2"
            />
            <v-list-item-title>views</v-list-item-title>
          </template>
          <v-list-item-group v-model="selectedView">
            <v-list-item class="pt-0 pb-0"  v-for="(name, index) in listViews" :key="index">
              <v-list-item-content>
                <v-list-item-title small v-text="name"/>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>

        </v-list-group>
      </v-list>
    </v-list-group>
  </v-list>

</template>

<script>


import axios from "axios";

export default {
  name: "ListBackup",
  props: {
    selectedFiles: {
      type: Array
    },
  },
  data() {
    return {
      listTable: [],
      listViews: [],
      openedTable: false,
      openedView: false,
      selectedView: null
    }
  },
  methods: {
    getTables(data) {
      this.listTable = []
      if (!this.openedTable) {
        axios
            .get("http://127.0.0.1:5000/getTables/" + data + "/tables/")
            .then(response => {
              this.listTable = response.data
            })
            .catch(error => console.log(error))
      }
      console.log(data)
    },
    getViews(data) {
      this.listViews = []
      if (!this.openedView) {
        console.log(data)
        axios
            .get("http://127.0.0.1:5000/getTables/" + data + "/views/")
            .then(response => {
              console.log(response)
              this.listViews = response.data
            })
            .catch(error => console.log(error))
      }
    },
    selectedDatabase() {
      this.openedTable = false
      this.openedView = false
    }
  }
}
</script>

<style scoped>

</style>