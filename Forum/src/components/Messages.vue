<template>
  <div>
     <v-card
      class="mx-auto"
      max-width="500"
      outlined
      id="mcard"
     >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Messages</div>
            <v-list-item-title class="headline ">MUSIC</v-list-item-title>
            <v-text-field label="Comment something"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn text>Comment</v-btn>
        </v-card-actions>
    </v-card>
    <v-card
      class="mx-auto"
      max-width="490"
      outlined
      id="mcard2"
     >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">USER #1</div>
            <div class="text--primary">
              It's awesome!.<br>
            </div>
            <v-text-field label="Comment something"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn text>Comment</v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

#mcard {
  margin-top: 5%;
}


</style>