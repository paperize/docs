<template lang="pug">
  v-app
    v-navigation-drawer(v-model="showDrawer" fixed app)
      v-card(min-height="200")
        v-card-text Recognized Patrons

      v-list(dense subheader)
        //- Home
        v-list-tile(ripple to="/" @click="")
          v-list-tile-action
            v-icon(medium) home
          v-list-tile-title Home

        v-list-tile(ripple to="/references/roadmap/" @click="")
          v-list-tile-action

          v-list-tile-title Paperize Roadmap

        //- Guides
        v-subheader(inset) Guides
        v-divider

        v-list-tile(ripple v-for="guide in guides" :to="guide.to" :key="guide.name" tag="g-link")
          v-list-tile-action
            //- empty on purpose, pads the title for alignment
          v-list-tile-title {{ guide.name }}
          v-tooltip(v-if="guide.isNew" top)
            span New content as of {{ guide.isNew }}!
            v-icon(slot="activator" color="blue") new_releases

        //- References
        v-subheader(inset) References
        v-divider

        v-list-tile(ripple v-for="reference in references" :to="reference.to" :key="reference.name" @click="" tag="g-link")
          v-list-tile-action
          v-list-tile-title {{ reference.name }}
          v-tooltip(v-if="reference.isNew" top)
            span New content as of {{ reference.isNew }}!
            v-icon(slot="activator" color="blue") new_releases

    v-toolbar(fixed app)
      v-toolbar-side-icon(@click.stop="showDrawer = !showDrawer")
      v-toolbar-title  {{ $static.metadata.siteName }}

    v-content
      v-container(fluid)
        slot/

    v-footer(app)
      span(class="white--text") &copy; 2020
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
  const
    guides = [
      { name: "Getting Started", to: "/guides/getting-started/" },
      { name: "Template Editor", to: "/guides/template-editor/" },
      { name: "Google Drive Integration", to: "/guides/google-drive/" },
    ],

    references = [
      { name: "Component", to: "/references/component/" },
      { name: "Game", to: "/references/game/" },
      { name: "Google Authorization", to: "/references/google-authorization/" },
      { name: "Google Fonts", to: "/references/google-fonts/" },
      { name: "Image", to: "/references/image/" },
      { name: "Image Layer", to: "/references/image-layer/" },
      { name: "Magic Properties", to: "/references/magic-properties/" },
      { name: "Shape Layer", to: "/references/shape-layer/" },
      { name: "Spreadsheet", to: "/references/spreadsheet/" },
      { name: "Text Layer", to: "/references/text-layer/" },
    ]

  export default {
     data: () => ({
       showDrawer: null,
       guides, references
     }),
   }
</script>

<style>
  :root {
    font-size: 1.2rem;
  }

  .v-subheader {
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
  }

  a div {
    color: inherit;
  }

  ul {
    margin-bottom: 1em;
  }
</style>
