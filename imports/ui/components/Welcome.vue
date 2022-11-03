<template>
  <div class="container-fluid py-3 row" >
    <div class="col-sm-6 py-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Welcome to your special <strong>Resource Management</strong> platform</h5>
          <h6 class="card-subtitle py-2">What are resources?</h6>
          <ul class="card-text list-group list-group-flush">
            <li class="list-group-item">Supply, support, and aid capacity</li>
            <li class="list-group-item">Money, or any property that can be converted into money; assets</li>
            <li class="list-group-item">An available means afforded by the mind or one's personal capabilities</li>
            <li class="list-group-item">Capability in dealing with a situation or in meeting difficulties</li>
          </ul>
          <p>Now you can start collecting your resources to one place</p>
          <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#listingModal">Create your Listing <i class="fa fa-fw fa-pencil fa-fw"></i></a>
          <a href="https://www.dictionary.com/browse/resource" target="_blank" class="btn btn-sm btn-secondary float-right" title="Resource on Dictionary.com"><i class="fa-solid fa-fw fa-info"></i></a>
        </div>
      </div>
    </div>
    <div class="col-sm-6 py-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">About Listings</h5>
          <h6 class="card-subtitle text-muted py-2"></h6>
          <p class="card-text"><p><span>The basic feature of the software is to list your resources or needs (we call it </span><em><strong><span>Listings</span></strong></em><span>). The category of </span><em><span>Listings</span></em><span> can be </span><em><strong><span>Goods</span></strong></em><span>, or </span><strong><span>Services</span></strong><span>. The state of the </span><strong><span>Listing</span></strong><span> can be switched from the default state to </span><em><span>“It’s a Need”</span></em><span>, what represents the listed resource as a Need.</span></p></p>
          <a href="https://github.com/DeCentral-Budapest/altruist-platform-meteor/issues" class="btn btn-primary" target="_blank">Issues and Feature requests <i class="fa-brands fa-fw fa-github"></i></a>
        </div>
      </div>
    </div>
    <div class="col-sm-6 py-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">The Problem</h5>
          <h6 class="card-subtitle text-muted py-2">The reason the platform was created</h6>
          <p class="card-text" ><span>Independent communities provide bottom-up solutions, they are the foundation for stable &amp; resilient social and economic systems, and they </span><strong><span>lack the technology</span></strong><span> to </span><strong><span>collect</span></strong><span>, </span><strong><span>process</span></strong><span>, and </span><strong><span>share</span></strong><span> their </span><strong><span>available resources</span></strong><span>, as well as </span><strong><span>and their needs as well</span></strong>.</p>
          <a href="#" class="btn btn-primary disabled" disabled>You can publish your Story soon <i class="fa fa-fw fa-pen-nib"></i></a>          
        </div>
      </div>
    </div>
    <div class="col-sm-6 py-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">The Solution</h5>
          <h6 class="card-subtitle text-muted py-2">The reason the platform was created</h6>
          <p class="card-text" >We need secure tools and effective methods for <strong>efficient allocation of available resources</strong> and <strong>real needs</strong>.</p>
          <a href="https://github.com/DeCentral-Budapest/altruist-platform-meteor" target="_blank" class="btn btn-primary">The source code <i class="fa-brands fa-fw fa-github"></i></a>
        </div>
      </div>
    </div>
    <div class="col-sm-6 py-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Example</h5>
          <p class="card-text" >Local farmers can map and share their available machinery and ask for unused organic materials, then others farmers doesn’t need to buy and maintain those expensive tools and can give utilise materials to increase fertility. In the same time a small gardener will know where to go for good quality compost materials and where to send her kids to learn about growing food.</p>
          <a href="https://t.me/eaposztrof" class="btn btn-primary">Ask any questions about the platform<i class="fa-solid fa-fw fa-pen-nib"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data () {
    return {
    }
  },
  meteor: {
    currentUser () {
        return Meteor.user();
    },
  },
  methods: {
    doLogout() {
      Meteor.logout(function(error) {
        if (error) alert(error.message);
      });
    },
  },
}
</script>

<style scoped>
</style>
  
