<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="topics"
      class="elevation-1"
      :items-per-page="4"
      id="table"
    >
      <template v-slot:top>
        <v-toolbar flat color="white" class="tool">
          <v-toolbar-title>TOPICS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Topic</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.theme"
                        label="Topic Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.messages="{ item }">
        <!-- Aquí va la conexión con los messages -->
        <v-icon small color="rgba(57, 204, 20)" @click="editItem(item)">
          mdi-forum
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <v-alert v-if="success" type="success">Success</v-alert>
    <v-alert v-if="failure" type="error"
      >Failed, please check your petition!</v-alert
    >
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters["getSubjects"].length == 0) {
      this.$store.dispatch("getAllSubjects");
    } else {
      this.topics = this.$store.getters["getSubjects"];
    }
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "idSubject",
      },
      { text: "Topic", value: "theme" },
      { text: "Go to Messages", value: "messages", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    topics: [],
    editedIndex: -1,
    editedItem: {
      idSubject: "",
      theme: "",
      numMessages: 0,
    },
    defaultItem: {
      idSubject: "",
      theme: "",
      numMessages: 0,
    },
    success: false,
    failure: false,
  }),
  created() {
    this.initialize();
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setSubjects") {
        this.topics = this.$store.getters["getSubjects"];
        console.log(this.topics);
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setFlagSubjectEdit") {
        if (this.$store.getters["getFlagSubjectEdit"] == true) {
          this.success = true;
          this.failure = false;
          this.$store.dispatch("getAllSubjects");
        } else {
          this.success = false;
          this.failure = true;
        }
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setFlagSubjectCreation") {
        if (this.$store.getters["getFlagSubjectCreation"] == true) {
          this.success = true;
          this.failure = false;
          this.$store.dispatch("getAllSubjects");
        } else {
          this.success = false;
          this.failure = true;
        }
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setFlagSubjectDelete") {
        if (this.$store.getters["getFlagSubjectDelete"] == true) {
          this.success = true;
          this.failure = false;
          this.$store.dispatch("getAllSubjects");
        } else {
          this.success = false;
          this.failure = true;
        }
      }
    });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Topic" : "Edit Topic";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.topics.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      var payload = {
        idSubject: this.editedItem.idSubject,
        theme: this.editedItem.theme,
        numMessages: this.editedItem.numMessages,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteSubject", payload);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.topics[this.editedIndex], this.editedItem);
        this.failure = false;
        this.success = false;
        let payload = {
          idSubject: this.editedItem.idSubject,
          theme: this.editedItem.theme,
          numMessages: this.editedItem.numMessages,
        };
        if (payload.idSubject != "") {
          this.$store.dispatch("editSubject", payload);
        } else {
          this.failure = true;
        }
      } else {
        this.failure = false;
        this.success = false;
        let payload = {
          idSubject: this.topics.length,
          theme: this.editedItem.theme,
          numMessages: this.editedItem.numMessages,
        };
        if(payload.theme!=''){
          this.$store.dispatch("registerSubject", payload);
        }
        else{
          this.failure = true;
        }
      }
      this.close();
    },
  },
};
</script>

<style>
#table {
  margin-top: 8.5%;
  padding: 3%;
  margin-left: 19%;
  height: 420px;
  width: 60%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

.tool {
  border-radius: 10px;
}
</style>
