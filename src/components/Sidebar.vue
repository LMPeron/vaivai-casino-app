<template>
  <div :class="['sidebar', { 'is-closed': !isOpen }]">
    <div v-if="isOpen" class="sidebar-content">
      <v-expansion-panels elevation="0">
        <v-expansion-panel
          v-for="(games, category) in sidebarCategories"
          :key="category"
          style="cursor: pointer"
        >
          <template v-slot:title>
            {{ category }}
          </template>
          <template v-slot:default>
            <v-list lines="one">
              <v-list-item
                v-for="game in games"
                :key="game.id"
                :title="game.title"
                style="cursor: pointer"
                @click="$router.push(`/${game.value}`)"
              >
                <template v-slot:prepend>
                  <v-icon>{{ game.icon }}</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
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
                      @click="$router.push(`/${game.value}`)"
                    >
                      <v-icon style="color: #b5b3b1">{{ game.icon }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ game.title }}</span>
                </v-tooltip>
              </template>
              <v-list-item-content>
                <v-list-item-title>{{ game.title }}</v-list-item-title>
              </v-list-item-content>
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
  width: 80px;
  overflow: hidden;
}
</style>
