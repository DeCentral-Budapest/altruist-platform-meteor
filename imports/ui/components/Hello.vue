<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title" title="Invitation-only service">Invite only!</h4>
      <h6 class="card-subtitle mb-2 text-muted">Invitation-only service</h6>
      <p class="card-text">
        The <i>Altruist Paltform</i> is closed and one can only join by an invitation
        <abbr title="later at least three existing members">from members</abbr>,
        and therefore self-curating to keep the quality of content in general.
        <br />
        <small class="text-muted">That's not a very democratic statement, but resources plus democracy equals <i><img data-v-2f47ff72="" src="https://i.imgur.com/IJlEc0b.png" alt="Trolling" class="btn btn-close" style="height: 1.8em;width: 1.8em;padding: 0px;cursor: not-allowed;vertical-align: text-bottom;" /></i>
        and the lack of <i>Trust</i>, which plays a key role in <i>Altruism</i><sup class="cite"><a href="#fn1" id="#fnref1" name="#fnref1">[1]</a></sup>.</small>
      </p>
    </div>
    <div class="footnotes-list card-footer">
      <ol>
        <li id="fn1" class="footnote-item">
          <a href="https://en.wikipedia.org/wiki/Altruism" target="_blank" rel="noopener" class="keychainify-checked">Altruism on Wikipedia</a>, <a href="https://ethicsunwrapped.utexas.edu/glossary/altruism" target="_blank" rel="noopener" class="keychainify-checked">Altruism on Ethics Unwrapped</a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerActive: false,
    }
  },
  methods: {
  },
}
</script>

<style scoped>
@media (min-width: 1200px) {
  .card {
    margin-left: 1em;
  }
}
.card {
  border: none;
}
  .card-footer ol {
    margin-bottom: 0;
  }
</style>
