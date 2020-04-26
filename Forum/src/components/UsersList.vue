<template>
  <v-card class="content">
    <v-card-title>
      Users List
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit User</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="18" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="18" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.lastName"
                    label="Last Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="18" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.email"
                    label="Email"
                  ></v-text-field>
                </v-col>
                <v-col cols="18" sm="12" md="6">
                  <v-text-field
                    v-model="editedItem.password"
                    label="Password"
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
    </v-card-title>
    <v-data-table
      :items-per-page="4"
      :headers="headers"
      :items="users"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-alert v-if="success" type="success">Success</v-alert>
    <v-alert v-if="failure" type="error"
      >Failed, please check your petition!</v-alert
    >
  </v-card>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters["getUsers"].length == 0) {
      this.$store.dispatch("getAllUsers");
    } else {
      this.users = this.$store.getters["getUsers"];
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  data() {
    return {
      dialog: false,
      search: "",
      editedIndex: -1,
      editedItem: {
        id: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        numMessages: 0,
        active: false,
      },
      defaultItem: {
        id: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        numMessages: 0,
        active: false,
      },
      headers: [
        {
          text: "Usuario ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Last Name", value: "lastName" },
        { text: "E-mail", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      success: false,
      failure: false,
    };
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setUsers") {
        this.users = this.$store.getters["getUsers"];
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setFlagUserEdit") {
        if (this.$store.getters["getFlagUserEdit"] == true) {
          this.success = true;
          this.failure = false;
          this.$store.dispatch("getAllUsers");
        } else {
          this.success = false;
          this.failure = true;
        }
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === "setFlagUserDelete") {
        if (this.$store.getters["getFlagUserDelete"] == true) {
          this.success = true;
          this.failure = false;
          this.$store.dispatch("getAllUsers");
        } else {
          this.success = false;
          this.failure = true;
        }
      }
    });
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.password = "";
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    deleteItem(item) {
      // const index = this.users.indexOf(item)
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      var payload = {
        id: this.editedItem.id,
        name: this.editedItem.name,
        lastName: this.editedItem.lastName,
        email: this.editedItem.email,
        password: this.editedItem.password,
        numMessages: this.editedItem.numMessages,
        active: this.editedItem.active,
      };
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteUser", payload);
    },
    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.users[this.editedIndex], this.editedItem)
      // } else {
      //   this.users.push(this.editedItem)
      // }
      this.failure = false;
      this.success = false;
      var payload = {
        id: this.editedItem.id,
        name: this.editedItem.name,
        lastName: this.editedItem.lastName,
        email: this.editedItem.email,
        password: this.editedItem.password,
        numMessages: this.editedItem.numMessages,
        active: this.editedItem.active,
      };
      if (
        payload.id != "" &&
        payload.name != "" &&
        payload.lastName != "" &&
        payload.email != "" &&
        payload.password != ""
      ) {
        this.$store.dispatch("editUser", payload);
      } else {
        this.failure = true;
      }
      this.close();
    },
  },
};
</script>

<style>
.content {
  margin-top: 8.5%;
  padding: 3%;
  margin-left: 19%;
  height: 420px;
  width: 60%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}
.v-data-footer__select {
  display: none;
}
</style>
