<template lang="pug">
  layout
    v-layout()
      v-flex(xs-12)
        h1 Paperize:  Create better games, faster!
        p
          em Experimental bespoke rapid prototyping software for tabletop game designers

        v-alert(type="warning" value="true" outline)
          strong Paperize is alpha software, meaning it:
          ul
            li is missing major features
            li has unacceptable bugs
            li can be confusing and is not well-documented

        p Want to support the project?

        h2 Consider <a href="https://patreon.com/paperize" target="_blank">Becoming a Patron!</a>
        p Paperize is <strong>solely supported by generous donations from visionary game designers</strong>: no fees, no spying, no selling your data.

        h2 Read the <a href="/guides/getting-started">Getting Started Guide</a>
        p This is a great way to rapidly understand the workflow Paperize enables.

        h2
          a(href="https://beta.editor.paperize.io" target="_blank") Visit the Application
        p Paperize is ready when you are!

        h2 Want Live Chat Help? <a href="https://discord.gg/9ggkkQp" target="_blank">Join the Discord</a>
        p On the Paperize Discord you'll find a community of game designers working on their games and helping each other. The lead developer monitors it as well, helping users find their way, fixing bugs, and taking feature requests.
</template>

<script>
export default {
  metaInfo: {
    title: 'Paperize: Documentation'
  }
}
</script>
