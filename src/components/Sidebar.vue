<template>
  <div :class="['sidebar', { 'is-closed': !isOpen, 'is-closed-mobile': !isOpen && isMobile }]">
    <div v-if="isOpen" class="sidebar-content">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(category, menu) in sidebarCategories"
          :elevation="0"
          :expand-icon="category.length === 1 ? `${category[0].icon}` : '$expand'"
          :collapse-icon="category.length === 1 ? `${category[0].icon}` : '$collapse'"
          :static="false"
          :key="menu"
          :title="menu"
          :readonly="category.length === 1"
          @click="handleClick(category)"
          style="cursor: pointer"
        >
          <v-expansion-panel-text
            v-if="category.length > 1"
            class="custom-expansion-panel"
            style="padding: 0 !important"
          >
            <v-list lines="one">
              <v-list-item
                v-for="type in category"
                :key="type.id"
                :title="type.title"
                style="cursor: pointer"
                @click="$router.push(`/game/${type.value}`)"
              >
                <template v-if="!isMobile" v-slot:prepend>
                  <v-icon>{{ type.icon }}</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="!isMobile">
      <v-list lines="one">
        <template v-for="(games, category) in sidebarCategories">
          <v-list-item-group :key="category" v-if="category === 'Cassino'">
            <v-list-item v-for="game in games" :key="game.id">
              <template v-slot:prepend>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      rounded="sm"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      style="background-color: #111415; cursor: pointer"
                      @click="$router.push(`/game/${game.value}`)"
                    >
                      <v-icon style="color: #b5b3b1">{{ game.icon }}</v-icon>
                    </v-btn>
                  </template>
                </v-tooltip>
              </template>
            </v-list-item>
          </v-list-item-group>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['sidebarCategories', 'isOpen'],
  methods: {
    handleClick(category) {
      if (category.length === 1) {
        this.$router.push(`/game/${category[0].value}`);
      }
    },
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  transition: width 0.3s;
  z-index: 1000;
  position: relative;
  left: 0;
  height: 100%;
  border-right: 1px solid rgb(57 57 57);
  background-color: rgb(33, 33, 33);
}
.is-closed {
  width: 50px;
  overflow: hidden !important;
}
.is-closed-mobile {
  width: 0;
}
.custom-expansion-panel {
  padding: 0 !important;
}
.v-list {
  padding: 0 !important;
}
.v-list-item {
  padding: 0 !important;
}
</style>
